import { describe, it, expect, vi } from 'vitest';
import {
  parseConversationId,
  createConversation,
  dispatchWithFallback,
  type CommandExecutor,
} from './agentapi.ts';

describe('agentapi', () => {
  describe('parseConversationId', () => {
    it('parses conversation_id from JSON object', () => {
      expect(parseConversationId('{"conversation_id": "conv-12345"}')).toBe('conv-12345');
      expect(parseConversationId('{"response": {"conversation_id": "conv-nested"}}')).toBe('conv-nested');
      expect(parseConversationId('{"id": "conv-id"}')).toBe('conv-id');
    });

    it('parses UUID format from raw text', () => {
      const text = 'Starting agent session: 12345678-abcd-1234-abcd-1234567890ab ready.';
      expect(parseConversationId(text)).toBe('12345678-abcd-1234-abcd-1234567890ab');
    });

    it('parses conversation: <id> prefix pattern', () => {
      expect(parseConversationId('conversation: custom-session-999')).toBe('custom-session-999');
      expect(parseConversationId('Session: custom-session-888')).toBe('custom-session-888');
    });

    it('returns null for empty or invalid output', () => {
      expect(parseConversationId('')).toBeNull();
      expect(parseConversationId('Error: unknown command')).toBeNull();
    });
  });

  describe('createConversation', () => {
    it('constructs correct arguments and parses returned conversation ID', async () => {
      const mockExecutor = vi.fn<CommandExecutor>().mockResolvedValue({
        stdout: JSON.stringify({ conversation_id: 'conv-abc-123' }),
        stderr: '',
      });

      const res = await createConversation({
        prompt: 'Do something',
        model: 'pro',
        title: '[task-1] Do something',
        agentapiBin: '/bin/agentapi',
        executor: mockExecutor,
      });

      expect(res.conversationId).toBe('conv-abc-123');
      expect(mockExecutor).toHaveBeenCalledWith('/bin/agentapi', [
        'new-conversation',
        '--model=pro',
        '--title=[task-1] Do something',
        'Do something',
      ]);
    });

    it('throws error when JSON contains error field', async () => {
      const mockExecutor = vi.fn<CommandExecutor>().mockResolvedValue({
        stdout: JSON.stringify({ error: 'Quota exceeded for model pro' }),
        stderr: '',
      });

      await expect(
        createConversation({
          prompt: 'Do something',
          model: 'pro',
          executor: mockExecutor,
        })
      ).rejects.toThrow('agentapi returned error: Quota exceeded for model pro');
    });
  });

  describe('dispatchWithFallback', () => {
    it('succeeds on first attempt when pro succeeds', async () => {
      const mockExecutor = vi.fn<CommandExecutor>().mockResolvedValue({
        stdout: JSON.stringify({ conversation_id: 'conv-pro-success' }),
        stderr: '',
      });

      const logs: string[] = [];
      const res = await dispatchWithFallback({
        prompt: 'Refactor code',
        initialModel: 'pro',
        title: 'Title',
        executor: mockExecutor,
        log: (msg) => logs.push(msg),
      });

      expect(res.conversationId).toBe('conv-pro-success');
      expect(res.modelUsed).toBe('pro');
      expect(res.attempts).toEqual([{ model: 'pro' }]);
      expect(mockExecutor).toHaveBeenCalledTimes(1);
    });

    it('automatically falls back to flash when pro fails', async () => {
      const mockExecutor = vi
        .fn<CommandExecutor>()
        .mockRejectedValueOnce(new Error('ResourceExhausted: Quota limit reached for pro'))
        .mockResolvedValueOnce({
          stdout: JSON.stringify({ conversation_id: 'conv-flash-fallback' }),
          stderr: '',
        });

      const logs: string[] = [];
      const res = await dispatchWithFallback({
        prompt: 'Complex task',
        initialModel: 'pro',
        title: 'Title',
        executor: mockExecutor,
        log: (msg) => logs.push(msg),
      });

      expect(res.conversationId).toBe('conv-flash-fallback');
      expect(res.modelUsed).toBe('flash');
      expect(res.attempts.length).toBe(2);
      expect(res.attempts[0]?.model).toBe('pro');
      expect(res.attempts[0]?.error).toContain('ResourceExhausted');
      expect(res.attempts[1]?.model).toBe('flash');

      expect(logs.some((l) => l.includes("Falling back from 'pro' to 'flash'"))).toBe(true);
      expect(mockExecutor).toHaveBeenCalledTimes(2);
    });

    it('throws error if both initial pro and fallback flash fail', async () => {
      const mockExecutor = vi
        .fn<CommandExecutor>()
        .mockRejectedValueOnce(new Error('Pro failure'))
        .mockRejectedValueOnce(new Error('Flash failure'));

      await expect(
        dispatchWithFallback({
          prompt: 'Fail task',
          initialModel: 'pro',
          executor: mockExecutor,
          log: () => {},
        })
      ).rejects.toThrow('All model dispatch attempts failed');

      expect(mockExecutor).toHaveBeenCalledTimes(2);
    });
  });
});

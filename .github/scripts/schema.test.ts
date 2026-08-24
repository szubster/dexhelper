import { describe, it, expect } from 'vitest';
import { NodeFrontmatterSchema, PromptFragmentSchema, validatePromptFragment } from './schema.ts';

describe('validatePromptFragment', () => {
  it('validates a correct prompt fragment successfully', () => {
    const fragment = {
      id: "role-coder",
      role: "coder",
      context: "context here",
      rules: ["rule 1", "rule 2"],
      precedence: 1,
    };
    const result = validatePromptFragment(fragment);
    expect(result).toEqual(fragment);
  });

  it('validates a minimal prompt fragment successfully', () => {
    const fragment = {
      id: "base-fragment",
    };
    const result = validatePromptFragment(fragment);
    expect(result).toEqual(fragment);
  });

  it('throws a detailed error if id is missing', () => {
    const fragment = {
      role: "coder",
    };
    expect(() => validatePromptFragment(fragment)).toThrow('Invalid prompt fragment: id: Invalid input: expected string, received undefined');
  });

  it('throws a detailed error for invalid types', () => {
    const fragment = {
      id: 123,
      rules: "not-an-array",
    };
    expect(() => validatePromptFragment(fragment)).toThrow('Invalid prompt fragment: id: Invalid input: expected string, received number, rules: Invalid input: expected array, received string');
  });
});

describe('PromptFragmentSchema', () => {
  it('validates a correct prompt fragment', () => {
    const fragment = {
      id: "role-coder",
      role: "coder",
      context: "context here",
      rules: ["rule 1", "rule 2"],
      precedence: 1,
    };
    expect(() => PromptFragmentSchema.parse(fragment)).not.toThrow();
  });

  it('validates a minimal prompt fragment', () => {
    const fragment = {
      id: "base-fragment",
    };
    expect(() => PromptFragmentSchema.parse(fragment)).not.toThrow();
  });

  it('fails if id is missing', () => {
    const fragment = {
      role: "coder",
    };
    expect(() => PromptFragmentSchema.parse(fragment)).toThrow(Error);
  });
});

describe('NodeFrontmatterSchema', () => {
  it('validates a correct full node', () => {
    const node = {
      id: "task-001-002-test",
      type: "TASK",
      title: "Test Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-07-26",
      updated_at: "2026-07-26",
      depends_on: [],
      jules_session_id: null,
      pr_number: null,
      parent: "story-001",
      tags: [],
      research_references: [],
      rejection_count: 0,
      rejection_reason: "",
      notes: ""
    };
    expect(() => NodeFrontmatterSchema.parse(node)).not.toThrow(Error);
  });

  it('validates a minimal node', () => {
    const node = {
      id: "idea-001",
      type: "IDEA",
      title: "New Idea",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-07-26",
      updated_at: "2026-07-26",
      depends_on: [],
      jules_session_id: null
    };
    expect(() => NodeFrontmatterSchema.parse(node)).not.toThrow(Error);
  });

  it('fails if required field is missing', () => {
    const node = {
      id: "idea-001",
      type: "IDEA",
      title: "New Idea",
      status: "PENDING",
      // owner_persona is missing
      created_at: "2026-07-26",
      updated_at: "2026-07-26",
      depends_on: [],
      jules_session_id: null
    };
    expect(() => NodeFrontmatterSchema.parse(node)).toThrow(Error);
  });

  it('fails if type is invalid', () => {
    const node = {
      id: "idea-001",
      type: "INVALID_TYPE",
      title: "New Idea",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-07-26",
      updated_at: "2026-07-26",
      depends_on: [],
      jules_session_id: null
    };
    expect(() => NodeFrontmatterSchema.parse(node)).toThrow(Error);
  });

  it('fails if status is invalid', () => {
    const node = {
      id: "idea-001",
      type: "IDEA",
      title: "New Idea",
      status: "INVALID_STATUS",
      owner_persona: "product_manager",
      created_at: "2026-07-26",
      updated_at: "2026-07-26",
      depends_on: [],
      jules_session_id: null
    };
    expect(() => NodeFrontmatterSchema.parse(node)).toThrow(Error);
  });

  it('fails if owner_persona is invalid', () => {
    const node = {
      id: "idea-001",
      type: "IDEA",
      title: "New Idea",
      status: "PENDING",
      owner_persona: "INVALID_PERSONA",
      created_at: "2026-07-26",
      updated_at: "2026-07-26",
      depends_on: [],
      jules_session_id: null
    };
    expect(() => NodeFrontmatterSchema.parse(node)).toThrow(Error);
  });

  it('validates handling optional tags', () => {
    const node = {
      id: "idea-001",
      type: "IDEA",
      title: "New Idea",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-07-26",
      updated_at: "2026-07-26",
      depends_on: [],
      jules_session_id: null,
      tags: ["one", "two"]
    };
    expect(() => NodeFrontmatterSchema.parse(node)).not.toThrow(Error);
  });

  it('successfully parses created_at and updated_at when they are Date instances', () => {
    const node = {
      id: "idea-001",
      type: "IDEA",
      title: "New Idea",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: new Date("2026-06-16T00:00:00.000Z"),
      updated_at: new Date("2026-07-03T00:00:00.000Z"),
      depends_on: [],
      jules_session_id: null
    };
    const parsed = NodeFrontmatterSchema.parse(node);
    expect(parsed.created_at).toBe("2026-06-16T00:00:00.000Z");
    expect(parsed.updated_at).toBe("2026-07-03T00:00:00.000Z");
  });

  it('validates an EXPERIMENT node with experiment_variants', () => {
    const node = {
      id: "experiment-001",
      type: "EXPERIMENT",
      title: "New Experiment",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: "2026-08-14",
      updated_at: "2026-08-14",
      depends_on: [],
      jules_session_id: null,
      experiment_variants: ["A", "B"]
    };
    expect(() => NodeFrontmatterSchema.parse(node)).not.toThrow(Error);
  });

  it('validates a node with locks', () => {
    const node = {
      id: "task-001",
      type: "TASK",
      title: "New Task",
      status: "PENDING",
      owner_persona: "coder",
      created_at: "2026-08-14",
      updated_at: "2026-08-14",
      depends_on: [],
      jules_session_id: null,
      locks: ["lock1", "lock2"]
    };
    expect(() => NodeFrontmatterSchema.parse(node)).not.toThrow(Error);
  });
});

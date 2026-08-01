import { describe, it, expect } from 'vitest';
import { NodeFrontmatterSchema } from './schema.ts';

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

  it('validates and transforms JS Date objects for created_at and updated_at', () => {
    const node = {
      id: "idea-001",
      type: "IDEA",
      title: "New Idea",
      status: "PENDING",
      owner_persona: "product_manager",
      created_at: new Date("2026-07-26T12:00:00Z"),
      updated_at: new Date("2026-07-26T13:00:00Z"),
      depends_on: [],
      jules_session_id: null
    };
    const parsed = NodeFrontmatterSchema.parse(node);
    expect(parsed.created_at).toBe("2026-07-26T12:00:00.000Z");
    expect(parsed.updated_at).toBe("2026-07-26T13:00:00.000Z");
  });
});

import { z } from 'zod';

export const NodeTypeEnum = z.enum([
  'IDEA',
  'PRD',
  'EPIC',
  'STORY',
  'TASK',
  'RESEARCH',
  'ADR',
]);

export const NodeStatusEnum = z.enum([
  'PENDING',
  'READY',
  'ACTIVE',
  'VERIFYING',
  'COMPLETED',
  'FAILED',
  'BLOCKED',
  'CANCELLED',
]);

export const OwnerPersonaEnum = z.enum([
  'palette',
  'product_manager',
  'epic_planner',
  'story_owner',
  'architect',
  'tech_lead',
  'coder',
  'qa',
  'human',
  'tpm',
  'agile_coach',
  'mechanic',
  'researcher',
  'auditor',
]);

export const DateOrStringSchema = z.union([
  z.string(),
  z.date().transform((val) => val.toISOString()),
]);

export const NodeFrontmatterSchema = z.object({
  id: z.string(),
  type: NodeTypeEnum,
  title: z.string(),
  status: NodeStatusEnum,
  owner_persona: OwnerPersonaEnum,
  created_at: DateOrStringSchema,
  updated_at: DateOrStringSchema,
  depends_on: z.array(z.string()),
  jules_session_id: z.string().nullable(),
  pr_number: z.number().int().nullable().optional(),
  parent: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  research_references: z.array(z.string()).optional(),
  rejection_count: z.number().int().optional(),
  rejection_reason: z.string().optional(),
  notes: z.string().optional(),
});

export type NodeFrontmatter = z.infer<typeof NodeFrontmatterSchema>;

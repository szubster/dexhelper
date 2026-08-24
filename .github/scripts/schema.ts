import { z } from 'zod';

export const NodeTypeEnum = z.enum([
  'IDEA',
  'PRD',
  'EPIC',
  'STORY',
  'TASK',
  'RESEARCH',
  'ADR',
  'EXPERIMENT',
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
  'canvas',
  'changelogger',
]);

export const NodeFrontmatterSchema = z.object({
  id: z.string(),
  type: NodeTypeEnum,
  title: z.string(),
  status: NodeStatusEnum,
  owner_persona: OwnerPersonaEnum,
  created_at: z.union([z.string(), z.date()]).transform((val) => val instanceof Date ? val.toISOString() : val),
  updated_at: z.union([z.string(), z.date()]).transform((val) => val instanceof Date ? val.toISOString() : val),
  depends_on: z.array(z.string()),
  jules_session_id: z.string().nullable(),
  pr_number: z.number().int().nullable().optional(),
  parent: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  layers: z.array(z.string()).optional(),
  research_references: z.array(z.string()).optional(),
  rejection_count: z.number().int().optional(),
  rejection_reason: z.string().optional(),
  notes: z.string().optional(),
  experiment_variants: z.array(z.string()).optional(),
  locks: z.array(z.string()).optional(),
});

export type NodeFrontmatter = z.infer<typeof NodeFrontmatterSchema>;

export const PromptFragmentSchema = z.object({
  id: z.string(),
  role: z.string().optional(),
  context: z.string().optional(),
  rules: z.array(z.string()).optional(),
  precedence: z.number().int().optional(),
});

export type PromptFragment = z.infer<typeof PromptFragmentSchema>;

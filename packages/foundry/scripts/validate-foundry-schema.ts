import fs from 'node:fs';
import path from 'node:path';
import matter from '@11ty/gray-matter';

function getFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

function validateSchema() {
  const args = process.argv.slice(2);
  let targetFiles: string[] = [];

  const foundryDir = path.resolve('.foundry');

  if (args.length > 0) {
    targetFiles = args.filter(file => {
      if (!file.endsWith('.md')) return false;
      const normalizedRelative = file.split(path.sep).join('/');
      if (!normalizedRelative.includes('.foundry/')) return false;
      // Allow docs/adrs but exclude other docs
      if (normalizedRelative.includes('.foundry/docs/') && !normalizedRelative.includes('.foundry/docs/adrs/')) return false;
      if (normalizedRelative.includes('.foundry/journals/')) return false;
      if (normalizedRelative.includes('.foundry/archive/journals/')) return false;
      if (normalizedRelative.includes('.foundry/fixtures/')) return false;
      return true;
    });
  } else {
    if (!fs.existsSync(foundryDir)) {
      console.error('No .foundry directory found.');
      process.exit(0);
    }

    const allFiles = getFiles(foundryDir);
    targetFiles = allFiles.filter(file => {
      if (!file.endsWith('.md')) return false;
      const relativePath = path.relative(foundryDir, file);
      const normalizedRelative = relativePath.split(path.sep).join('/');
      // Allow docs/adrs but exclude other docs
      if (normalizedRelative.startsWith('docs/') && !normalizedRelative.startsWith('docs/adrs/')) return false;
      if (normalizedRelative.startsWith('journals/')) return false;
      if (normalizedRelative.startsWith('archive/journals/')) return false;
      if (normalizedRelative.startsWith('fixtures/')) return false;
      return true;
    });
  }

  const ids = new Set<string>();
  let hasError = false;

  const ideaRegex = /^idea-\d{3}(-[a-z0-9-]+)?$/;
  const otherRegex = /^(prd|epic|story|task|research|adr)-\d{3}(-\d{3})?(-[a-z0-9-]+)?$/;

  const validTypes = ['IDEA', 'PRD', 'EPIC', 'STORY', 'TASK', 'RESEARCH', 'ADR'];
  const validStatuses = ['PENDING', 'READY', 'ACTIVE', 'VERIFYING', 'COMPLETED', 'FAILED', 'BLOCKED', 'CANCELLED'];
  const validPersonas = [
    'product_manager', 'epic_planner', 'story_owner', 'architect',
    'tech_lead', 'coder', 'qa', 'human', 'tpm', 'agile_coach', 'researcher', 'auditor', 'palette', 'canvas', 'changelogger'
  ];

  const validMappings: Record<string, string[]> = {
    IDEA: ['product_manager', 'canvas'],
    PRD: ['epic_planner', 'story_owner'],
    EPIC: ['story_owner', 'epic_planner'],
    STORY: ['tech_lead', 'story_owner'],
    TASK: ['coder', 'qa', 'tech_lead', 'architect', 'researcher', 'palette', 'changelogger'],
    RESEARCH: ['researcher'],
    ADR: ['architect'],
  };

  const folderMap: Record<string, string> = {
    IDEA: 'ideas',
    PRD: 'prds',
    EPIC: 'epics',
    STORY: 'stories',
    TASK: 'tasks',
    RESEARCH: 'research',
    ADR: 'docs/adrs'
  };

  const requiredFields = ['id', 'title', 'created_at', 'updated_at', 'depends_on', 'jules_session_id'];

  for (const file of targetFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    let parsed;
    try {
      parsed = matter(content);
    } catch (e) {
      console.error(`Error: Failed to parse frontmatter for file ${file}`);
      console.error(e);
      hasError = true;
      continue;
    }

    const data = parsed.data;

    // 1. Check required fields
    for (const field of requiredFields) {
      if (!(field in data)) {
        console.error(`Error: Missing required field '${field}' in file ${file}`);
        hasError = true;
      }
    }

    const { id, type, status, owner_persona } = data;

    // 2. Validate Enums
    if (type && !validTypes.includes(type)) {
      console.error(`Error: Invalid type enum '${type}' in file ${file}`);
      hasError = true;
    }
    if (status && !validStatuses.includes(status)) {
      console.error(`Error: Invalid status enum '${status}' in file ${file}`);
      hasError = true;
    }
    if (owner_persona && !validPersonas.includes(owner_persona)) {
      console.error(`Error: Invalid owner_persona enum '${owner_persona}' in file ${file}`);
      hasError = true;
    }

    // 2.5 Validate persona mapping
    if (type && owner_persona && owner_persona !== 'human' && owner_persona !== 'tpm' && owner_persona !== 'agile_coach' && owner_persona !== 'auditor') {
      const allowedPersonas = validMappings[type as string] || [];
      if (!allowedPersonas.includes(owner_persona)) {
        console.error(`Error: Invalid mapping: ${type} node '${file}' cannot be owned by '${owner_persona}'`);
        hasError = true;
      }
    }

    // 2.6 Validate rejection_reason
    if (status === 'FAILED') {
      const reason = data['rejection_reason'];
      if (reason === undefined || reason === null || (typeof reason === 'string' && reason.trim() === '')) {
        console.error(`Error: Missing rejection_reason for FAILED node in file ${file}`);
        hasError = true;
      }
    } else if (status === 'ACTIVE' || status === 'COMPLETED' || status === 'READY' || status === 'VERIFYING') {
      const reason = data['rejection_reason'];
      if (reason === undefined) {
        console.warn(`Warning: Missing rejection_reason field in file ${file}. It should be present for all nodes.`);
      }
    }

    // 2.7 Validate paths (including archive check)
    const checkPathExists = (p: string) => {
      if (fs.existsSync(p)) return true;
      if (p.startsWith('.foundry/') && !p.includes('/archive/')) {
        const archivedPath = p.replace('.foundry/', '.foundry/archive/');
        if (fs.existsSync(archivedPath)) return true;
      }
      return false;
    };

    if (data['depends_on'] && Array.isArray(data['depends_on'])) {
      for (const dep of data['depends_on']) {
        if (typeof dep === 'string' && dep.includes('/')) {
          if (!checkPathExists(dep)) {
            console.error(`Error: Dependency path does not exist: '${dep}' in file ${file}`);
            hasError = true;
          }
        }
      }
    }

    if (data['research_references'] && Array.isArray(data['research_references'])) {
      for (const ref of data['research_references']) {
        if (typeof ref === 'string' && ref.includes('/')) {
          if (!checkPathExists(ref)) {
            console.error(`Error: Research reference path does not exist: '${ref}' in file ${file}`);
            hasError = true;
          }
        }
      }
    }

    if (data['parent']) {
      if (typeof data['parent'] === 'string' && data['parent'].includes('/')) {
        if (!checkPathExists(data['parent'])) {
          console.error(`Error: Parent path does not exist: '${data['parent']}' in file ${file}`);
          hasError = true;
        }
      }
    }

    // 2.8 Validate directory placement
    if (type) {
      const expectedFolder = folderMap[type as string];
      const normalizedPath = file.split(path.sep).join('/');
      if (expectedFolder && !normalizedPath.includes(`/${expectedFolder}/`) && !normalizedPath.includes(`/archive/${expectedFolder}/`)) {
        console.error(`Error: Node of type ${type} is in the wrong directory: ${file}. Expected it to be in .foundry/${expectedFolder}/ or .foundry/archive/${expectedFolder}/`);
        hasError = true;
      }
    }

    // 2.9 Validate filename matches ID (except ADRs which have inconsistent naming)
    if (id && type !== 'ADR') {
      const filename = path.basename(file, '.md');
      if (filename !== id) {
        console.error(`Error: Filename '${filename}' does not match frontmatter id '${id}' in file ${file}`);
        hasError = true;
      }
    }

    // 3. ID format & uniqueness
    if (id) {
      if (ids.has(id)) {
        console.error(`Error: Duplicate ID found: ${id} in file ${file}`);
        hasError = true;
      }
      ids.add(id);

      if (id.startsWith('idea-')) {
        if (!ideaRegex.test(id)) {
          console.error(`Error: Invalid ID format for IDEA node: ${id} in file ${file}`);
          hasError = true;
        }
      } else {
        if (!otherRegex.test(id)) {
          console.error(`Error: Invalid ID format for node: ${id} in file ${file}`);
          hasError = true;
        }
      }
    } else {
      console.error(`Error: No ID found in frontmatter of file ${file}`);
      hasError = true;
    }
  }

  if (hasError) {
    process.exit(1);
  } else {
    console.log('All Foundry nodes passed schema validation.');
  }
}

validateSchema();

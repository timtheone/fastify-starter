import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const importStatement = `import { Kysely } from 'kysely'
import { DB } from '../types/db_types';
`;

const upFunction = `
export async function up(db: Kysely<DB>): Promise<void> {
 
}
`;

const downFunction = `
export async function down(db: Kysely<DB>): Promise<void> {

}`;

const fileContent = `${importStatement} 
${upFunction}
${downFunction}
`;

function generateMigration(): void {
  const name = process.argv[2];
  if (!name) {
    console.error('Please provide a name for the migration.');
    return;
  }

  const timestamp = new Date().getTime();
  const fileName = `${timestamp}_${name}.ts`;
  const directoryPath = dirname(fileURLToPath(import.meta.url));
  const migrationsPath = join(directoryPath, 'migrations');
  const filePath = join(migrationsPath, fileName);

  fs.writeFileSync(filePath, fileContent);

  console.log(`File ${fileName} has been generated.`);
}

generateMigration();

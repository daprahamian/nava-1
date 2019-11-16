
import { basename } from 'path';
import loadDirectoryContents from './loadDirectoryContents';
import parseSchemaFile, { FileSchema } from './parseSchemaFile';
import { SCHEMA_DIR, DATA_DIR } from './constants';
import getData from './parseDataFile';
import loadFileInDir from './loadFileInDir';
import parseDataFile from './parseDataFile';
import submitData from './submitData';

run();

async function run(): Promise<void> {
  const schemaFileNames = await loadDirectoryContents(SCHEMA_DIR, 'csv');
  const schemas = await buildSchemas(schemaFileNames);
  const dataFileNames = await loadDirectoryContents(DATA_DIR, 'txt');
  const data = await buildData(dataFileNames, schemas);
  await submitData(data);
}

async function buildSchemas(filenames: string[]): Promise<Map<string, FileSchema>> {
  const ret: Map<string, FileSchema> = new Map();
  for (const filename of filenames) {
    const fileContents = await loadFileInDir(SCHEMA_DIR, filename);
    const schema = parseSchemaFile(fileContents);
    const base = basename(filename, '.csv');
    ret.set(base, schema);
  }
  return ret;
}

async function buildData(filenames: string[], schemas: Map<string, FileSchema>): Promise<ReturnType<typeof getData>> {
  const allData: ReturnType<typeof getData> = [];
  for (const filename of filenames) {
    const schemaName = basename(filename, '.txt');
    if (!schemas.has(schemaName)) {
      throw new Error(`Data file ${filename} does not have a schema defined`);
    }

    const schema = schemas.get(schemaName) as FileSchema;
    const fileContents = await loadFileInDir(DATA_DIR, filename);

    const data = parseDataFile(fileContents, schema);
    allData.push(...data);
  }

  return allData;
}

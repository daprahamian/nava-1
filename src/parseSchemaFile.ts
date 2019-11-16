import fileToLines from './fileToLines';

export const enum SchemaFieldType {
  TEXT='TEXT',
  INTEGER='INTEGER',
  BOOLEAN='BOOLEAN'
}
export interface FileSchemaField {
  key: string;
  length: number;
  type: SchemaFieldType;
}

export interface FileSchema {
  length: number;
  fields: FileSchemaField[];
}

const validSchemaTypes = new Set([SchemaFieldType.TEXT, SchemaFieldType.INTEGER, SchemaFieldType.BOOLEAN])
function validateSchemaType(type: string): type is SchemaFieldType {
  return validSchemaTypes.has(type as SchemaFieldType);
}

export default function parseSchemaFile(schemaFile: string): FileSchema {
  const schema: FileSchema = { length: 0, fields: [] };
  const lines = fileToLines(schemaFile);

  for (const line of lines) {
    const [key, lengthString, type] = line.split(',');

    if (!validateSchemaType(type)) {
      throw new Error(`Invalid schema field type: ${type}`);
    }

    const length = Number.parseInt(lengthString, 10);

    schema.fields.push({ key, length, type })
    schema.length += length;
  }

  return schema;
}

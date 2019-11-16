import { FileSchema, SchemaFieldType } from "./parseSchemaFile";
import fileToLines from './fileToLines';

function parseLineGivenSchema(line: string, schema: FileSchema): Record<string, any> {
  if (line.length !== schema.length) {
    throw new Error(`Schema expects line length of ${schema.length}, but line "${line}" is of length ${line.length}`);
  }

  let index = 0;
  const ret = Object.create(null);
  for (const { key, length, type } of schema.fields) {
    const tmp = line.substring(index, index + length).trim();
    index += length;

    let value: any;
    switch(type) {
      case SchemaFieldType.BOOLEAN:
        value = !!Number.parseInt(tmp, 10);
        break;
      case SchemaFieldType.TEXT:
        value = tmp;
        break;
      case SchemaFieldType.INTEGER:
        value = Number.parseInt(tmp, 10);
        break;
      default:
        throw new Error(`Invalid schema field type ${type}`);
    }
    ret[key] = value;
  }

  return ret;
}

export default function parseDataFile(fileContents: string, schema: FileSchema): Record<string, any>[] {
  return fileToLines(fileContents).map(line => parseLineGivenSchema(line, schema));
}

import { promises as fs } from 'fs';
import { resolve } from 'path';

export default async function loadFileInDir(root: string, filename: string): Promise<string> {
  return fs.readFile(resolve(root, filename), 'utf8');
}

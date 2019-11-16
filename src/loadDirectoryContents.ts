import { extname } from 'path';
import { promises as fs } from 'fs';

export default async function getFilesInDirectory(root: string, extension: string): Promise<string[]> {
  const files = await fs.readdir(root);
  extension = `.${extension}`;
  return files.filter(file => extname(file) === extension);
}

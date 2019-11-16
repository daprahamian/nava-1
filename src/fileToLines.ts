/**
 * Putting this in a common location. If we have to run on windows,
 * idk the consequences of splitting on \n, so we might want to
 * revisit this.
 * @param file 
 */
export default function fileToLines(file: string): string[] {
  return file.split('\n').filter(line => line.length);
}

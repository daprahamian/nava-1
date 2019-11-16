import axios from 'axios';
import { ENDPOINT_URL } from './constants';

export default async function submitData(allData: Record<string, any>[]): Promise<void> {
  for (const data of allData) {
    await axios.post(ENDPOINT_URL, data);
  }
}

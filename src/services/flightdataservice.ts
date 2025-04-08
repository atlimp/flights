import { readFile } from 'node:fs/promises';
import { getConfigOrDefault } from '../util/util';

export async function getData() {
    const fileName = getConfigOrDefault('DATA_PATH', '/home/node/app/assets/data.json');
    const buffer = await readFile(fileName);
    const json = buffer.toString('utf-8');
    return JSON.parse(json);
}
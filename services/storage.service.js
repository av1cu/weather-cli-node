import { join } from 'path';
import { homedir } from 'os';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async () => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data;
  }
  return undefined;
};

const isExist = async (filePath) => {
  try {
    const file = await promises.stat(filePath);
    if (file) return true;
  } catch (e) {
    return false;
  }
};

export { saveKeyValue, getKeyValue };

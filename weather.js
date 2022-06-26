#!/usr/bin/env node

import { getArgs } from './helpers/getArgs.js';
import { getWeather } from './services/api.service.js';
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
    printSuccess('Токен успешно сохранен');
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  try {
    await saveKeyValue('city', city);
    printSuccess('Город успешно сохранен');
  } catch (error) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const { city } = process.env.CITY ?? (await getKeyValue('city'));
    const data = await getWeather(city);
    printWeather(data);
  } catch (error) {
    if (error?.response?.status === 404) {
      printError('Неверно указан город');
    } else if (error?.response?.status === 401) {
      printError('Неверный ключ');
    } else {
      printError(error.message);
    }
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);
  if (args.c) {
    return saveCity(args.c);
  }
  if (args.h) {
    return printHelp();
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForecast();
};

initCLI();

import chalk from 'chalk';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + message);
};

const printHelp = () => {
  console.log(`
  ${chalk.bgCyan(' HELP ')}
  Используйте:
  -h чтобы получить помощь
  -c [CITY] чтобы указать город
  -t [TOKEN] чтобы указать API TOKEN
  `);
};

const printWeather = (res) => {
  console.log(`${chalk.bgGreen(' WEATHER ')} Погода в городе ${res.data.name}
 ${res.data.weather[0].description}
  Температура: ${res.data.main.temp} (Ощущается как ${res.data.main.feels_like})
  Влажность: ${res.data.main.humidity}%
  Скорость ветра: ${res.data.wind.speed}`);
};

export { printError, printHelp, printSuccess, printWeather };

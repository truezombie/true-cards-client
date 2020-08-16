const fs = require('fs');

const MAIN_LANGUAGE = './src/translations/en.json';
const LANG_DIR = './src/translations/';

const mainLocale = JSON.parse(
  fs.readFileSync(MAIN_LANGUAGE, 'utf8', error => {
    if (error) throw error;
  })
);

fs.readdirSync(LANG_DIR).forEach(file => {
  const currentLocale = JSON.parse(
    fs.readFileSync(`${LANG_DIR}/${file}`, 'utf8', error => {
      if (error) throw error;
    })
  );

  const updatedCurrentLocale = JSON.stringify(
    { ...mainLocale, ...currentLocale },
    null,
    2
  );

  fs.writeFileSync(
    `${LANG_DIR}/${file}`,
    updatedCurrentLocale,
    'utf8',
    error => {
      if (error) throw error;
    }
  );

  console.log(`READY LOCALE: ${file}`); // eslint-disable-line
});

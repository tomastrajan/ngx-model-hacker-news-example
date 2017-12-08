const packageJson = require('../../package.json');

export const environment = {
  production: true,
  version: packageJson.version,
  envName: '',
  appName: 'ngx-model Hacker News Example',
  api: {
    url: 'https://hacker-news.firebaseio.com/v0/'
  }
};

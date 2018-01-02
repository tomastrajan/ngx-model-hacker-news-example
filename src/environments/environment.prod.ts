const packageJson = require('../../package.json');

export const environment = {
  production: true,
  version: packageJson.version,
  envName: '',
  appName: 'HAKAFAKA the Best Hacker News Client',
  api: {
    url: 'https://hacker-news.firebaseio.com/v0/'
  }
};

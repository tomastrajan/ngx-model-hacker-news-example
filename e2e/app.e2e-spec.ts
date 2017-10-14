import { AppPage } from './app.po';

describe('ngx-model-hacker-news-example App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to nmhne!');
  });
});

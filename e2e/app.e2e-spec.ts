import { UtilsPage } from './app.po';

describe('utils App', () => {
  let page: UtilsPage;

  beforeEach(() => {
    page = new UtilsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

import { BkfrontPage } from './app.po';

describe('bkfront App', () => {
  let page: BkfrontPage;

  beforeEach(() => {
    page = new BkfrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

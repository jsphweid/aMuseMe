import { AMuseMePage } from './app.po';

describe('a-muse-me App', function() {
  let page: AMuseMePage;

  beforeEach(() => {
    page = new AMuseMePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

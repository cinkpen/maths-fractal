import { MathsFractalPage } from './app.po';

describe('maths-fractal App', () => {
  let page: MathsFractalPage;

  beforeEach(() => {
    page = new MathsFractalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

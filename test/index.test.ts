import * as index from '../lib/index';

describe('Index', () => {
  test('export Vpc class', () => {
    const classes = Object.keys(index);
    expect(classes).toContain('Vpc');
  });
});

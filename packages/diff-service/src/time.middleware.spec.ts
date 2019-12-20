import { TimeMiddleware } from './time.middleware';

describe('TimeMiddleware', () => {
  it('should be defined', () => {
    expect(new TimeMiddleware()).toBeDefined();
  });
});

import { TranslateMessagePipe } from './translate-message.pipe';

describe('TranslateMessagePipe', () => {
  let pipe: TranslateMessagePipe;

  beforeEach(() => {
    pipe = new TranslateMessagePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null or undefined input', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return the input value as string', () => {
    expect(pipe.transform('hello')).toBe('hello');
    expect(pipe.transform('123')).toBe('123');
  });
});

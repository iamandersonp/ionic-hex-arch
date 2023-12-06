import { of } from 'rxjs';

export const mockHttpService = {
  get: jest.fn().mockImplementation(() => of(true)),
  put: jest.fn().mockImplementation(() => of(true)),
  post: jest.fn().mockImplementation(() => of(true))
};

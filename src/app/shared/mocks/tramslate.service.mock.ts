import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

/**
 *  Mock for the translate service
 */
export const translateSrv = {
  onLangChange: {
    subscribe: jest.fn()
  },
  addLangs: jest.fn(),
  getLangs: jest
    .fn()
    .mockReturnValue(environment.languages),
  setDefaultLang: jest.fn(),
  instant: jest.fn(),
  use: jest.fn(),
  get: jest.fn(),
  transform: jest.fn(),
  updateValue: jest.fn().mockReturnValue(of({}))
};

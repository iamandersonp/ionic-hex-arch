import { of } from 'rxjs';

/**
 *  Mock for Platform
 */
export const platformMock = {
  ready: jest.fn().mockResolvedValue(true),
  is: jest.fn(),
  resume: { subscribe: jest.fn().mockResolvedValue(true) },
  backButton: {
    subscribeWithPriority: jest.fn().mockReturnValue(of())
  }
};

/**
 *  Mock for StorageService
 */
export const storage = {
  create: jest.fn(),
  defineDriver: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
  clear: jest.fn(),
  storeData: jest.fn()
};

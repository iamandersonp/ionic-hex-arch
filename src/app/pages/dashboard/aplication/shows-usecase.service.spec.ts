import { TestBed } from '@angular/core/testing';

import { ShowsUsecaseService } from './shows-usecase.service';
import { ShowRepository } from '../../../core/domain/repositories/show-repository';

describe('ShowsUsecaseService', () => {
  let service: ShowsUsecaseService;
  let ShowMock: jest.Mocked<ShowRepository>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ShowRepository,
          useValue: { search: jest.fn() }
        }
      ]
    });
    service = TestBed.inject(ShowsUsecaseService);
    ShowMock = TestBed.inject(
      ShowRepository
    ) as jest.Mocked<ShowRepository>;
  });

  describe('service creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should have a repository property', () => {
      expect(service.repository).toBeTruthy();
    });
  });
  describe('getShows', () => {
    it('should call search method', () => {
      service.getShows('query');
      expect(ShowMock.search).toHaveBeenCalled();
      expect(ShowMock.search).toHaveBeenCalledWith('query');
    });
  });
});

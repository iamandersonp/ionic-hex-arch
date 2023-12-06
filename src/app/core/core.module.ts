import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowRepository } from './domain/repositories/show-repository';
import { ShowService } from '@services/show.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: ShowRepository, useClass: ShowService }
  ]
})
export class CoreModule {}

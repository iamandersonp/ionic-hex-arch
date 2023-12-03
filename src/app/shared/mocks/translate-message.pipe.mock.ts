import { Pipe, PipeTransform } from '@angular/core';

/**
 * @ignore
 */
@Pipe({
  name: 'translateMessage'
})
export class TranslateMessagePipeMock
  implements PipeTransform
{
  public name: string = 'translateMessage';

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to aply translations
 *
 * @export
 * @class TranslateMessagePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'translateMessage',
  standalone: true
})
export class TranslateMessagePipe implements PipeTransform {
  /**
   * implementation of the transform method
   *
   * @param {string} value
   * @param {...string[]} args
   * @return {*}  {string}
   * @memberof TranslateMessagePipe
   */
  transform(
    value: string | null | undefined,
    ...args: string[]
  ): string {
    return value != null ? `${value}` : '';
  }
}

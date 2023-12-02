/**
 * Enum for typing links as external or internal
 *
 * @export
 * @enum {number}
 */
export enum TipoLink {
  INTERNAL = 1,
  EXTERNAL = 2
}

/**
 * Interface with the atributes of Menu items
 *
 * @export
 * @interface IntrefaceMenu
 */
export interface IntrefaceMenu {
  /**
   * title to display in the menu
   *
   * @type {string}
   * @memberof IntrefaceMenu
   */
  title: string;
  /**
   * url of the menu if internal
   *
   * @type {string[]}
   * @memberof IntrefaceMenu
   */
  url: string[];
  /**
   * link of external menu
   *
   * @type {string}
   * @memberof IntrefaceMenu
   */
  link?: string;
  /**
   * Target of external menu
   *
   * @type {string}
   * @memberof IntrefaceMenu
   */
  target?: string;
  /**
   * icon to display in the menu
   *
   * @type {string}
   * @memberof IntrefaceMenu
   */
  icon: string;
  /**
   * meny type Internal/External
   *
   * @type {TipoLink}
   * @memberof IntrefaceMenu
   */
  tipo?: TipoLink;
}

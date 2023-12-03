/**
 * RootObject Model
 *
 * @interface RootShow
 */
export interface RootShow {
  /**
   * score of the show
   *
   * @type {number}
   * @memberof RootObject
   */
  score: number;
  /**
   * show
   *
   * @type {Show}
   * @memberof RootObject
   */
  show: Show;
}

/**
 * Show Model
 *
 * @interface Show
 */
export interface Show {
  /**
   * id of the show
   *
   * @type {number}
   * @memberof Show
   */
  id: number;
  /**
   * url of the show
   *
   * @type {string}
   * @memberof Show
   */
  url: string;
  /**
   * name of the show
   *
   * @type {string}
   * @memberof Show
   */
  name: string;
  /**
   * type of the show
   *
   * @type {string}
   * @memberof Show
   */
  type: string;
  /**
   * language of the show
   *
   * @type {string}
   * @memberof Show
   */
  language: string;
  /**
   * genres of the show
   *
   * @type {string[]}
   * @memberof Show
   */
  genres: string[];
  /**
   * status of the show
   *
   * @type {string}
   * @memberof Show
   */
  status: string;
  /**
   * runtime of the show
   *
   * @type {number}
   * @memberof Show
   */
  runtime: number;
  /**
   * premiered of the show
   *
   * @type {string}
   * @memberof Show
   */
  averageRuntime: number;
  /**
   * premiered of the show
   *
   * @type {string}
   * @memberof Show
   */
  premiered: string;
  /**
   * officialSite of the show
   *
   * @type {string}
   * @memberof Show
   */
  ended: string;
  /**
   * officialSite of the show
   *
   * @type {string}
   * @memberof Show
   */
  officialSite: string;
  /**
   * schedule of the show
   *
   * @type {Schedule}
   * @memberof Show
   */
  schedule: Schedule;
  /**
   * rating of the show
   *
   * @type {Rating}
   * @memberof Show
   */
  rating: Rating;
  /**
   * weight of the show
   *
   * @type {number}
   * @memberof Show
   */
  weight: number;
  /**
   * network of the show
   *
   * @type {Network}
   * @memberof Show
   */
  network: Network;
  /**
   * webChannel of the show
   *
   * @type {WebChannel}
   * @memberof Show
   */
  webChannel: WebChannel;
  /**
   * dvdCountry of the show
   *
   * @type {*}
   * @memberof Show
   */
  dvdCountry: any;
  /**
   * externals of the show
   *
   * @type {Externals}
   * @memberof Show
   */
  externals: Externals;
  /**
   * image of the show
   *
   * @type {Image}
   * @memberof Show
   */
  image: Image;
  /**
   * summary of the show
   *
   * @type {string}
   * @memberof Show
   */
  summary: string;
  /**
   * updated of the show
   *
   * @type {number}
   * @memberof Show
   */
  updated: number;
  /**
   * _links of the show
   *
   * @type {Links}
   * @memberof Show
   */
  _links: Links;
}

/**
 * Links Model
 *
 * @interface Links
 */
export interface Links {
  /**
   * self of the show
   *
   * @type {Self}
   * @memberof Links
   */
  self: Self;
  /**
   * previousepisode of the show
   *
   * @type {Self}
   * @memberof Links
   */
  previousepisode: Self;
}

/**
 * Self Model
 *
 * @interface Self
 */
export interface Self {
  /**
   * href of the show
   *
   * @type {string}
   * @memberof Self
   */
  href: string;
}

/**
 * Image Model
 *
 * @interface Image
 */
export interface Image {
  /**
   * medium of the show
   *
   * @type {string}
   * @memberof Image
   */
  medium: string;
  /**
   * original of the show
   *
   * @type {string}
   * @memberof Image
   */
  original: string;
}

/**
 * Externals Model
 *
 * @interface Externals
 */
export interface Externals {
  /**
   * tvrage of the show
   *
   * @type {number}
   * @memberof Externals
   */
  tvrage: number;
  /**
   * thetvdb of the show
   *
   * @type {number}
   * @memberof Externals
   */
  thetvdb: number;
  /**
   * imdb of the show
   *
   * @type {string}
   * @memberof Externals
   */
  imdb: string;
}

/**
 * WebChannel Model
 *
 * @interface WebChannel
 */
export interface WebChannel {
  /**
   * id of the show
   *
   * @type {number}
   * @memberof WebChannel
   */
  id: number;
  /**
   * name of the show
   *
   * @type {string}
   * @memberof WebChannel
   */
  name: string;
  /**
   * country of the show
   *
   * @type {Country}
   * @memberof WebChannel
   */
  country: any;
  /**
   * officialSite of the show
   *
   * @type {string}
   * @memberof WebChannel
   */
  officialSite: string;
}

/**
 * Network Model
 *
 * @interface Network
 */
export interface Network {
  /**
   * id of the show
   *
   * @type {number}
   * @memberof Network
   */
  id: number;
  /**
   * name of the show
   *
   * @type {string}
   * @memberof Network
   */
  name: string;
  /**
   * country of the show
   *
   * @type {Country}
   * @memberof Network
   */
  country: Country;
  /**
   * officialSite of the show
   *
   * @type {string}
   * @memberof Network
   */
  officialSite: string;
}

/**
 * Country Model
 *
 * @interface Country
 */
export interface Country {
  /**
   * name of the Country
   *
   * @type {string}
   * @memberof Country
   */
  name: string;
  /**
   * code of the Country
   *
   * @type {string}
   * @memberof Country
   */
  code: string;
  /**
   * timezone of the Country
   *
   * @type {string}
   * @memberof Country
   */
  timezone: string;
}

/**
 * Rating Model
 *
 * @interface Rating
 */
export interface Rating {
  /**
   * average of the show
   *
   * @type {number}
   * @memberof Rating
   */
  average: number;
}

/**
 * Schedule Model
 *
 * @interface Schedule
 */
export interface Schedule {
  /**
   * time of the show
   *
   * @type {string}
   * @memberof Schedule
   */
  time: string;
  /**
   * days of the show
   *
   * @type {string[]}
   * @memberof Schedule
   */
  days: string[];
}

/**
 * Partial Type of Show
 *
 * @export
 * @type OpcionalShow
 */
export type OpcionalShow = Partial<Show>;

/**
 * ShowDTO Model
 *
 * @export
 * @interface ShowDTO
 */
export interface ShowDTO {
  /**
   * score of the show
   *
   * @type {number}
   * @memberof ShowDTO
   */
  score?: number;
  /**
   * Info of the show
   *
   * @type {OpcionalShow}
   * @memberof ShowDTO
   */
  show: OpcionalShow;
}

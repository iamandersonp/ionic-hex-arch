/**
 * Logger adapter
 *
 * @export
 * @abstract
 * @class LoggerAdapter
 */
export abstract class LoggerAdapter {
  /**
   * Array to store all the logs in the lifecycle of the app
   *
   * @private
   * @type {Array<{ text: string; tipo: string }>}
   * @memberof LoggerAdapter
   */
  private _logEvents: Array<{
    text: string;
    tipo: string;
  }> = [];

  /**
   * gettter for logEvents
   *
   * @type {Array<{
   *     text: string;
   *     tipo: string;
   *   }>}
   * @memberof LoggerAdapter
   */
  public get logEvents(): Array<{
    text: string;
    tipo: string;
  }> {
    return this._logEvents;
  }

  /**
   * setter for logEvents
   *
   * @memberof LoggerAdapter
   */
  public set logEvents(
    value: Array<{ text: string; tipo: string }>
  ) {
    this._logEvents = value;
  }

  /**
   * Debug message
   *
   * @abstract
   * @param {string} message - message to log
   * @memberof LoggerAdapter
   */
  abstract debug(message: string): void;

  /**
   * Info message
   *
   * @abstract
   * @param {string} message - message to log
   * @memberof LoggerAdapter
   */
  abstract info(message: string): void;

  /**
   * Warning message
   *
   * @abstract
   * @param {string} message - message to log
   * @memberof LoggerAdapter
   */
  abstract warning(message: string): void;

  /**
   * Error message
   *
   * @abstract
   * @param {string} message - message to log
   * @memberof LoggerAdapter
   */
  abstract error(message: string): void;

  /**
   * Initialize logger
   *
   * @abstract
   * @param {string} service - service name
   * @memberof LoggerAdapter
   */
  abstract init(service: string): void;

  /**
   * Start message
   *
   * @abstract
   * @param {string} service - service name
   * @memberof LoggerAdapter
   */
  abstract start(service: string): void;

  /**
   * End message
   *
   * @abstract
   * @param {string} service - service name
   * @memberof LoggerAdapter
   */
  abstract end(service: string): void;
}

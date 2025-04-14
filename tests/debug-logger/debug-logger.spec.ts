import { createDebugLogger, TFormatFunction } from "../../src/utils/debug-logger-factory";


let logArgs: unknown[];

function spyInit() {
    logArgs = [];
}

function log(...args: unknown[]) {
    logArgs.push(args);
}

function getLogArgs<T>(index: number = 0): T {
    return logArgs[index] as T;
}

describe('Debug Logger', () => {
    const LOG_PREFIX = '[LOG_PREFIX]'
    beforeEach(() => {
        spyInit();
    })
    it('With DEBUG === true, should work', () => {

        let DEBUG = true;
        const logger = createDebugLogger(DEBUG, LOG_PREFIX, undefined, log);

        const MESSAGE = 'LOG MESSAGE';

        logger(MESSAGE);
        const args = getLogArgs<string[]>();
        expect(args[0]).toEqual(LOG_PREFIX);
        expect(args[1]).toEqual(MESSAGE);

    });

    it('With DEBUG === false, should be silent', () => {
        let DEBUG = false;
        const logger = createDebugLogger(DEBUG, LOG_PREFIX, undefined, log);

        const MESSAGE = 'LOG MESSAGE';

        logger(MESSAGE);
        const args = getLogArgs<string[]>();
        expect(args).toBeUndefined();
    });

    it('With global format function, should format output', () => {
        let DEBUG = true;
        const gFormat: TFormatFunction = (message: string, data?: unknown[]) => {
            return !data ? message : data.join(message);
        }
        const logger = createDebugLogger(DEBUG, LOG_PREFIX, gFormat, log);

        const MESSAGE = '<>';
        const data = [1, 2, 3];
        logger(MESSAGE);
        logger(MESSAGE, data);

        const args0 = getLogArgs<string[]>(0);
        const args1 = getLogArgs<string[]>(1);

        expect(args0[1]).toEqual(MESSAGE);
        expect(args1[1]).toEqual(`${data[0]}${MESSAGE}${data[1]}${MESSAGE}${data[2]}`);
    });
});
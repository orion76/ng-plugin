export type TFormatFunction = (message: string, data?: unknown[]) => string
export type TConditionFunction = (...data: unknown[]) => boolean
export type TDebugLogger = (message: string, data?: unknown[] | Function, format?: TFormatFunction, condition?: TConditionFunction) => void;
export type TLogFunction = (...vars: unknown[]) => void;

export const fprint: TFormatFunction = (message: string, values?: unknown[]) => {
    return !values ?
        message :
        values.reduce((output: string, value, i) => output.replaceAll(`%${i}`, String(value)), message);
}


export function createDebugLogger(DEBUG: boolean, label: string, gFormat?: TFormatFunction, log: TLogFunction = console.log) {
    if (!DEBUG) {
        return () => undefined;
    }

    return (message?: string, data?: unknown[] | Function, lFormat?: TFormatFunction, condition?: TConditionFunction) => {
        if (!condition || condition()) {
            const _data = typeof data === 'function' ? data() : data;
            const _format = lFormat || gFormat;
            const output: unknown[] = [label];
            if (_format) {
                if (message) {
                    output.push(_format(message, _data));
                }
            } else {
                if (message) {
                    output.push(message);
                }
                if (_data) {
                    output.push(_data);
                }
            }
            log(...output);
        }
    }
}
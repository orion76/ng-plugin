export type TDebugLogger = (...vars: any[]) => void;



export function createDebugLogger(DEBUG: boolean, label: string): TDebugLogger {
    if (!DEBUG) {
        return () => undefined;
    }
    return (...vars: any[]) => {
        console.log(label, ...vars.map((v: any) => typeof v === 'function' ? v() : v));
    }
}
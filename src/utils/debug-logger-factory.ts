export type TDebugLogger = (...vars: any[]) => void;

export function createDebugLogger(DEBUG: boolean, label: string): TDebugLogger {
    return DEBUG ? (...vars: any[]) => console.log(label, ...vars) : () => undefined
}
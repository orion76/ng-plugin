import { TObjectKeys } from "./types";

export function extractObjectProperties<T extends object, K extends keyof T = keyof T>(obj: T, props: K[]): Partial<T> {
    return props.reduce((extracted: Partial<T>, prop) => {
        extracted[prop] = obj[prop];
        return extracted;
    }, {})
}
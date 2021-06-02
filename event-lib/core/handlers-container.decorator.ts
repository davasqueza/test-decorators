import { HANDLER_BASE } from '../constants';

export function HandlersContainer(base: string): <T extends { new(...args: any[]): {} }>(constructor: T) => any {
    return (constructor: any) => {
        // the new constructor behaviour
        const decoratedConstructor: any = function (...args) {
            console.log(`Initializing handler container "${constructor.name}" with base "${base}"`);
            return new constructor(...args);
        }

        // copy prototype so intanceof operator still works
        decoratedConstructor.prototype = constructor.prototype;

        Reflect.defineMetadata(HANDLER_BASE, base, decoratedConstructor);

        // return new constructor (will override original)
        return decoratedConstructor;
    };
}
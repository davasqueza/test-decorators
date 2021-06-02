import { HANDLER_LIST, HANDLER_PARAMETERS_VALIDATORS } from '../constants';
import { Validator } from '../interfaces/validator.interface';
import { validateArguments } from '../validators/validators';

export function Handler(event: string): MethodDecorator {
    return (target: any, handler: string, descriptor: PropertyDescriptor) => {
        console.log(`Initializing handler "${handler}" for event "${event} and container "${target.constructor.name}"`);
        let originalMethod = descriptor.value;
        let handlers: Map<string, string> = Reflect.getOwnMetadata(HANDLER_LIST, target) || new Map();

        handlers.set(event, handler);
        Reflect.defineMetadata(HANDLER_LIST, handlers, target);

        descriptor.value = function decoratedMethod(...args: any[]) {
            let validators: Validator[] = Reflect.getOwnMetadata(HANDLER_PARAMETERS_VALIDATORS, target) || [];
            const errors = validateArguments(args, validators);
            if(errors.length) {
                return {
                    message: "Invalid event parameters",
                    errors
                };
            }
            else {
                return originalMethod.apply(this, args);
            }
        }
    }
}
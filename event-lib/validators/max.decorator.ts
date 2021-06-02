import { HANDLER_PARAMETERS_VALIDATORS } from '../constants';
import { Validator } from '../interfaces/validator.interface';
import { Validators } from '../enums';

export function Max(maxValue: number): ParameterDecorator {
    return (target : any, key : string, index: number) => {
        let validators: Validator[] = Reflect.getOwnMetadata(HANDLER_PARAMETERS_VALIDATORS, target) || [];
        validators.push({
            type: Validators.MAX_VALIDATOR,
            options: { index, key, maxValue },
        });
        Reflect.defineMetadata(HANDLER_PARAMETERS_VALIDATORS, validators, target);
    };
}
import { Validator } from '../interfaces/validator.interface';
import { HANDLER_PARAMETERS_VALIDATORS } from '../constants';
import { Validators } from '../enums';

export function Min(minNumber: number): ParameterDecorator {
    return (target : any, key : string, index: number) => {
        let validators: Validator[] = Reflect.getOwnMetadata(HANDLER_PARAMETERS_VALIDATORS, target) || [];
        validators.push({
            type: Validators.MIN_VALIDATOR,
            options: { index, key, minNumber },
        });
        Reflect.defineMetadata(HANDLER_PARAMETERS_VALIDATORS, validators, target);
    };
}
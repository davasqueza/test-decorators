import { Validator } from '../interfaces/validator.interface';
import { ParamError } from '../interfaces/param-error';
import { Validators } from '../enums';

export function validateArguments(args: any[], validators: Validator[]): ParamError[] {
    return validators.map( validator => {
        switch (validator.type) {
            case Validators.MAX_VALIDATOR:
                return validateMaxValue(args, validator.options);
            case Validators.MIN_VALIDATOR:
                return validateMinValue(args, validator.options);
            default:
                return null;
        }
    }).filter(error => error);
}

function validateMaxValue(args: any[], validationOptions: Validator["options"]): ParamError {
    const {index, key, maxValue} = validationOptions;
    const argToValidate = args[index];
    if(argToValidate > maxValue) {
        return {
            index,
            key,
            error: `Invalid value for parameter "${key}", ${argToValidate} is greater than ${maxValue}`
        };
    }
    return null;
}

function validateMinValue(args: any[], validationOptions: Validator["options"]): ParamError {
    const {index, key, minValue} = validationOptions;
    const argToValidate = args[index];
    if(argToValidate > minValue) {
        return {
            index,
            key,
            error: `Invalid value for parameter "${key}", ${argToValidate} is lesser than ${minValue}`
        };
    }
    return null;
}
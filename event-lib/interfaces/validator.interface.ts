import { Validators } from '../enums';

export interface Validator {
    type: Validators;
    options?: {
        index: number,
        key: string,
    } & Record<string, any>;
}
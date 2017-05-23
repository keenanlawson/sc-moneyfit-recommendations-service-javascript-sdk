import ExtendableException from './ExtendableException';

export default class ServiceValidationException extends ExtendableException {

    constructor(message) {
        super(message);
    }
}

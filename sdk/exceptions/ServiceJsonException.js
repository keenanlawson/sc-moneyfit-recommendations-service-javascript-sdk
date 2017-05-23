import ExtendableException from './ExtendableException';

export default class ServiceJsonException extends ExtendableException {

    constructor(message) {
        super(message);
    }
}

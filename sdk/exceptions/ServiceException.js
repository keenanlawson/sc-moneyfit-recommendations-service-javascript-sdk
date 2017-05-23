import ExtendableException from './ExtendableException';

export default class ServiceException extends ExtendableException {

    constructor(message) {
        super(message);
    }
}

export default class ErrorDTO {

    constructor({errorCode = null, errorMessage = '', id = '', directive = ''} = {}) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.id = id;
        this.directive = directive;
    }

    getErrorCode() {
        return this.errorCode;
    }

    setErrorCode(errorCode) {
        this.errorCode = errorCode;
        return this;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    setErrorMessage(errorMessage) {
        this.errorMessage = errorMessage;
        return this;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    getDirective() {
        return this.directive;
    }

    setDirective(directive) {
        this.directive = directive;
        return this;
    }

    equals(o) {
        if(o === this) {
            return true;
        } else if (!o instanceof ErrorDTO) {
            return false;
        } else {
            const other = new ErrorDTO(o);
            if (!other.canEqual(this)) {
                return false;
            } else {

                let thisErrorMessage = this.getErrorMessage();
                let otherErrorMessage = other.getErrorMessage();
                if (thisErrorMessage === null) {
                    if (otherErrorMessage !== null) {
                        return false;
                    }
                } else if (!thisErrorMessage.equals(otherErrorMessage)) {
                    return false;
                }

                let thisId = this.getId();
                let otherId = other.getId();
                if (thisId === null) {
                    if (otherId !== null) {
                        return false;
                    }
                } else if (!thisId.equals(otherId)) {
                    return false;
                }

                let thisDirective = this.getDirective();
                let otherDirective = other.getDirective();
                if (thisDirective === null) {
                    if (otherDirective !== null) {
                        return false;
                    }
                } else if (!thisDirective.equals(otherDirective)) {
                    return false;
                }

                return true;
            }
        }
    }

    canEqual(other) {
        return other instanceof this;
    }
    
    hashCode() {
        let result = 1;
        result = result * 59 + this.getErrorCode();
        let errorMessage = this.getErrorMessage();
        result = result * 59 + (errorMessage === null ? 0 : errorMessage.hashCode());
        let id = this.getId();
        result = result * 59 + (id === null ? 0 : id.hashCode());
        let directive = this.getDirective();
        result = result * 59 + (directive === null ? 0 : directive.hashCode());
        return result;
    }
    
    toString() {
        return `ErrorDTO(errorCode=${this.getErrorCode()}, errorMessage=${this.getErrorMessage()}, id=${this.getId()}, directive=${this.getDirective()})`;
    }
}

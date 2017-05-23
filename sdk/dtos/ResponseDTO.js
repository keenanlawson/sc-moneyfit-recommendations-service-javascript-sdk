/**
 * 'Enum' for a TokenType
 * @readonly
 * @enum {String}
 */
export const Result = Object.freeze({
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
});

export default class ResponseDTO {

    constructor({result = null, data = null, errors = []} = {}) {
        this.result = result;
        this.data = data;
        this.errors = errors;
    }

    failed() {
        return this.errors !== null && this.errors.length > 0;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        if (typeof data === 'string') {
            this.data = JSON.parse(data);
        } else if (typeof data === 'object') {
            this.data = data;
        }
        return this;
    }

    getResult() {
        return this.result;
    }

    setResult(result) {
        this.result = result;
        return this;
    }

    getErrors() {
        return this.errors;
    }

    setErrors(errors = []) {
        this.errors = this.errors.concat(errors);
        return this;
    }

    equals(o) {
        if(o === this) {
            return true;
        } else if (!o instanceof ResponseDTO) {
            return false;
        } else {
            const other = new ResponseDTO(o);
            if (!other.canEqual(this)) {
                return false;
            } else {

                let thisResult = this.getResult();
                let otherResult = other.getResult();
                if (thisResult === null) {
                    if (otherResult !== null) {
                        return false;
                    }
                } else if (!thisResult.equals(otherResult)) {
                    return false;
                }

                let thisData = this.getData();
                let otherData = other.getData();
                if (thisData === null) {
                    if (otherData !== null) {
                        return false;
                    }
                } else if (!thisData.equals(otherData)) {
                    return false;
                }

                let thisErrors = this.getErrors();
                let otherErrors = other.getErrors();
                if (thisErrors === null) {
                    if (otherErrors !== null) {
                        return false;
                    }
                } else if (!thisErrors.equals(otherErrors)) {
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
        let thisResult = this.getResult();
        result = result * 59 + (thisResult === null ? 0 : thisResult.hashCode());
        let data = this.getData();
        result = result * 59 + (data === null ? 0 : data.hashCode());
        let errors = this.getErrors();
        result = result * 59 + (errors === null ? 0 : errors.hashCode());
        return result;
    }
    
    toString() {
        return `ResponseDTO(result=${this.getResult()}, data=${this.getData()}, errors=${this.getErrors()})`;
    }
}

export default class ServiceAuthentication {

    constructor({tokenType = '', token = '', userId = ''}) {
        this.tokenType = tokenType;
        this.token = token;
        this.userId = userId;
    }

    getTokenType() { return this.tokenType; }

    getToken() { return this.token; }

    getUserId() { return this.userId; }

    toString() {
        return `tokenType: ${this.getTokenType()}, token: ${this.getToken()}, userId: ${this.getUserId()}`;
    }

    print() {
        console.log(this.toString());
    }
};

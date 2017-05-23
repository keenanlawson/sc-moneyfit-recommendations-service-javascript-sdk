import ServiceException from '../exceptions/ServiceException';
import RequestBuilder from '../clients/RequestBuilder';

let _logger = new WeakMap();

export default class ServiceClient {

    constructor() {
        this.requestBuilder = new RequestBuilder();
    }

    debug(logger) {
        _logger.set(this, logger);
    }

    sanitizeTokenTypeAndToken(serviceAuthentication, userId) {
        if(!userId) {
            throw new ServiceException("No user id found");
        } else if(!serviceAuthentication) {
            throw new ServiceException("No authentication credentials found");
        } else if(!serviceAuthentication.getTokenType()) {
            throw new ServiceException("No TokenType or token specified");
        }
    }

    getToken(hostUrl, serviceAuthentication, credentials) {
        let getDataPromise = null;
        try {
            this.sanitizeTokenTypeAndToken(serviceAuthentication, credentials);
            const requestOptions = this.requestBuilder.buildHttpEntity(serviceAuthentication, credentials);
            requestOptions.json = true;
            requestOptions.qs = { grant_type: 'password' };
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Request -> ', requestOptions);
            getDataPromise = this.requestBuilder.createRequest(hostUrl, 'POST', requestOptions);
        } catch (ex) {
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Exception -> ', JSON.stringify(ex));
        }
        return getDataPromise;
    }

    getRecommendation(hostUrl, serviceAuthentication, userId, recommendationModule, recommendationFormat) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(serviceAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(serviceAuthentication, null);
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Request -> ', requestOptions);
            promise = this.requestBuilder.createRequest(`${hostUrl}/${userId}/${recommendationModule}?type=${recommendationFormat}`, 'GET', requestOptions);
        } catch (ex) {
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Exception -> ', JSON.stringify(ex));
        }
        return promise;
    }
};

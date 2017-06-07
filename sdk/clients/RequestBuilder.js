import TokenType from './TokenType';
import request from 'request';

let _logger = new WeakMap();

export default class RequestBuilder {

    constructor() {}

    debug(logger) {
        _logger.set(this, logger);
    }

    buildHttpHeader(tokenType, token) {
        return {
            authorization: `${TokenType.getPrependedAuthHeaderString(tokenType)} ${token}`,
            'Content-Type': 'application/json'
        };
    }

    buildHttpEntity(serviceAuthentication, entity) {
        let httpEntity = {};
        if (serviceAuthentication) {
            let tokenType = serviceAuthentication.getTokenType();
            let token = serviceAuthentication.getToken();
            httpEntity.headers = this.buildHttpHeader(tokenType, token);
        }
        if (entity) {
            httpEntity.body = entity;
        }
        return httpEntity;
    }

    updateQueryStringParameter(uri, key, value) {
        const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        const separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    createRequest(url, method = 'GET', options) {
        const cacheBustUrl = this.updateQueryStringParameter(url, 'cache-bust', Date.now());
        return new Promise((resolve, reject) => {
            const requestOptions = {url: cacheBustUrl, method: method, headers: options.headers};
            if (options.body) {
                requestOptions.body = options.body;
            }
            if (options.json) {
                requestOptions.json = options.json;
            }
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Request Options -> ', requestOptions);
            request(requestOptions, (err, response, body) => {
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Request Response -> ', { requestOptions, err, response, body });
                if (err) { reject(err); }
                else { resolve(body); }
            });
        });
    }
};

import ServiceJsonException from '../exceptions/ServiceJsonException';
import ServiceValidationException from '../exceptions/ServiceValidationException';
import ExceptionDirective from '../exceptions/ExceptionDirective';
import ErrorDTO from '../dtos/ErrorDTO';
import ResponseDTO from '../dtos/ResponseDTO';
import {Result} from '../dtos/ResponseDTO';

let _logger = new WeakMap();

export default class RequestExecutor {

    constructor() {}

    debug(logger) {
        _logger.set(this, logger);
    }

    /**
     *
     * @param {Promise} promise
     * @param {Function} resolve
     * @param {Function} reject
     * @returns {*}
     */
    executeRequest(promise, resolve, reject) {
        let responseDTO = {};
        try {
            promise.then((response) => {
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Raw Response -> ', response);
                responseDTO = this.handleSuccessfulResponse(response);
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: DTO Response -> ', responseDTO);
                resolve(responseDTO);
            }).catch((err) => {
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Raw Error -> ', err);
                if (err instanceof ServiceJsonException) {
                    responseDTO = this.handleFailedResponse({serviceJsonException: err});
                } else if (err instanceof ServiceValidationException) {
                    responseDTO = this.handleFailedResponse({serviceValidationException: err});
                } else {
                    responseDTO = this.handleGenericFailedResponse(err);
                }
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: DTO Error -> ', err);
                reject(responseDTO);
            });
        } catch (err) {
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Raw Error -> ', err);
            responseDTO = this.handleGenericFailedResponse(err);
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: DTO Error -> ', err);
            reject(responseDTO);
        }
    }

    executeRawRequest(promise, resolve, reject) {
        let responseDTO = {};
        try {
            promise.then((response) => {
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Raw Response -> ', response);
                responseDTO = this.handleSuccessfulResponse(response);
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: DTO Response -> ', responseDTO);
                resolve(responseDTO);
            }).catch((err) => {
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Raw Error -> ', err);
                if (err instanceof ServiceJsonException) {
                    responseDTO = this.handlePostPageFailedResponse({serviceJsonException: err});
                } else if (err instanceof ServiceValidationException) {
                    responseDTO = this.handlePostPageFailedResponse({serviceValidationException: err});
                } else {
                    responseDTO = this.handleGenericFailedResponse(err);
                }
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: DTO Error -> ', err);
                reject(responseDTO);
            });
        } catch (err) {
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Raw Error -> ', err);
            responseDTO = this.handleGenericFailedResponse(err);
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: DTO Error -> ', err);
            reject(responseDTO);
        }
    }

    executeNoResponseRequest(promise, resolve, reject) {
        let responseDTO = {};
        try {
            promise.then((response) => {
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Raw Response -> ', response);
                responseDTO = this.handleSuccessfulResponse(response);
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: DTO Response -> ', responseDTO);
                resolve(responseDTO);
            }).catch((err) => {
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Raw Error -> ', err);
                responseDTO = this.handleGenericFailedResponse(err);
                _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: DTO Error -> ', responseDTO);
                reject(responseDTO);
            });
        } catch (err) {
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: Raw Error -> ', err);
            responseDTO = this.handleGenericFailedResponse(err);
            _logger.get(this)('MoneyFitRecommendationsServiceSDK Logger: DTO Error -> ', responseDTO);
            reject(responseDTO);
        }
    }

    handleSuccessfulResponse(response) {
        if (response.hasOwnProperty('data') && response.hasOwnProperty('result')) {
            return new ResponseDTO(Object.assign(response, {errors: []}));
        } else {
            return new ResponseDTO()
                .setData(response)
                .setResult(Result.SUCCESS);
        }
    }

    handleFailedResponse({serviceJsonException, serviceValidationException}) {
        let responseDTO = new ResponseDTO().setResult(Result.FAILURE);
        if (serviceJsonException) {
            responseDTO.setErrors(this.buildErrorDTO(serviceJsonException));
        } else if (serviceValidationException) {
            responseDTO.setErrors(new ErrorDTO()
                .setDirective(ExceptionDirective.LOG)
                .setErrorCode(412)
                .setErrorMessage(serviceValidationException.message));
        }
        return responseDTO;
    }

    handleGenericFailedResponse(exception) {
        return new ResponseDTO()
            .setResult(Result.FAILURE)
            .setErrors(new ErrorDTO()
                .setDirective(ExceptionDirective.LOG)
                .setErrorCode(500)
                .setErrorMessage(exception.message)
            );
    }

    buildErrorDTO(serviceJsonException) {
        return serviceJsonException.getErrors().map((error) => {
            return new ErrorDTO()
                .setDirective(serviceJsonException.getExceptionDirective().name())
                .setErrorCode(serviceJsonException.getErrorCode().intValue())
                .setErrorMessage(error.message);
        });
    }

    handlePostPageFailedResponse({serviceJsonException, serviceValidationException}) {
        let responseDTO = new ResponseDTO().setResult(Result.FAILURE);
        if (serviceJsonException) {
            responseDTO.setErrors(this.buildErrorDTO(serviceJsonException));
        } else if (serviceValidationException) {
            responseDTO.setErrors(new ErrorDTO()
                .setDirective(ExceptionDirective.LOG)
                .setErrorCode(412)
                .setErrorMessage(serviceValidationException.message));
        }
        return responseDTO;
    }
};

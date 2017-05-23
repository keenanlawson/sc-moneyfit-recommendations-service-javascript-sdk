const MoneyFitRecommendationsServiceSDK = require('./build/MoneyFitRecommendationsServiceSDK').default;

const _SDK = new MoneyFitRecommendationsServiceSDK({
    protocol: 'http',
    host: 'localhost',
    port: '4001',
    pathname: '/moneyfit-recommendations'
});

// const _TOKEN_AUTH = MoneyFitRecommendationsServiceSDK.getAuthentication({
//     tokenType: 'BASIC',
//     token: 'c2hhcmVjYXJlOmhzd2k='
// });
// const _TOKEN_BODY = {username: 'klawson@sharecare.com', password: 'sharecare'};

const getTestAuth = () => {
    return new Promise((resolve, reject) => {
        MoneyFitRecommendationsServiceSDK.getAuthentication({tokenType: 'BASIC', token: 'c2hhcmVjYXJlOmhzd2k='})
            .then((response) => {
                console.log('getAuthentication SUCCESS: ', response);
                resolve({auth: response.data, body: {username: 'klawson@sharecare.com', password: 'sharecare'}})
            })
            .catch((err) => {
                console.log('getAuthentication ERROR: ', err);
                reject(err);
            });
    });
};

const getAccessToken = (authResponse) => {
    return new Promise((resolve, reject) => {
        MoneyFitRecommendationsServiceSDK.getToken('https://auth.mservices.sharecare.com/access', authResponse.auth, authResponse.body)
            .then((response) => {
                console.log('getToken SUCCESS: ', response);
                resolve(response.data);
            })
            .catch((err) => {
                console.log('getToken ERROR: ', err);
                reject(err);
            });
    });
};

const logToken = (response) => {
    return new Promise((resolve, reject) => {
        console.log('TEST SUCCESS: ', response);
        resolve(response);
    });
};

const logError = (err) => {
    console.log('TEST ERROR: ', err);
};

const getServiceAuth = (authResponse) => {
    return new Promise((resolve, reject) => {
        if (!authResponse || !authResponse.access_token || !authResponse.account_id) {
            reject(new Error('Invalid token or token parameters: ' + authResponse.toString()));
        } else {
            MoneyFitRecommendationsServiceSDK.getAuthentication({
                tokenType: 'SSO',
                token: authResponse.access_token,
                userId: authResponse.account_id
            })
                .then((response) => {
                    resolve(response.data);

                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
};

const getScoreSummary = (serviceAuth) => {
    return new Promise((resolve, reject) => {
        _SDK.getScoreSummary(serviceAuth, serviceAuth.getUserId())
            .then((response) => {
                console.log('getScoreSummary SUCCESS: ', response);
                resolve(response.data);
            })
            .catch((err) => {
                console.log('getScoreSummary ERROR: ', err);
                reject(err);
            });
    });
};



getTestAuth()
    .then(getAccessToken)
    .then(logToken)
    .then(getServiceAuth)
    .then(getScoreSummary)
    .catch(logError);




// const getUserDetails = (authentication) => {
//     _SDK.getUserDetails(
//         authentication.auth,
//         authentication.userId,
//         (response) => {
//             console.log('Details Success: ', response);
//         },
//         (err) => {
//             console.log('Details Error: ', err);
//         }
//     );
//     return authentication;
// };
//
// const getAllAssessments = (authentication) => {
//     _SDK.getAllAssessments(
//         authentication.auth,
//         authentication.userId,
//         (response) => {
//             console.log('Assessments Success: ', response);
//         },
//         (err) => {
//             console.log('Assessments Error: ', err);
//         }
//     );
//     return authentication;
// };
//
// const getCalculation = (authentication) => {
//     _SDK.getCalculation(
//         authentication.auth,
//         authentication.userId,
//         745440,
//         (response) => {
//             console.log('Calculation Success: ', response);
//         },
//         (err) => {
//             console.log('Calculation Error: ', err);
//         }
//     );
//     return authentication;
// };
//
// const getRecommendations = (authentication) => {
//     _SDK.getRecommendations(
//         authentication.auth,
//         authentication.userId,
//         // 1461055,
//         745440,
//         (response) => {
//             console.log('Recommendations Success: ', response);
//         },
//         (err) => {
//             console.log('Recommendations Error: ', err);
//         }
//     );
//     return authentication;
// };
//
// const getAssessmentStatusForUser = (authentication) => {
//     return new Promise((resolve, reject) => {
//         _SDK.getAssessmentStatusForUser(authentication.auth, authentication.userId, 1461055)
//             .then((response) => {
//                 console.log('Assessment Status Success: ', response);
//                 resolve(response);
//             })
//             .catch((err) => {
//                 console.log('Assessment Status Error: ', err);
//                 reject(err);
//             });
//     });
// };
//
// const getFirstPage = (authentication) => {
//     _SDK.getFirstPage(
//         authentication.auth,
//         authentication.userId,
//         1461055,
//         // 745440,
//         (response) => {
//             console.log('First Page Success: ', response);
//         },
//         (err) => {
//             console.log('First Page Error: ', err);
//         }
//     );
//     return authentication;
// };
//
// const savePage = (authentication) => {
//     _SDK.postPage(
//         authentication.auth,
//         authentication.userId,
//         1461055,
//         "1",
//         "1",
//         {
//             "1463169": [
//                 {
//                     "20090": "average"
//                 }
//             ]
//         },
//         (response) => {
//             console.log('Save Page Success: ', response);
//         },
//         (err) => {
//             console.log('Save Page Error: ', err);
//         }
//     );
//     return authentication;
// };

// const getToken = MoneyFitRecommendationsServiceSDK.getToken('https://auth.mservices.sharecare.com/access', _TOKEN_AUTH, _TOKEN_BODY);
// console.log(getToken);
    // .then((response) => { console.log(response); })
    // .catch((err) => { console.log(err); });

// new Promise(getAccessToken)
//     .then(getRatAuthentication)
//     // .then(getAllAssessments)
//     // .then(getUserDetails)
//     // .then(getCalculation)
//     // .then(getRecommendations)
//     .then(getAssessmentStatusForUser)
//     // .then(getFirstPage)
//     // .then(savePage)
//     .then((response) => {
//         console.log('XXX', response);
//     })
//     .catch((e) => {
//         console.log('App Error: ', e);
//     });

// new Promise(getAccessToken)
//     .then(getRatAuthentication)
//     // .then(getAllAssessments)
//     // .then(getUserDetails)
//     // .then(getCalculation)
//     // .then(getRecommendations)
//     .then(getAssessmentStatusForUser)
//     // .then(getFirstPage)
//     // .then(savePage)
//     .then((response) => {
//         console.log('XXX', response);
//     })
//     .catch((e) => {
//         console.log('App Error: ', e);
//     });

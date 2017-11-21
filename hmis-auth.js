require('dotenv').config();

const request = require('request-promise');
const NodeCache = require("node-cache");
const Storage = require('node-storage');

const config = {
    clientId: process.env.HMIS_API_CLIENTID,
    clientSecret: process.env.HMIS_API_CLIENTSECRET,
    accessToken: process.env.HMIS_API_ACCESSTOKEN,
    refreshToken: process.env.HMIS_API_REFRESHTOKEN
};
const acccessTokenKey = 'hmis-accessToken';
const refreshTokenKey = 'hmis-refreshToken';
var authCache = new NodeCache({stdTTL: 100});

const setCache = (key, value) => new Promise((resolve, reject) => {
    authCache
        .set(key, value, function (err, success) {
            if (!err && success) {
                resolve();
            } else {
                reject(err)
            }
        });
});

const getCache = (key) => new Promise((resolve, reject) => {
    authCache
        .get(key, function (err, value) {
            if (!err) {
                resolve(value);
            } else {
                reject(err)
            }
        });
});

var self = module.exports = {
    getBasicAuthHeaders: () => {
        return {
            'X-HMIS-TrustedApp-Id': config.clientId,
            Authorization: 'Basic ' + new Buffer(config.clientId + ':' + config.clientSecret).toString('base64'),
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    },
    getAccessTokenAuthHeaders: async() => {
        const token = await self.getAccessToken();
        return {
            'X-HMIS-TrustedApp-Id': config.clientId,
            Authorization: 'HMISUserAuth session_token=' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    },
    getAccessToken: async() => {
        const options = {
            url: 'https://www.hmislynk.com/hmis-authorization-service/rest/token',
            qs: {
                grant_type: 'refresh_token',
                refresh_token: config.refreshToken
            },
            headers: self.getBasicAuthHeaders(),
            json: true
        }
        const token = await getCache(acccessTokenKey);

        if (!token || token === undefined) {
            const response = await request.post(options);

            if (response.oAuthAuthorization) {
                const oAuthAuthorization = response.oAuthAuthorization;

                if (oAuthAuthorization.expiresIn) {
                    authCache = new NodeCache({stdTTL: oAuthAuthorization.expiresIn});
                    await setCache(acccessTokenKey, oAuthAuthorization.accessToken);

                    console.log('oAuthAuthorization.accessToken', oAuthAuthorization.accessToken);
                    return oAuthAuthorization.accessToken;
                }
            }
        } else {
            return token;
        }
    }
};
const NodeCache = require("node-cache");
const authCache = new NodeCache({stdTTL: 100});

authCache.del([
    "hmis-accessToken", "hmis-refreshToken"
], function (err, count) {
    if (!err) {
        console.log('Removed Keys:', count);
        console.log('Done');
    }
});
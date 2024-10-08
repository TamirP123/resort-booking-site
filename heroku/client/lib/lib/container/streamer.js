"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamer = void 0;
async function call(url, out, retries) {
    const http = require('http-call').HTTP;
    const maxRetries = 30;
    try {
        const { response } = await http.stream(url);
        response.on('data', function (d) {
            out.write(d);
        });
        return await new Promise(function (resolve, reject) {
            response.on('error', reject);
            response.on('end', resolve);
        });
    }
    catch (error) {
        if (error.statusCode === 404 && retries <= maxRetries) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    call(url, out, retries + 1).then(resolve, reject);
                }, 1000);
            });
        }
        throw error;
    }
}
const streamer = function (url, out) {
    return call(url, out, 0);
};
exports.streamer = streamer;

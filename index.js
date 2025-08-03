const _ = require('lodash');
const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

// Prototype pollution example
function mergeUserOptions(userInput) {
  return _.merge({}, userInput);
}

// Insecure API call using deprecated request and disabled TLS verification
function callInsecureAPI(callback) {
  const options = {
    url: 'https://self-signed.badssl.com/',
    strictSSL: false, // ⚠️ DISABLE CERT VALIDATION (insecure)
    timeout: 5000
  };

  request.get(options, (error, response, body) => {
    if (error) {
      console.error('Request failed:', error);
      return callback({ error: error.message });
    }
    callback({ statusCode: response.statusCode });
  });
}

// Endpoint to simulate prototype pollution and insecure API call
app.get('/test', (req, res) => {
  // User-controlled input
  const userInput = JSON.parse('{"__proto__": {"admin": true}}');
  const result = mergeUserOptions(userInput);

  callInsecureAPI((apiResult) => {
    res.json({
      message: 'Prototype merged',
      mergedResult: result,
      tlsTest: apiResult
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

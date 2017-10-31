const DB_PATH = 'database';
const fs = require('fs');
const browserifyFs = require('browserify-fs');
Object.assign(fs, browserifyFs); // I don't know why this is necessary

fs.mkdir(DB_PATH);

const Provider = require('ganache-core/lib/provider');
const provider = new Provider({ network_id: 42 });

self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf('testrpc') !== -1){
    const headers = {
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    };

    return event.respondWith(new Promise((f, r) => {
      event.request.json().then(payload => {
        console.log('DATA: ', payload);
        provider.sendAsync(payload, (err, result) => {
          if (err) {
            r(err);
            return;
          }
          headers["Content-Type"] = "application/json";
          f(new Response(JSON.stringify(result), {
            status: 200,
            headers,
          }));
        });
      }).catch((err) => {
        headers["Content-Type"] = "text/plain";
        f(new Response('', {
          status: 400,
          headers,
        }));
      });
    }));
  }
  return fetch(event.request);
});

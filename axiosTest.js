const axios = require('axios');

let one =
  "http://localhost/WaWebService/Json/GetTagValue/test";
let two =
  "http://localhost:2020/webaccess/PM25";
let three =
  "http://localhost:2020/webaccess/온도";

var config = {
    'auth': {
      'user': 'admin',
      'pass': 'vetec1'
    },
    body: {
      "Tags":[{
          "Name": "1"
      }]
    },
    json: true
}
config['body']['Tags'][0]['Name'] = "PM10";
const requestOne = axios.post(one, config);
config['body']['Tags'][0]['Name'] = "PM25";
const requestTwo = axios.post(one, config);
config['body']['Tags'][0]['Name'] = "습도";
const requestThree = axios.post(one, config);

axios
  .all([requestOne, requestTwo, requestThree])
  .then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      const responesThree = responses[2];

      // use/access the results
      console.log(responseOne, responseTwo, responesThree);
    })
  )
  .catch(errors => {
    // react on errors.
    console.error(errors);
  });
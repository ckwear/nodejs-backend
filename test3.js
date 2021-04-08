
const request = require('request');
var url = 'http://localhost:/2000/user';
url = 'http://localhost/WaWebService/Json/GetTagValue/test'

var a = {
  auth: {
    'user': 'admin',
    'pass': 'vetec1'
  },
  body: {
    "Tags":[{
        "Name":"1"
    }]
  },
  json: true
}
a['body']['Tags'].push({"Name":'2'})
console.log(a)
console.log(a['body']['Tags'][1]['Name'])
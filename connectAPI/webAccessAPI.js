const request = require("request");
const webAccessURL = "http://localhost/WaWebService/Json/GetTagValue/test";
exports.getAPI = (tagList) => {
	return new Promise(resolve=>{
		request.post(webAccessURL, {
            'auth': {
              'user': 'admin',
              'pass': 'vetec1'
            },
            body: {
              "Tags":tagList
            },
            json: true
        },function(err, req, res) {
            // console.log()
            resolve(req.body)
        });
	})
}


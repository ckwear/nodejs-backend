const webAccessAPI = require('../connectAPI/webAccessAPI');

exports.webAcLogData = webAccessAPI.getWaAPI("http://localhost/WaWebService/Json/GetTagValue/test")
    .then(
        (result) => {
            (req, res) => {
                console.log(result)
                res.send(result)
            }
        }
)
const request = require("request");
const webAccessDevicesInfURL = "http://localhost/WaWebService/Json/TagList/test";
const ac = require('./webAccessAPI')
const headerInf = {
    'auth': {
        'user': 'admin',
        'pass': 'vetec1'
    }
}

exports.getDeviceName = new Promise((resolve, reject) => {
    request.get(webAccessDevicesInfURL, headerInf
        ,(err, req, res) => {
            var deviceNames = [];
            for (var index in JSON.parse(res)['Tags']) {
                var name = JSON.parse(res)['Tags'][index].Name
                deviceNames.push({"Name" : name})
            }
            resolve(deviceNames)
            // console.log(deviceNames)
        })
})
// exports.kk = getDeviceName.then((Names) => {
//     // console.log(Names)
//     ac.getAPI(Names).then(
//         (result) => {
//             // res.send(result)
//             // console.log(result)
//             // return result;
//         })
// })
// console.log(deviceNames)



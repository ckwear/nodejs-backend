const express = require('express');
const route = express.Router();
const user = require('../controller/user');
const auth = require('../auth/auth');
const request = require("request");

const logData = require('../controller/logData')

const ac = require('../connectAPI/webAccessAPI')

route.route('/webAccess')
    .post((req,res) => {
        var reqTagList = [];
        for (key in req.body) {
            reqTagList.push({"Name":req.body[key]})
        }
        // console.log(reqTagList)
        ac.getAPI(reqTagList).then(
            (result) => {
                res.send(result)
                // console.log(result)
            })
})

route.route('/getTagNames')
    .post(logData.getTagNames)

route.route('/reqTagList')
    .post(logData.getTagList)



route.route('/user')
    .post(user.createUser)
    .get(auth.isBasicAuthenticated, user.readUser)
    .put(auth.isBasicAuthenticated, user.updateUser)
    .delete(auth.isBasicAuthenticated, user.deleteUser)

module.exports = route;
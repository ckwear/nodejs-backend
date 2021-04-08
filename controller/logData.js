const searchNames = require('../repository/searchTagNames')
const searchByNameAndDate = require('../repository/searchByNameAndDate')
exports.getTagNames = (req, res) => {
  searchNames.searchTagNames.then((result) =>{
    res.send(result)
  })
}

exports.getTagList = (req, res) => {
  var cortxt = req.body['dateTime'].substr(0, req.body['dateTime'].length-3)
  var pmam = req.body['dateTime'].substr(req.body['dateTime'].length-2, req.body['dateTime'].length)
  var dateTime = cortxt.split(' ')
  console.log(dateTime)
  var date = dateTime[0].split('/')
  var time = dateTime[1].split(':')
  var fixDateTime;
  time[0] *= 1;
  if (pmam === 'PM') {
    time[0] += 12
  }

  time[0] += ""
  if (time[0].length === 1) {
    time[0] = "0" + time[0]
  }

  fixDateTime = date[2] + "-" + date[0] + "-" + date[1] + " " + time[0] + ":" + time[1] + ":00"

  // console.log(fixDateTime)

  searchByNameAndDate.searchTags(fixDateTime, req.body['tagName']).then((result) =>{
    // console.log(req.body['tagName'])
      res.json(result)
  })
}
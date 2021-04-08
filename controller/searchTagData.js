const models = require('./models/index');

let query = `
	SELECT * FROM BwAnalogTable
		WHERE LogTime = :time
		AND TagName like :name`;
let searchByTagNameAndDate = models.sequelize.query(
    query, {
        replacements: {time: '13:58:42', name: '%CO2%'},
        type: models.sequelize.QueryTypes.SELECT,
        raw: true
    });
exports.searchTag = (req,res) => {
    searchByTagNameAndDate.then((result) => {
        res.send(result)
    })
}
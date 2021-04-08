const models = require('../models/index');

let query = `
	SELECT * FROM BwAnalogTable
		WHERE LogDateTime < :dateTime
		AND TagName = :name
		limit 30`;
exports.searchTags = function(logDateTime, TagName) {
    return models.sequelize.query(
        query, {
            replacements: {dateTime: logDateTime, name: TagName},
            // replacements: {date: "21/01/26", time: "13:58:42", name: '%' + "CO0" +'%'},
            type: models.sequelize.QueryTypes.SELECT,
            raw: true
        })
};
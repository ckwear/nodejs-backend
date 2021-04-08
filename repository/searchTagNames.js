const models = require('../models/index');

let query = `
	SELECT DISTINCT TagName
	    FROM BwAnalogTable;`
exports.searchTagNames = models.sequelize.query(
        query, {
            type: models.sequelize.QueryTypes.SELECT,
            raw: true
        })

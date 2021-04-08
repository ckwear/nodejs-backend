var models = require('./models/index');
var LogData = require('./models/LogData')
// models.LogData.drop();    //테이블 삭제
// models.sequelize.sync();  //테이블 생성
//

//BwAnalogTable 생성 가능
// models.LogData.create({
//     ProjNodeId: 4,
//     TagName: 'VT_CO203_온도',
//     LogDate: '21/01/25',
//     LogTime: '13:58:42',
//     MaxValue: 100.0,
//     AvgValue: 100.0,
//     MinValue: 100.0,
//     LastValue: 100.0,
//     Alarm: 1
// })

//BwAnalogTable 조회 가능
let query = `
	SELECT * FROM BwAnalogTable
		WHERE LogTime = :time
		AND TagName like :name`;
models.sequelize.query(
    query,
    {
        replacements: {time: '13:58:42', name: '%CO2%'},
        type: models.sequelize.QueryTypes.SELECT,
        raw: true
    }).then((result) => {
        // console.log(result)
});


//BwAnalogTable 업데이트 미지수
// models.LogData.update(
//     {ProjNodeId: 3},
//     {
//         where: {
//             time: '13:58:42',
//             name: 'VT_CO203_온도',
//             ProjNodeId: 4
//         }})

//BwAnalogTable 삭제
const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 2020;
const router = require('./route/router');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.json());

app.use(router);

app.use('/static', express.static('./views'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/logDataSearch', (req, res) => {
    res.sendFile(__dirname + '/views/generic.html');
});

app.listen(port, err => {
    if(err) console.log(err)
    else console.log('서버가 가동되었습니다.!!!!!')
});

// app.set('port', process.env.PORT || 3000);
// app.listen(app.get('port'), () => {
//     console.log('Express server listening on port ' + app.get('port'));
//   });
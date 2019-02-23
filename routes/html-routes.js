//Path package
const path = require('path');

//Routing for HTML GET requests
module.exports = function(app) {

   app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/index.html'));
    });
};
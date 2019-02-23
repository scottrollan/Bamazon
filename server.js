const express = require('express');
const path = require('path')

const app = express();

const PORT = process.env.PORT || 3000;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));



// need api routing for interacting withe back-end
require('./routes/api-Routes.js')(app);
require('./routes/html-Routes.js')(app);


db.sequelize.sync().then(function(){
    app.listen(PORT, function () {
        console.log("Listening on port " + PORT);
    })
});

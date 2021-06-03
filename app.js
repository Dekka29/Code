const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
//app.use(fileUpload());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//const urlencodedParser = bodyParser.urlencoded({ extended: false });

db.sequelize.sync();

require("./user.routes")(app);

app.listen(3000, () => {
  console.log("Server iniciado...");
});

//app.get("/", urlencodedParser, (req, res) => {
/* let url = req.url;
    url = url.substring(url.indexOf('?') + 1);

    const params = url.split('&');
    let text = '';
    
    params.forEach(param => {
        let object = param.split('=');
        text += object[0] + ' : ' + object[1] + '<br/>'; 
    }); */
//  res.send(`<h1>Tus datos son: <br/>
//    Nombre: ${req.query.nombre} <br/>
//    Apellido: ${req.query.apellido} </h1>`);
//  console.log(req.query);
//});

const db = require("./models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const name = req.query.nombre;
  var condition = name ? { nombre: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      if (condition != null) {
        res.send(`<h1>Se encontraron los siguientes datos: <br/>
        Id Usuario: ${data[0].id} <br/> 
        Nombre: ${data[0].nombre} <br/>
        Apellido: ${data[0].apellido} </h1>`);
      } else {
        /*let texto = "<h1>Se encontraron los siguientes datos: <br/>";
        data.forEach((element) =>
          texto.concat(`Id Usuario: ${element.id} <br/> 
          Nombre: ${element.nombre} <br/>
          Apellido: ${element.apellido} <br/><br/>`)
        );
        texto.concat("</h1>");
        console.log(texto);
        res.send(texto);*/
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Algo sucedio mientras se obtenia informacion de los usuarios.",
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Content nombre can not be empty!",
    });
    return;
  }

  const user = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
  };

  // Save UserStory in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Algo sucedio mientras se registraba el usuario.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error obteniendo informacion del usuario con id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuario actualizado correctamente.",
        });
      } else {
        res.send({
          message: `No se pudo actualizar el usuario con id=${id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error actualizando el usuario con id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuario eliminado correctamente!",
        });
      } else {
        res.send({
          message: `No se pudo eliminar el usuario con id=${id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se pudo eliminar el usuario con id=" + id,
      });
    });
};

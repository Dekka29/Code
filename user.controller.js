const db = require("./models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const name = req.query.nombre;
  var condition = name ? { nombre: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Algo sucedio mientras se obtenia informacion de los usuarios.",
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

module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("usuario", {
    nombre: {
      type: Sequelize.STRING,
    },
    apellido: {
      type: Sequelize.STRING,
    },
  });

  return user;
};

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost/sequel",
  {
    logging: false,
    dialect: "postgres",
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);


const initialize = async () =>{
  try {
    await sequelize.sync()
    console.log("Connection with postgres successfully !")
  } catch (error) {
    console.log("Error connecting to postgres with Sequelize ! ",error)
  }

}

module.exports = { sequelize, initialize };

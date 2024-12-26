const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost/sequel",
  {
    logging: false,
    dialect: "postgres",
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

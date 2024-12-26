const { sequelize } = require("../config");


const transactions = async (operations) => {
    const t = await sequelize.transaction();
  try {
   const result =await operations(t);
    await t.commit();
    return result;
  } catch (error) {
    if(t) await t.rollback();
    console.log(error,"error");
    throw error;
  }
};

module.exports = {
    transactions
}
const sequelize = require("../config/db");
const User = require("./user");

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // Creates/Updates tables automatically
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDB();

module.exports = { User };

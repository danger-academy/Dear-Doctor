// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/config.js");

// Creates a "Diary" model that matches up with DB
var Diary = sequelize.define("diary", {
  symptom: {
    type: Sequelize.JSON,
    severity: Sequelize.JSON
  },
  food: {
    type: Sequelize.JSON
  },
  drink: {
    type: Sequelize.JSON
  }
}, {
  freezeTableName: true
});

Diary.associate = models => {
  Diary.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    }
  });
};

// Syncs with DB
Diary.sync();

// Makes the Diary Model available for other files (will also create a table)
module.exports = Diary;
// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as 
//the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
//
// Creating our User model
//Set it as export because we will need it required on the server
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  User.associate = models => {
        User.hasMany(models.Diary, {
           onDelete: "cascade"
         });
      };
  // Creating a custom method for our User model. 
  //This will check if an unhashed password entered by the 
  //user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};


// module.exports = function(sequelize, DataTypes) {
//   const User = sequelize.define("User", {
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: { isEmail: true },
//       unique: true
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastLogin: DataTypes.DATE,
//     status: {
//       type: DataTypes.ENUM("active", "inactive"),
//       defaultValue: "active"
//     }
//   });

//   User.associate = models => {
//     User.hasMany(models.Diary, {
//       onDelete: "cascade"
//     });
//   };

//   return User;
// };
// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const Diary = require("../models");
var db = require("../models2");
var passport = require("../config/passport");
// Routes
// =============================================================
module.exports = function (app) {

    // Get all diarys
    app.get("/api/diary", function (req, res) {

        Diary.findAll({}).then(function (results) {
            res.json(results);
        });

    });

    // Get a specific diary
    app.get("/api/diary", function (req, res) {

        if (req.params.diary) {
            Diary.findAll({
                where: {
                    symptom: req.params.diary
                }
            }).then(function (results) {
                res.json(results);
            });
        }

    });

    // Get all diarys of a specific drink
    app.get("/api/drink", function (req, res) {

        if (req.params.drink) {
            Diary.findAll({
                where: {
                    drink: req.params.drink
                }
            }).then(function (results) {
                res.json(results);
            });
        }

    });

    // Get all diarys from a specific food
    app.get("/api/food", function (req, res) {

        if (req.params.food) {
            Diary.findAll({
                where: {
                    food: req.params.food
                }
            }).then(function (results) {
                res.json(results);
            });
        }

    });
    // ===== below section not currently needed =====
    //   // Get all "long" diarys (diarys 300 pages or more)
    //   app.get("/api/diarys/long", function(req, res) {

    //     Diary.findAll({
    //       where: {
    //         pages: {
    //           $gte: 300
    //         }
    //       },
    //       order: "pages DESC"
    //     }).then(function(results) {
    //       res.json(results);
    //     });

    //   });

    //   // Get all "short" diarys (diarys 150 pages or less)
    //   app.get("/api/diarys/short", function(req, res) {

    //     Diary.findAll({
    //       where: {
    //         pages: {
    //           $lte: 150
    //         }
    //       },
    //       order: "pages ASC"
    //     }).then(function(results) {
    //       res.json(results);
    //     });

    //   });

    // Add a diary symptom
    app.post("/api/symptom", function (req, res) {

        console.log("Diary Symptom:");
        console.log(req.body);
        let data = {symptom: req.body.symptom,
                    severity: req.body.severity};
    Diary.create(data).then(function (results) {
      res.json(results);
        //Diary.symptom.create({
        //    symptom: req.body.symptom.type,
        //    severity: req.body.symptom.severity
            //pages: req.body.pages
        });
    });

    // Add a diary food
    app.post("/api/food", function (req, res) {

        console.log("Diary Food:");
        console.log(req.body);
        let data = {food: req.body.food};
    Diary.create(data).then(function (results) {
      res.json(results);
        //Diary.food.create({
        //    food: req.body.food.type
        });
    });

    // Add a diary drink
    app.post("/api/drink", function (req, res) {

        console.log("Diary Drink:");
        console.log(req.body);
        let data = {drink: req.body.drink};
    Diary.create(data).then(function (results) {
      res.json(results);
        // Diary.drink.create({
        //     drink: req.body.drink.type
        });
    });

    // Delete a diary
    //===== not currently needed =====
    app.post("/api/delete", function (req, res) {

        console.log("Diary Data:");
        console.log(req.body);
        Diary.destroy({
            where: {
                id: req.body.id
            }
        });

    });

    // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
//
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
//
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
//
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};


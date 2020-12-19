const express = require("express");
const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
// const expressLayouts = require("express-ejs-layouts");

const User = require("./modals/User");

const authenticateUser = require("./middlewares/authenticateUser");

const app = express();
const port = process.env.PORT || 3000;

// mongodb+srv://MohammadArslan:AR!@#123@gaana-db.pylw7.mongodb.net/Gaana-db?retryWrites=true&w=majority

// mongdb cloud connection is here
mongoose
  .connect("mongodb://localhost:27017/Gaana-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to mongodb cloud! :)");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(express.urlencoded({ extened: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// cookie session
app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);


// static Files
app.use(express.static("public"));
app.use('/CSS', express.static(__dirname + 'public/CSS'));
app.use('/javascript', express.static(__dirname + 'public/javascript'));
app.use('/Media', express.static(__dirname + 'public/Media'));
// app.use(bodyParser.urlencoded({extended: true}));

// Set Templating Engine
app.set('views', './views');
app.set("view engine" , "ejs");

// Navigation
app.get('', (req, res) => {
  res.render('index');
});

app.get('/browser', (req, res) => {
  res.render('browser');
});

app.get('/discover', (req, res) => {
  res.render('discover');
});

app.get('/radio', (req, res) => {
  res.render('radio');
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

// route for handling post requirests
app
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExits = await User.findOne({ email });

    if (!doesUserExits) {
      res.send("invalid username or password");
      return;
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch) {
      res.send("invalid useranme or password");
      return;
    }

    // else he\s logged in
    req.session.user = {
      email,
    };

    res.redirect("/");
  })
  .post("/register", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExitsAlreay = await User.findOne({ email });

    if (doesUserExitsAlreay) {
      res.send("A user with that email already exits please try another one!");
      return;
    }

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 8);
    const latestUser = new User({ email, password: hashedPassword });

    latestUser
      .save()
      .then(() => {
        res.send("registered account!");
        return;
      })
      .catch((err) => console.log(err));
  });

//logout
app.get("/logout", authenticateUser, (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});

app.listen(port, () => {
  console.log("Server running at " + port);
});


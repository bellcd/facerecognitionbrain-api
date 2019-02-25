const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = require('knex')({
  client: 'pg',
  connection: {
    host : 'postgresql-flat-83737',
    user : 'postgres',
    password : 'test',
    database : 'facerecognitionbrain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// belive this is from older harcoded test database ??
app.get("/", (req, res) => res.send("it is working"));

app.post('/signin', signIn.handleSignIn(db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));
app.put("/image", (req, res) => image.handleImage(req, res, db));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


console.log(PORT)

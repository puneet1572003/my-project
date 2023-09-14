const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer")

const secretkey = "secretkey";
const port = 3000;
const mysql2 = require("./connection").data
var cors = require('cors')
var bodyParser = require('body-parser');
const {
  error
} = require("jquery");
const nodemailer = require("nodemailer");
app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());
var jsonParser = bodyParser.json()



//Registration-Form/Function and API work


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('destination', file)
    let uploadpath = "assets";
    if (file.fieldname == 'image_pc') {
      uploadpath = "assets/images"
    }
    cb(null, uploadpath);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

let upload = multer({
  storage: storage
});

app.post("/registration", jsonParser, upload.single('image_pc'), (req, res, next) => {
  const file = req.file
  console.log(file.filename)
  console.log(req.body);
  const {
    user_name,
    phone_no,
    email,
    password
  } = req.body;
  
  let image_pc = file ? file.filename : '';

  let qry = "INSERT INTO registration_login(image_pc,user_name,phone_no,email,password) values(?,?,?,?,?)";
  const values = [image_pc, user_name, phone_no, email, password]
  mysql2.query(qry, [image_pc, user_name, phone_no, email, password], (_err, results) => {

    console.log("err", _err);
    if (results.affectedRows > 0) {
      console.log("hello");
      res.setHeader('Content-Type', 'application/json');
      res.json({
        status: 200
      })
    }
  })
});



//Login Page API work

app.post("/login", jsonParser, (req, res) => {
  console.error(req.body);
  const {
    email,
    password
  } = req.body;

  let qry = "SELECT * FROM registration_login WHERE email = ? AND password = ?";
  mysql2.query(qry, [email, password], (_err, results) => {
    if (_err) {
      console.error(_err);
      return res.status(500).json({
        error: "Internal server error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.status(200).json(results[0]);
  });
});




app.listen(port, (err) => {
  if (err)
    res.json({
      error: err
    });
  else
    console.log("server is running at port %d:", port);

});
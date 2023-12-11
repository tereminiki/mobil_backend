const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

var connection
function kapcsolat()
{
   connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'japan_autok_motorok'
  })
  
  connection.connect()
  
}




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/motorok', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM motorok', (err, rows, fields) => {
    if (err) {
      console.error('Hiba a lekérdezés során: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(rows);
    res.send(rows);
  });
});



app.get('/marka_motorok', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM marka_motorok', (err, rows, fields) => {
    if (err) {
      console.error('Hiba a lekérdezés során: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(rows);
    res.send(rows);
  });
});



//INSERT INTO film VALUES (NULL,'alma',2023,1.jpg);

app.post('/felvitel', (req, res) => {
  kapcsolat()
  
  connection.query(`INSERT INTO kepek_motor VALUES (NULL,'1.jpg')`, (err, rows, fields) => {
  if (err){
    console.log("Hiba")
    res.send("Hiba")
  }
  else{
    console.log("Sikeres felvitel")
    res.send("Sikeres felvitel")
  }
  
  
  
  
  })
  connection.end() 
  })
  




//képfeltöltés
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });


app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  //asatb-be való felvitel
  kapcsolat()
  
  connection.query(`INSERT INTO kepek_motor VALUES (NULL,'${req.files[0].filename}',1)`, (err, rows, fields) => {
  if (err){
    console.log("Hiba")
    res.send("Hiba")
  }
  else{
    console.log("Sikeres felvitel")
    res.send("Sikeres felvitel")
  }
  
  
  
  
  })
  connection.end() 





  //
  
});







//vége






app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen`);
});

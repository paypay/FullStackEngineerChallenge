const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const initSqlJs = require('sql.js');
const filebuffer = fs.readFileSync('mockEmployee.sqlite');

let db = {};
initSqlJs().then(function (SQL) {
  // Load the db
  db = new SQL.Database(filebuffer);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('@@@@@ prot listen on 5000'));

app.get('/staffs', (req, res) => {
  const result = db.exec(`SELECT * FROM tbl_all_staff;`)
  const staffs = result[0].values;
  let output = [];
  staffs.forEach(staff => {
    output.push({
      id: staff[0],
      name: staff[1],
      email: staff[2],
      team: staff[4],
      type: staff[5]
    });
  });
  res.send(output);
});

app.get('/staff', (req, res) => {
  const name = req.query.name;
  const result = db.exec(`
    SELECT * FROM tbl_all_staff
    WHERE name = '${name}';
  `)
  const staff = result[0].values;
  const output = {
    id: staff[0][0],
    name: staff[0][1],
    email: staff[0][2],
    team: staff[0][4],
    type: staff[0][5]
  }
  res.send(output);
});

app.get('/review', (req, res) => {
  const name = req.query.name;
  const result = db.exec(`
    SELECT * FROM tbl_all_reviews
    WHERE name = '${name}';
  `);
  const review = result[0].values;
  const output = {
    id: review[0][0],
    name: review[0][1],
    reviews: JSON.parse(review[0][2]),
    reviewers: JSON.parse(review[0][3]),
    toReview: JSON.parse(review[0][4])
  };
  console.log(output);
  res.send(output);
})

app.put('/review', async (req, res) => {
  const name = req.body.params.name;
  const reviews = req.body.data.reviews;
  console.log(JSON.stringify(reviews));
  let sqlString = `
    UPDATE tbl_all_reviews
    SET reviews = '${JSON.stringify(reviews)}'
    WHERE name = '${name}'
  ;`;
  await db.run(sqlString);
  res.send(db.exec(`SELECT * FROM tbl_all_reviews WHERE name = '${name}';`));
  // res.send(req);
})

// app.get()
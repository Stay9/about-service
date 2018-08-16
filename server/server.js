require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/queries.js');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/about/hosts/:id', (req, res) => {
  db.selectHostInfo(req.params.id, (result) => {
    res.send(JSON.stringify(result));
  });
});

app.get('/api/about/reviews/:listingId', (req, res) => {
  db.reviewsForHost(req.params.listingId, (result) => {
    res.send(JSON.stringify(result));
  });
});

app.get('/api/about/neighborhood/:listingId', (req, res) => {
  db.neighborhoodInfo(req.params.listingId, (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/api/about/listings/:listId', (req, res) => {
  const id = req.params.listId;
  db.selectListingInfo(id, (result) => {
    res.send(JSON.stringify(result));
  });
});

app.put('/api/about/hosts/:userId/:rating', (req, res) => {
  const newRating = req.body.rating;
  const id = req.params.userId;
  db.updateAvgReview(id, newRating, (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.sendStatus(201);
    }
  });
});

app.delete('/api/about/hosts/:userId', (req, res) => {
  const id = req.params.userId;
  db.deleteUser(id, (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.sendStatus(201);
    }
  });
});

app.post('/api/about/hosts/', (req, res) => {
  const first = String(req.body.first_name);
  const last = String(req.body.last_name);
  const city = String(req.body.city);
  const state = String(req.body.state);
  const country = String(req.body.country);
  const joined_in_date = req.body.joined_in_date;
  const desc = String(req.body.description);
  const email = String(req.body.email);
  const photoUrl = String(req.body.photo_url);

  db.postHost(first, last, city, state, country, joined_in_date, desc, email, photoUrl, (err) => {
    if (err) {
      res.send(401);
    } else {
      res.send(201);
    }
  });
});

app.listen(3001, () => {
  console.log('Server started on 3001');
});

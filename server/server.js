// Note: new relic filepath meant for deployment now.
require('newrelic');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');
const db = require('../db/queries.js');

const port = process.env.PORT || 3001;

const client = redis.createClient();
client.on('error', (err) => {
  console.log("error", err);
});

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // fork workers
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Make works share a TCP connection
  // initialize with express
  const app = express();
  console.log(`Worker ${process.pid} started`);


  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public'), { maxAge: 3000 }));

  app.get('/api/about/hosts/:id', (req, res) => {
    const request = req.params.id;
    client.get(request, (err, redires) => {
      if (redires) {
        const reply = JSON.stringify(redires);
        res.send(reply);
      } else {
        db.selectHostInfo(req.params.id, (result) => {
          const key = JSON.stringify(req.params.id);
          const val = JSON.stringify(result);
          client.setex(key, 60, val);
          res.send(JSON.stringify(result));
        });
      }
    });
  });

  app.get('/api/about/reviews/:listingId', (req, res) => {
    const request = req.params.id;
    client.get(request, (err, redires) => {
      if (redires) {
        const reply = JSON.stringify(redires);
        res.send(reply);
      } else {
        db.reviewsForHost(req.params.listingId, (result) => {
          const key = JSON.stringify(req.params.id);
          const val = JSON.stringify(result);
          client.setex(key, 60, val);
          res.send(JSON.stringify(result));
        });
      }
    });
  });

  app.get('/api/about/neighborhood/:listingId', (req, res) => {
    const request = req.params.id;
    client.get(request, (err, redires) => {
      if (redires) {
        const reply = JSON.stringify(redires);
        res.send(reply);
      } else {
        db.neighborhoodInfo(req.params.listingId, (err, result) => {
          const key = JSON.stringify(req.params.id);
          const val = JSON.stringify(result);
          client.setex(key, 60, val);
          res.send(JSON.stringify(result));
        });
      }
    });
  });

  app.get('/api/about/listings/:listId', (req, res) => {
    const id = req.params.listId;
    client.get(id, (err, redires) => {
      if (redires) {
        const reply = JSON.stringify(redires);
        res.send(reply);
      } else {
        db.selectListingInfo(id, (result) => {
          res.send(JSON.stringify(result));
        });
      }
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

  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
}

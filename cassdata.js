'use strict'

const faker = require('faker');
const axios = require('axios');
const fs = require('fs');
const Path = require('path');


const things = ['run', 'skip', 'play', 'swim in the deep blue sea', 'walk a dog?'];
const listingNames = ['place', 'fun', 'dogs love our', 'chew toy', 'heaven', 'pups', 'playground', 'animal'];
const trial1 = ['a', 'b', 'c'];
let trialOutput = [];
const features = ['market', 'hiking', 'shopping mall', 'castro', 'snowboarding', 'dog park', 'historic'];

const imgUrlGenerator = function(){
  /* 
  Generates an S3 URL for the database.
  */
  let url = 'https://s3-us-west-2.amazonaws.com/burkeimages/';
  // generate a random number from 1-1000.
  const imgNum = Math.ceil(Math.random()*1000);
  // add number.jpg to the end of url
  url += imgNum.toString() + '.jpg';
  // return the url.
  return url;
}

async function downloadImage (num) {
  /*
Function to download 1000 dog images.
To run, uncomment out the for-loop below.
*/
  const url = 'https://loremflickr.com/240/240/dog';
  const path = Path.resolve(__dirname, 'img', num.toString() + '.jpg');

  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  })
  response.data.pipe(fs.createWriteStream(path));
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    })
    response.data.on('error', () => {
      reject();
    })
  })
}
/*
Uncomment out the for loop to download images.
for (let i = 0; i < 1000; i++) {
  setTimeout(function() {
    downloadImage(i);
  }, i + 1)
};
*/
const boolChooser = function(){
  if (Math.random() > 0.6){
    return true;
  }
  return false;
}

const langChooser = () => {
  const langs = ['French', 'English', 'Spanish', 'Aymara'];
  const num = Math.floor(Math.random() * 4);
  return langs[num];
};

const makeHostData = (start, end, pathToFile) => {
  var stream = fs.createWriteStream(pathToFile);
  let count = start;
  let dataToWrite = [];
  let endWrite = 10000;
  let str1 = '"id", "city",  "country", "email", "first_name", "join_in_date", "languages", "last_name", "photo_url", "references_count", "response_rate", "response_time", "state",  "verified"';
  dataToWrite.push(str1);
  stream.once('open', (fd) => {
    while (count <= end) {
      let str = '';
      const idNum = count.toString();
      const date = faker.date.recent(30).toString();
      str += idNum + ',' + '"' + faker.address.city() + '"' + ',' + '"' + faker.address.country() + '"' + ',' + '"' + faker.internet.email() + '"' + ',' + '"' + faker.name.firstName() + idNum + '"' + ','
      + '"' + date.slice(0, 15) + '"' + ',' + '"' + langChooser() + '"' + ',' 
      + '"' + faker.name.lastName() + '"' + ',' + '"' + imgUrlGenerator() + '"' + ','
      + Math.ceil(Math.random() * 10) + ',' + Math.ceil(Math.random() * 10) + ','
      + Math.ceil(Math.random() * 100) + ',' + '"' + faker.address.state() + '"' + ','
      + '"' + boolChooser().toString() + '"';
      
      dataToWrite.push(str);
      if (count % endWrite === 0) {
        console.log('host count: ', count);
        for (let idx = 0; idx < dataToWrite.length; idx++) {
          stream.write(dataToWrite[idx]);
          if (idx < end) {
            stream.write('\n');
          }
        }
        dataToWrite = [];
      }
      count += 1;
    }
    stream.end();
  });
};
// makeHostData(1, 4000000, '/Users/henrygreen/Documents/datastorage/casshost1.csv');
// makeHostData(4000001, 7000000, '/Users/henrygreen/Documents/datastorage/casshost2.csv');
// makeHostData(7000001, 10000000, '/Users/henrygreen/Documents/datastorage/casshost3.csv');
// --- makeHostData(8000001, 10000000, '/Users/henrygreen/Documents/datastorage/casshost4.csv');

const thingsToDoChooser = function(){
  return things[Math.floor(Math.random()*5)];
}
const makeListingData = (start, end, pathToFile) => {
  // Data generation plan:
  var stream = fs.createWriteStream(pathToFile);
  let count = start;
  let dataToWrite = [];
  let endWrite = 10000;
  let str1 = '"id", "description", "host_id", "lat_location", "listing_name", "lon_location", "photo_url", "rating", "things_to_do"';
  dataToWrite.push(str1);
  stream.once('open', (fd) => {

    while (count <= end) {
      let entry = {};
      let str = '';
      let arrEntry = [];
      let aNum = Math.floor(Math.random() * 6).toString();
      str += count + ','+ '"' + faker.lorem.sentences() + '"' + ',' + Math.ceil(Math.random() * 10000000) + ','
        + faker.address.latitude() + ','
         +'"' + 'Listing ' + count.toString() + '"' + ',' + faker.address.longitude() + ','
         + '"' + imgUrlGenerator() + '"' + ',' + aNum + ','
         + '"' + thingsToDoChooser() + '"';


      // str += count + ',' + '"' +'Listing ' + count.toString() + '"' + ','
      // + faker.address.latitude() + ',' + faker.address.longitude() + ','
      // + '"' + faker.lorem.sentences() + '"' + ',' + '"' + imgUrlGenerator() + '"' + ',' + aNum + ','
      // + Math.ceil(Math.random() * 10000000) + ',' + '"' + thingsToDoChooser() + '"';


      dataToWrite.push(str);

      if (count % endWrite === 0) {
        for (let idx = 0; idx < dataToWrite.length; idx+=1) {
          stream.write(dataToWrite[idx] + '\n');
        }
        dataToWrite = [];
      }
      count += 1;
    }
    stream.end();
  });
};
// makeListingData(1, 4000000, '/Users/henrygreen/Documents/datastorage/casslisting1.csv');
// makeListingData(4000001, 8000000, '/Users/henrygreen/Documents/datastorage/casslisting2.csv');
// makeListingData(8000001, 10000000, '/Users/henrygreen/Documents/datastorage/casslisting3.csv');
// ----makeListingData(8000001, 10000000, '/Users/henrygreen/Documents/datastorage/listing4.csv');

const makeReviewData = (start, end, pathToFile) => {
  // Data generation plan:
  const stream = fs.createWriteStream(pathToFile);
  let count = start;
  let dataToWrite = [];
  const endWrite = 50000;
  const str1 = '"id", "list_id", "numReviews", "rating"';
  dataToWrite.push(str1);
  stream.once('open', (fd) => {
    while (count <= end) {
      let str = '';
      str += count.toString() + ',' +  Math.ceil(Math.random() * 10000000) + ',' + Math.ceil(Math.random() * 10)
      + ',' + Math.floor(Math.random() * 5);
      dataToWrite.push(str);

      if (count % endWrite === 0) {
        for (let idx = 0; idx < dataToWrite.length; idx+=1) {
          stream.write(dataToWrite[idx] + '\n');
        }
        dataToWrite = [];
      }
      count += 1;
    }
    stream.end();
  });
};
// makeReviewData(1, 4000000, '/Users/henrygreen/Documents/datastorage/cassreview1.csv');
// makeReviewData(4000001, 8000000, '/Users/henrygreen/Documents/datastorage/cassreview2.csv');
// makeReviewData(8000001, 10000000, '/Users/henrygreen/Documents/datastorage/cassreview3.csv');
// --makeReviewData(8000001, 10000000, '/Users/henrygreen/Documents/datastorage/cassreview4.csv');

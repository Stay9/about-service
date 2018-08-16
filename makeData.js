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
  let str1 = '"id", "first_name", "last_name", "join_in_date", "email", "verified", "response_rate", "response_time", "languages"';
  dataToWrite.push(str1);
  stream.once('open', (fd) => {
    while (count <= end) {
      let str = '';
      const idNum = count.toString();
      const date = faker.date.recent(30).toString();
      str += '"' + idNum +'"'+ ',' +'"' + faker.name.firstName() + idNum + '"' + ',' + '"' +
      faker.name.lastName() + '"' + ',' + '"' +
      date.slice(0, 15) + '"' + ',' + '"' + faker.internet.email() + '"' + ',' +
      '"' + boolChooser().toString() + '"' + ',' + '"' + Math.ceil(Math.random() * 10) + '"' + ',' +
      '"' + Math.ceil(Math.random() * 10).toString() + '"' + ',' + '"' + langChooser() + '"';
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
    
    count++;
    }
    stream.end();})
}
  // makeHostData(0, 3000000, '/Users/henrygreen/Documents/datastorage/host1.csv');
  // makeHostData(3000001, 6000000, '/Users/henrygreen/Documents/datastorage/host2.csv');
  // makeHostData(6000001, 8000000, '/Users/henrygreen/Documents/datastorage/host3.csv');
  // makeHostData(8000001, 10000000, '/Users/henrygreen/Documents/datastorage/host4.csv');

const thingsToDoChooser = function(){
  return things[Math.floor(Math.random()*5)];
}
const makeListingData = (start, end, pathToFile) => {
  // Data generation plan:
  var stream = fs.createWriteStream(pathToFile);
  let count = start;
  let dataToWrite = [];
  let endWrite = 10000;
  let str1 = '"id", "listing_name", "lat_location", "lon_location", "city", "state", "country", "description", "photo_url", "rating", "host_id", "things_to_do"';
  dataToWrite.push(str1);
  stream.once('open', (fd) => {

    while (count <= end) {
      let entry = {};
      let str = '';
      let arrEntry = [];
      let aNum = Math.floor(Math.random() * 6).toString();
      str += '"' + count.toString() + ' " ' + ',' + '"' +'Listing ' + count.toString() + '"' + ','
        + '"'+faker.address.latitude() + '"' + ',' + '"' + faker.address.longitude() + '"' + ',' +
        '"' + faker.address.city() + '"' + ',' + '"' + faker.address.state() + '"' + ',' +
        '"'+faker.address.country() + '"' + ',' +
        '"'+faker.lorem.sentences() + '"' + ',' + 
        '"'+imgUrlGenerator() + '"' + ',' + '"' + aNum + '"' + ',' + 
        '"'+Math.ceil(Math.random()*10000000) + '"' + ',' + '"' + thingsToDoChooser() + '"';
      dataToWrite.push(str);

      if (count % endWrite === 0) {
        console.log('listing count: ', count);
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
// makeListingData(1, 3000000, '/Users/henrygreen/Documents/datastorage/listing1.csv');
// makeListingData(3000001, 6000000, '/Users/henrygreen/Documents/datastorage/listing2.csv');
// makeListingData(6000001, 8000000, '/Users/henrygreen/Documents/datastorage/listing3.csv');
// makeListingData(8000001, 10000000, '/Users/henrygreen/Documents/datastorage/listing4.csv');

const makeReviewData = (start, end, pathToFile) => {
  // Data generation plan:
  const stream = fs.createWriteStream(pathToFile);
  let count = start;
  let dataToWrite = [];
  const endWrite = 50000;
  const str1 = '"id", "user_id", "list_id", "rating"';
  dataToWrite.push(str1);
  stream.once('open', (fd) => {
    while (count <= end) {
      let str = '';
      str += '"' + count.toString() + '"' + ',' + '"' + Math.ceil(Math.random() * 10000000) + '"' + ',' +
      '"' + Math.ceil(Math.random()*10000000) + '"' + ',' + '"' + Math.floor(Math.random() * 5) + '"';
      dataToWrite.push(str);

      if (count % endWrite === 0) {
        console.log('review count: ', count);
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
// makeReviewData(1, 3000000, '/Users/henrygreen/Documents/datastorage/review1.csv');
// makeReviewData(3000001, 6000000, '/Users/henrygreen/Documents/datastorage/review2.csv');
// makeReviewData(6000001, 8000000, '/Users/henrygreen/Documents/datastorage/review3.csv');
// makeReviewData(8000001, 10000000, '/Users/henrygreen/Documents/datastorage/review4.csv');

const callQuery = require('./connection.js').callQuery;

const makeQuery = (searchBy, params, callback) => {
  callQuery(searchBy, params, (res) => {
    callback(res);
  });
};

const selectHostInfo = (id, callback) => {
  const query = 'select verified, languages, join_in_date from hosts where id =?';
  const params = [id];
  makeQuery(query, params, callback);
};

const selectListingInfo = (id, callback) => {
  const query = 'select lat_location, lon_location, city, state, photo_url, description from listings where id = ?';
  const params = [id];
  makeQuery(query, params, callback);
};

const reviewsForHost = (id, callback) => {
  const query = 'select numreviews, rating from reviews where id = ?';
  const params = [id];
  makeQuery(query, params, callback);
};

const neighborhoodInfo = (id, callback) => {
  const query = 'select * from listings where id = ?';
  const params = [id];
  makeQuery(query, params, callback);
};

const postHost = (id, params, callback) => {
  // Note: the params will be in order:
  // id, city, country, first_name, joined_in_date, languages,
  // last_name, photo_url, response_rate, response_time, state, verified

  const query = 'insert into hosts (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  makeQuery(query, params, callback);
};

const updateAvgReview = (id, params, callback) => {
  const query = 'update reviews set rating = ? where id = ?';
  makeQuery(query, params, callback);
};

module.exports = {
  selectHostInfo, selectListingInfo, reviewsForHost, neighborhoodInfo, postHost, updateAvgReview,
};

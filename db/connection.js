const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['localhost'], keyspace: 'rental_hosts' });


const callQuery = (query, params, callback) => {
  client.execute(query, params, { prepare : true }, (err, result) => {
    if (err) {
      console.log('there was an error?', err);
    }
    callback(result);
  });
};

module.exports = {
  callQuery,
};

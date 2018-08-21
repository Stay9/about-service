const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['localhost'], keyspace: 'rental_hosts' });

client.execute('select * from listings where id = 3333333', (err, result) => {
  if (err) throw err;
  console.log(result.rows[0]);
});

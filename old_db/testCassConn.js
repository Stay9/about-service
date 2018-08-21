const callQuery = require('./connection.js').callQuery;

const que = 'select * from listings where id =?';
const param = [1];
callQuery(que, param, (err, res) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('no err', res);
  }
});

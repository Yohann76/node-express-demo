var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node-express-demo'
});
 
connection.connect();

module.exports = connection
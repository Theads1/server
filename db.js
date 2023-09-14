const Pool= require("pg").Pool
const pool= new Pool(
  {user:"sundalandadmin",
  password:"testing",
  host:"localhost",
  port:5432,
  database:"sunlogin",}
    );

module.exports = pool;
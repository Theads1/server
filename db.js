const Pool= require("pg").Pool
const pool= new Pool(
  {user:PROCESS.ENV.DATABASE_user,
  password:PROCESS.ENV.DATABASE_password,
  host:PROCESS.ENV.DATABASE_URL,
  port:5432,
  database:"capstone_z1iz",
  ssl : {
    rejectUnauthorized: false
  }
}
    );

module.exports = pool;

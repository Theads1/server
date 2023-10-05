const Pool= require("pg").Pool
const pool= new Pool(
  {user:process.env.DATABASE_user,
  password:process.env.DATABASE_password,
  host:process.env.DATABASE_URL,
  port:5432,
  database:"capstone_z1iz",
  ssl : {
    rejectUnauthorized: false
  }
}
    );

module.exports = pool;

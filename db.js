const Pool= require("pg").Pool
const pool= new Pool(
  {user:"capstone_z1iz_user",
  password:"pXwm5Vl1mScCZHiQzPDNuLNeRBAYzdaD",
  host:"dpg-ckb2qm9kms5s73b5rcog-a.ohio-postgres.render.com",
  port:5432,
  database:"capstone_z1iz",
  ssl : {
    rejectUnauthorized: false
  }
}
    );

module.exports = pool;

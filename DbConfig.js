

const sql = require("mssql/msnodesqlv8");

var SqlConfig = {
  server: "DESKTOP-Q5ED3JH",
  database: "NodejsDb",
   driver: "msnodesqlv8",
 
  options: {
   trustServerCertificate: true, // change to true for local dev / self-signed certs
   trustedConnection: true,
    Encrypt:false

  },
  port: 1433
 }


module.exports = SqlConfig;





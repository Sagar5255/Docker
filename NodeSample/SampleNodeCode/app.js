 const express  = require('express')();
 const mysql = require('mysql');
 
 const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
 
 // environment variables 
 const HOST = process.env.HOST || '0.0.0.0';
 
 // mysql credentials
 const connection = mysql.createConnection({
     host: process.env.MYSQL_HOST || '172.17.0.2',
     user: process.env.MYSQL_USER || 'root',
     password: process.env.MYSQL_PASSWORD || 'password',
     database: process.env.MYSQL_DATABASE || 'test'
 });
 
 connection.connect((err) => {
     if (err) {
         console.error('error connecting mysql: ', err);
     } else {
         console.log('mysql connection successful');
         app.listen(PORT, HOST, (err) => {
             if (err) {
                 console.error('Error starting  server', err);
             } else {
                 console.log('server listening at port ' + PORT);
             }
         });
     }
 });
 
 // home page
 app.get('/', (req, res) => {
     res.json({
         success: true,
         message: 'Hello world'
     });
 });
 
// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
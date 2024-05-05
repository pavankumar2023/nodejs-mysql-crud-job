# CRUD with Node.js
This project contains basic structure for node.js and it was implementing with libraries for best practices of develop. 

## Libraries 🛠️
* [npm](https://www.npmjs.com/) - Management of packages and  tools. 
* [node.js](https://nodejs.org/en/) - Runtime environment.
* [express](https://expressjs.com/en/) - Infrastructure of development for web.
* [express-session](https://www.npmjs.com/package/express-session) - Create session for share with middlewares and save data in stored server-side.
* [express-handlebars](https://www.npmjs.com/package/express-handlebars) - Template engines of views.
* [mysql](https://www.npmjs.com/package/mysql/) - Driver for mysql.
* [express-mysql-session](https://www.npmjs.com/package/express-mysql-session/) - Create a database table to save session data.        
* [express-validator](https://express-validator.github.io/) - Validate and sanitize data for express.js.    
* [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware.    
* [nodemon](https://www.npmjs.com/package/nodemon/) - Tool that helps develop applications by automatically restarting the node.js applications.    
* [passport](https://www.npmjs.com/package/passport) - Authentication middleware for node.js.
* [passport-local](https://www.npmjs.com/package/passport-local) - Lets you authenticate using a username and password in your node.js applications.  
* [connect-flash](https://www.npmjs.com/package/connect-flash) - Used for storing message, message are written to the flash and cleared after being displayed.  
* [timeago.js](https://www.npmjs.com/package/timeago/) - Plugin that make it easy to support automatically updating fuzzy timestamps.  
  

## Installation 📥
Before [installing, download and install Node.js](https://nodejs.org/en/download/) Node.js 0.10 or higher is required.

Install modules and libraries required
```
$ npm install
```

To execute this project you need [mysql](https://www.mysql.com/).

You can install service of mysql directly in your machine or install a local server for example.
  
* [xampp](https://www.apachefriends.org/download.html)  
* [wampserver](http://www.wampserver.com/en/#download-wrapper)

### Database 💾
Once executed mysql service you need `create database named 'crud_books'` and import `.sql file` located in folder `db-dump/crud_books.sql`. 

To run this project execute 
```
$ npm run dev
```




  


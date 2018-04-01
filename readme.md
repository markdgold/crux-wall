sbpdojo.herokuapp.com

## Overview
A database of climbs created in the Crux Climbing Center's spray wall. Users can create accounts and new content using the imgur API. Users can filter climbs by difficulty, style, and by who created them. Once users have uploaded a climb they have the option to edit or delete their climbs. Users can log climbs they've done, favorite ones they want to do, and leave comments.

## Technologies Used
- Html5
- Css3
- JavaScript
- jQuery
- Bootstrap
- Imgur API
- Node.js
- Express
- PostgreSQL
***

## To Run locally
- npm install
- generate .env file with:  
	SESSION_SECRET  
	IMGUR_CLIENT_ID  
	IMGUR_SECRET  
	BASE_URL=https://api.imgur.com/3/  
- sequelize db:migrate
- Run with nodemon

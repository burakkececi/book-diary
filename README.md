# 📕 Book Diary
This work focuses on conducting Docker, Passport, Sequelize and some Encryption techniques work for training on this technologies.

It is a simple app that provides keeping a note about user's book.
The user can add book notes. The app also allows users to search for books and view their details.

## 🤖 Technologies Used
### 1. Docker
Docker is an open-source platform that allows you to automate the deployment, scaling, and management of applications using containerization.

### 2. Passport
Passport.js is a popular authentication middleware for Node.js applications.
 * It provides a simple and flexible way to authenticate users using various strategies, such as username/password, social media logins, and more.
 * Passport.js works with Express.js so we  integrate it into our application's routing and middleware stack.
 * We used session-based authentication.
### 3. Sequelize
It is an ORM. We prefer to use PostgreSQL database. 
### 4. Bcrypt
It is an encryption or a decryption algorithm provider. We used for storing the passwords encrypted in database.

## ⚙️ Run
To run in your local computer first you should compose up the app
```
docker compose up
```
OR you can only compose the database by
```
docker compose up appDB
```
then you can start the server by 
```
node src/index.js
```

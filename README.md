# headstrong
senior immersion greenfield app

## Description
Headstrong is an application designed to provide the user with a relaxing, stress-free environment to write out their thoughts without any judgment. It is designed to improve the user's mental health.
Upon entering the site, users are greeted by a motivational quote. They can then click on write entry, enter in a title, a journal body and upload an image. Users are also prompted to select their present mood. The memory will be captured with the current weather at the user's location.
At any point, a user can view a memory to reflect on their progress. Memories can be deleted or refreshed for a new random memory. If the user does not like their memory, they have the option to delete it.
## Dependencies
```"dependencies": {
    "@material-ui/core": "^4.11.3",
    "@material-ui/icons": "^4.11.2",
    "axios": "^0.21.1",
    "cookie-parser": "^1.4.5",
    "css-loader": "^5.0.1",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "file-loader": "^6.2.0",
    "moment": "^2.29.1",
    "mysql2": "^2.2.5",
    "nodemon": "^2.0.7",
    "passport": "^0.4.1",
    "passport-google-oauth": "^2.0.0",
    "passport-oauth": "^1.0.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-geolocated": "^3.1.0",
    "react-google-button": "^0.7.2",
    "react-google-login": "^5.2.2",
    "react-router-dom": "^5.2.0",
    "sequelize": "^6.5.0",
    "style-loader": "^2.0.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.12.10",
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "@babel/preset-react": "^7.12.10",
    "babel-loader": "^8.2.2",
    "eslint": "^7.18.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.22.0",
    "eslint-plugin-react-hooks": "^1.7.0",
    "husky": "^4.3.8",
    "webpack": "^5.19.0",
    "webpack-cli": "^4.4.0"
  }
  ```

## APIs used
Weatherbit API
*requires an access key
https://www.weatherbit.io/api/weather-current

IPStack API
*requires an access key
https://ipstack.com/

IPify
https://api.ipify.org

Quotes API
https://type.fit/api/quotes
## Google OAuth
Google Oauth requires a google cloud account. First create your account and then navigate to the developer console. Go to google API and create a clientID and clientSecret. This goes inside the .env file.

## Installation/Start-uo
1. First fork the repo and clone it to your local machine.
2. Get all env keys
3. Run npm install to install all dependencies
4. Run npm run dev to start Webpack
5. Run npm start to run the server

## Database
Setup Clever Cloud account to gain access to database.
https://www.clever-cloud.com/en/
Clever Cloud env keys can be found here. Select MySQL for database used.
If Sequelize is installed, start the server:
sequelize.sync
If Sequelize is not installed, check out the Sequelize documentation for instructions on how to proceed.
https://sequelize.org/master/manual/getting-started.html




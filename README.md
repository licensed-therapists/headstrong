# Headstrong

Senior Immersion Greenfield App
Product Owner: Edward Ellington
Scrum Master: Ian Wright
Original Development Team: Edward Ellington, Caity Opelka, Patrice Williams, Ian Wright
Legacy Development Team: Emmy Bishop, Kalypso Homan, Marvas McCladdie

## Description

Headstrong is an application designed to provide the user with a relaxing, stress-free environment to write out their thoughts without any judgment. It is designed to improve the user's mental health.

Upon entering the site, users are greeted by a motivational quote. They can then click on write entry, enter in a title, a journal body and upload an image. Users are also prompted to select their present mood. The memory will be captured with the current weather at the user's location.

At any point, a user can view a memory to reflect on their progress. Memories can be deleted or refreshed for a new random memory. If the user does not like their memory, they have the option to delete it.

## APIs used

Weatherbit API
\*requires an access key
https://www.weatherbit.io/api/weather-current

IPStack API
\*requires an access key
https://ipstack.com/

IPify
https://api.ipify.org

Quotes API
https://type.fit/api/quotes

OpenAI API
https://platform.openai.com/

Sample data can be found in the project's root

## Google OAuth

Google Oauth requires a google cloud account. First create your account and then navigate to the developer console. Go to google API and create a clientID and clientSecret. This goes inside the .env file.

## Installation/Start-uo

1. First fork the repo and clone it to your local machine.
2. Get all env keys (See .env.example)
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

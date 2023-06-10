# Headstrong

Senior Immersion Legacy App

Legacy Development Team: Emmy Bishop, Kalypso Homan, Marvas McCladdie

Original Development Team: Edward Ellington, Caity Opelka, Patrice Williams, Ian Wright

## Description

Headstrong is an application originally designed to provide the user with a relaxing, stress-free environment to write out their thoughts without any judgment. It was designed to improve the user's mental health.

Upon entering the site, users are greeted by a motivational quote. They can then click on write entry, enter in a title, a journal body and upload an image. Users are also prompted to select their present mood. The memory will be captured with the current weather at the user's location.

At any point, a user can view a memory to reflect on their progress. Memories can be deleted or refreshed for a new random memory. If the user does not like their memory, they have the option to delete it.

When a user is feeling a little too calm for comfort, they can tab over to the anti-ASMR feature to listen to a variety of viscerally-distressing sounds. Users can save their most hated sound so that it remains accessible at their next login. When that isn't enough, the user can utilize the anti-visualization feature, which provides a countdown to a dreaded event as well as a story to help them envision its worst possible outcome. When, despite that, the user's self-esteem remains too high, we've provided an impossible-to-win word game. The game includes a chat feature which allows the user to chat with a bully who, for some reason, appears magically aware of all their deepest, darkest fears.

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

## Installation/Start-up

1. First fork the repo and clone it to your local machine.
2. Get all env keys (See .env.example)
3. Run npm install to install all dependencies
4. Run npm run dev to start Webpack
5. Run npm start to run the server

### IF YOU ENCOUNTER INSTALLATION ISSUES:
1. `rm package-lock.json`
2. `npm install --legacy-peer-deps` to bypass peer dependency version requirements
3. `npm install react-google-login --legacy-peer-deps`

## Database

Setup Clever Cloud account to gain access to database.
https://www.clever-cloud.com/en/
Clever Cloud env keys can be found here. Select MySQL for database used.
If Sequelize is installed, start the server:
sequelize.sync
If Sequelize is not installed, check out the Sequelize documentation for instructions on how to proceed.
https://sequelize.org/master/manual/getting-started.html

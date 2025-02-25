# PropX App

## Table of Contents

- [How to run the app](#how-to-run-the-app)
- [Project Explanation](#project-explanation)
- [Things to Do](#things-to-do)

## How to run the app

- Clone repo and the backend repo
- `cd` into folder and run `npm install`
- make sure the backend is running locally before running the app
- use `npx expo start` to start metro bundler
- use `i` or `a` to run the app on the iOS or Android simulator using Expo Go

## Project Explanation

The main feature of this app is the betting flow that supports coin and cash currencies. The bets and user balance is fetched from the backend using Apollo, which was chosen because of its ease of use and my familiarity of it.

Key Features

- When the bet slip is opened, the user has the option to toggle between their coin and cash balances. The app supports both single bets and parlays. It also allow for deletion of bets. If all bets are deleted, the "Open Bet Slip" button will disappear. To do further testing, please reload the app for the data to be refetched.
- Users have the option to quickly select a preset betting amount which will be divided evenly between bets if the user is placing single bets. If they prefer to enter a custom value a custom button is available.
- Once the bet amounts are entered, the user can confirm their bet. After confirmation, a two step process occurs:
  - The user will be presented with the option to copy the bet using the alternative payment method.
  - If the user decides not to copy the bet and hits the "No" button, the betting slip will close and the "Open Bet Slip" button will disappear. To do further testing, please reload the app for the data to be refetched.
  - If the user decides to copy the bet and hits the "Yes" button, the balance switch to toggle to the opposite position. The user will then be able to enter the amount they would like to bet. Once all input fields are filled they can hit the "Confirm" button to submit the bet. The button will show a loading indicator and once complete will close the bottom sheet and remove the "Open Bet Slip" button. Again, to do further testing, please reload teh app for teh data to be refetched.

## Things to do

- The betting slip looks close to the Figma designs but there are a few things missing, such as missing team logos, end time text, max bet amount text, etc.
- Create functionality to the "Confirm" button to ensure the data is sent to the backend.
- Implement the use of global state for data used in multiple components.
- Add testing.
- Replace Apollo with Relay.
- Ensure that if the user decides to copy the bet, they are not able to toggle the switch.
- When the betting slip is open, darken the visible portion of the screen that is not blocked by the bottom sheet.
- Allow for scrolling when multiple bets are place.
- Adjust the potential win amount.

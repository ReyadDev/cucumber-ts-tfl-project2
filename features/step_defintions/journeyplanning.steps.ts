//import libraries and dependancies
import { Given, When, Then } from "@cucumber/cucumber";
//const { Given, When, Then } = require('@cucumber/cucumber');
//These Import or Require unresolved imported dependancies via tsconfig are causing the tests to fail.
//import axios from 'axios';
const axios = require("axios");
//import { expect } from 'chai';
//const { expect } = import('chai');
import { expect } from "chai";
//Import the JourneyService Class to ensure that the methods can be reached
import { JourneyService } from "../../services/JourneyService";

//Define any const variables
const TFL_BASE_URL = "https://api.tfl.gov.uk/Journey/JourneyResults";

//Define any variables
let startLocation: string;
let endLocation: string;
//journeyPlan = all data from response inside {} returned by API
let journeyPlan: any;
let journeyArrivalTime: any;
let journeyDepartureTime: any;
const journeyService = new JourneyService();

//SCENARIO 1, SCENARIO 2, SCENARIO 3
Given("I am at {string}", function (address: string) {
  //Pass starting location address as a string variable within the argument
  startLocation = address;
  console.log("Start Location is " + address);
});

//SCENARIO 1, SCENARIO 2
Given("I need to go to {string}", function (address: string) {
  //Pass end location address as a string variable within the argument
  endLocation = address;
  console.log("End Location is " + address);
});

//SCENARIO 3
Given(
  "I need to go to {string} by {string} next Wednesday",
  async (address: string, time: string) => {
    // I am hardcoding the date but you could calculate the date for next Wednesday via Date Object
    endLocation = address;
    journeyArrivalTime = time;
    console.log(
      "End Location is " + address + " by " + time + " next Wednesday"
    );
  }
);

//SCENARIO 1
When("I plan the quickest journey", async function () {
  //Call method to pass start and end location values to query API endpoint
  journeyPlan = await journeyService.planQuickestJourney(
    startLocation,
    endLocation
  );
  console.log("I plan the quickest journey");
});

//SCENARIO 2
When("I plan the journey", async function () {
  //Call method to pass start and end location values to query API endpoint
  journeyPlan = await journeyService.planJourney(startLocation, endLocation);
  console.log("I plan the journey");
});

//SCENARIO 3
When("I plan the latest possible journey", async () => {
  //Call method to pass start and end location values to query API endpoint
  journeyPlan = await journeyService.planLatestPossibleJourney(
    startLocation,
    endLocation,
    journeyDepartureTime
  );
  console.log("I plan the latest possible journey");
});

//SCENARIO 1
Then(
  "I should see a valid journey plan with the shortest travel time",
  function () {
    //Check that the reponse is defined/populated
    expect(journeyPlan).to.not.be.undefined;
    //Check the shortest travel time = true
    // Extract the journey preference from the URI in journeyVector
    const journeyVector = journeyPlan.journeyVector;
    const urlParams = new URLSearchParams(journeyVector.uri.split("?")[1]);
    const journeyPreference = urlParams.get("journeypreference");
    // Assert that journeyPreference equals 'leasttime'
    expect(journeyPreference).to.equal("leasttime");
    console.log(
      "I should see a valid journey plan with the shortest travel time"
    );
  }
);

//SCENARIO 2
Then("I should see a valid journey plan", function () {
  //Check that the reponse is defined/populated
  expect(journeyPlan).to.not.be.undefined;
  console.log("I should see a valid journey plan");
});

//SCENARIO 3
Then(
  "I should see a valid journey that arrives before {string} on that day",
  async (time: number) => {
    const specifiedTime = time;
    //Check that the reponse is defined/populated
    expect(journeyPlan).to.not.be.undefined;
    //Identify that this the journey arrival is before 0850 - if < 0850 = Pass
    // Extract the journey preference from the URI in journeyVector
    const journeyVector = journeyPlan.journeyVector;
    const urlParams = new URLSearchParams(journeyVector.uri.split("?")[1]);
    const scheduledArrivalTime = urlParams.get("scheduledArrivalTime");
     // Assert that scheduledArrivalTime is less than time
     //Convert/parse to a number and then compare
  if (scheduledArrivalTime < time)
  return true;
else

    console.log(
      "I should see a valid journey that arrives before " +
        time +
        " on that day"
    );
  }
);

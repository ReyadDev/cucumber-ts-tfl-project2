//write gherkin steps and step defs
//define any const variables
//decide what parameters I am sending to the endpoint (what format)
//API Key and any necessary Log in Credentials for 500 requests pm
//Import axios library to make restful HTTP requests
//Will the body be json files in json format or a url string appended with variable data?
//create any methods to handle the data
//confirm returned data - 200 response
//check that it matches the expected result
//console.log out response

//import libraries and dependancies
import { Given, When, Then, And } from "@cucumber/cucumber";
//const { Given, When, Then } = require('@cucumber/cucumber');
//THIS IS CAUSING THE TEST TO FAIL. ITS SOMETHING TO DO WITH THE TSCONFIG AND THE DEPENDANCIES
//const axios = import('axios');
//import axios from 'axios';
const axios = require("axios");
//import { expect } from 'chai';
//const { expect } = import('chai');
import { expect } from "chai";
import { parse } from "date-fns";
//import JounreyService Class with planQuickestJourney method
import { JourneyService } from "../../services/JourneyService";

//define any const variables
//const TFL_API_KEY = "71820bc06e6941cf9e279e86955f800d"; //Not Required
const TFL_BASE_URL = "https://api.tfl.gov.uk/Journey/JourneyResults";

//define the variables I will need to use
let error: any = null;
let startLocation: string;
let endLocation: string;
let journeyPlan: any;
let journeyArrivalTime: any;
let journeyDepartureTime: any;
const journeyService = new JourneyService();

//SCENARIO 1, SCENARIO 2
Given("I am at {string}", function (address: string) {
  //pass starting location postcode as a declared string variable within an argument
  startLocation = address;
});

//SCENARIO 1, SCENARIO 2
Given("I need to go to {string}", function (address: string) {
  //pass end location postcode as a declared string variable within an argument
  endLocation = address;
});

//SCENARIO 3
Given(
  "I need to go to {string} by {string} next Wednesday",
  async (address: string, time: string) => {
    // Calculate the date for next Wednesday
    endLocation = address;
    journeyArrivalTime = time;
    journeyPlan = await journeyService.planJourneyForNextWednesday(
      startLocation,
      endLocation,
      journeyArrivalTime
    );
  }
);

//SCENARIO 1
When("I plan the quickest journey", async function () {
  //call method to pass through saved values to send to api
  journeyPlan = await journeyService.planQuickestJourney(
    startLocation,
    endLocation
  );
});

//SCENARIO 2
When("I plan the journey", async function () {
  //call method to pass through saved values to send to api
  journeyPlan = await journeyService.planJourney(startLocation, endLocation);
});

//SCENARIO 3
When("I plan the latest possible journey", async () => {
  journeyPlan = await journeyService.planLatestPossibleJourney(
    startLocation,
    endLocation,
    journeyDepartureTime
  );
});

//SCENARIO 1
Then(
  "I should see a valid journey plan with the shortest travel time",
  function () {
    //check it is defined/populated
    expect(journeyPlan).to.not.be.undefined;
    //check that it is valid - is this required?
    expect(journeyPlan.valid).to.be.true;
    //compare encoded results to expected postcode
    expect(journeyPlan.from).to.equal(startLocation);
    expect(journeyPlan.to).to.equal(endLocation);
    //NEED TO IDENTIFY THAT THIS IS THE SHORTEST TRAVEL TIME - How?
  }
);

//SCENARIO 2
Then("I should see a valid journey plan", function () {
  //check it is defined/populated
  expect(journeyPlan).to.not.be.undefined;
  //check that it is valid - is this required?
  expect(journeyPlan.valid).to.be.true;
  //compare encoded results to expected postcode
  expect(journeyPlan.from).to.equal(startLocation);
  expect(journeyPlan.to).to.equal(endLocation);
});

//SCENARIO 3
Then(
  "I should see a valid journey that arrives before {string} on that day",
  async (time: string) => {
    const specifiedTime = parse(time, "HH:mm", new Date());
    journeyArrivalTime = await journeyService.getJourneyArrivalTime();

    //check it is defined/populated
    expect(journeyPlan).to.not.be.undefined;
    //check that it is valid - is this required?
    expect(journeyPlan.valid).to.be.true;
    //compare encoded results to expected postcode
    expect(journeyPlan.from).to.equal(startLocation);
    expect(journeyPlan.to).to.equal(endLocation);
    //NEED TO CALCULATE THAT THIS HAS ARRIVED BEFORE 08:30
    expect(journeyArrivalTime).to.be.lessThan(specifiedTime);
  }
);

/*Strategy and Approach

1. Write Gherkin steps and link with step defs
2. Define any const variables
3. Decide which parameters I am sending to the endpoint (format)
4. Identify API Key and any necessary Log in Credentials (not relevant)
5. Import Axios library to make restful HTTP requests
6. Send requests via JSON files or a URL string appended with variable data?
7. Create methods to underpin step defs and send/check data
8. Confirm returned reponses from endpints - 200 response
9. Check that it returned repsonses match the expected result
10. Use console.log to output responses for debugging
*/

//import libraries and dependancies
import { Given, When, Then } from "@cucumber/cucumber";
//const { Given, When, Then } = require('@cucumber/cucumber');
//These unresolved imported dependancies via tsconfig are causing the tests to fail.
//const axios = import('axios');
//import axios from 'axios';
const axios = require("axios");
//import { expect } from 'chai';
//const { expect } = import('chai');
import { expect } from "chai";
import { parse } from "date-fns";
//Import the JourneyService Class to ensure that the methods can be reached
import { JourneyService } from "../../services/JourneyService";

//Define any const variables
const TFL_BASE_URL = "https://api.tfl.gov.uk/Journey/JourneyResults";

//define any dynamic variables
let error: any = null;
let startLocation: string;
let endLocation: string;
let journeyPlan: any;
let journeyArrivalTime: any;
let journeyDepartureTime: any;
const journeyService = new JourneyService();

//SCENARIO 1, SCENARIO 2
Given('I am at {string}', function (address: string) {
  //Pass starting location address as a string variable within the argument
  startLocation = address;
  return console.log('Start Location is ' + address);
});

//SCENARIO 1, SCENARIO 2
Given("I need to go to {string}", function (address: string) {
  //Pass end location address as a string variable within the argument
  endLocation = address;
  return console.log("End Location is " + address);
});

//SCENARIO 3
Given(
  "I need to go to {string} by {string} next Wednesday",
  async (address: string, time: string) => {
    // I am hardcoding the date but you could calculate the date for next Wednesday via Date Object
    endLocation = address;
    journeyArrivalTime = time;
    journeyPlan = await journeyService.planJourneyForNextWednesday(
      startLocation,
      endLocation,
      journeyArrivalTime
    );
    return console.log(
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
  return console.log("I plan the quickest journey");
});

//SCENARIO 2
When("I plan the journey", async function () {
  //Call method to pass start and end location values to query API endpoint
  journeyPlan = await journeyService.planJourney(startLocation, endLocation);
  return console.log("I plan the journey");
});

//SCENARIO 3
When("I plan the latest possible journey", async () => {
  //Call method to pass start and end location values to query API endpoint
  journeyPlan = await journeyService.planLatestPossibleJourney(
    startLocation,
    endLocation,
    journeyDepartureTime
  );
  return console.log("I plan the latest possible journey");
});

//SCENARIO 1
Then(
  "I should see a valid journey plan with the shortest travel time",
  function () {
    //Check that the reponse is defined/populated
    expect(journeyPlan).to.not.be.undefined;
    //Check that the response is valid - perhaps unecessary
    expect(journeyPlan.valid).to.be.true;
    //Compare the encoded results to the expected address
    expect(journeyPlan.from).to.equal(startLocation);
    expect(journeyPlan.to).to.equal(endLocation);
    //Identify that shortest travel time = true - investigate how.
    return console.log(
      "I should see a valid journey plan with the shortest travel time"
    );
  }
);

//SCENARIO 2
Then("I should see a valid journey plan", function () {
  //Check that the reponse is defined/populated
  expect(journeyPlan).to.not.be.undefined;
  //Check that the response is valid - perhaps unecessary
  expect(journeyPlan.valid).to.be.true;
  //Compare the encoded results to the expected address
  expect(journeyPlan.from).to.equal(startLocation);
  expect(journeyPlan.to).to.equal(endLocation);
  return console.log("I should see a valid journey plan");
});

//SCENARIO 3
Then(
  "I should see a valid journey that arrives before {string} on that day",
  async (time: string) => {
    const specifiedTime = parse(time, "HH:mm", new Date());
    journeyArrivalTime = await journeyService.getJourneyArrivalTime();
    //Check that the reponse is defined/populate
    expect(journeyPlan).to.not.be.undefined;
    //Check that the response is valid - perhaps unecessary
    expect(journeyPlan.valid).to.be.true;
    //Compare the encoded results to the expected address
    expect(journeyPlan.from).to.equal(startLocation);
    expect(journeyPlan.to).to.equal(endLocation);
    //Identify that this the journey arrival is before 08:30
    //if < 08:30 = Pass
    expect(journeyArrivalTime).to.be.lessThan(specifiedTime);

    return console.log(
      "I should see a valid journey that arrives before " +
        time +
        " on that day"
    );
  }
);

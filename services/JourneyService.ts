//import libraries and dependancies
//const { Given, When, Then } = require('@cucumber/cucumber');
//THIS IS CAUSING THE TEST TO FAIL. ITS SOMETHING TO DO WITH THE TSCONFIG AND THE DEPENDANCIES
//const axios = import('axios');
import axios from "axios";
//const axios = require('axios');
//import { expect } from 'chai';
//const { expect } = import('chai');
//import { expect } from 'chai';

const TFL_API_KEY = "71820bc06e6941cf9e279e86955f800d"; //primary api key NOT secondary

export class JourneyService {
  private baseUrl = "https://api.tfl.gov.uk/Journey/JourneyResults";

  public async planQuickestJourney(from: string, to: string) {
    // Encode the start and end locations to ensure they are URL-safe
    const encodedFrom = encodeURIComponent(from);
    const encodedTo = encodeURIComponent(to);
    //url with uncoded elements that I am sending
    const url = `${this.baseUrl}/${encodedFrom}/to/${encodedTo}
  ?nationalSearch=false
  &date=20240903
  &time=1800
  &timeIs=Departing
  &journeyPreference=LeastTime`;
    //FROM: 69%20Notting%20Hill%20Gate,%20London%20W11%203JS
    //TO: Southbank%20Centre

    //add a try/catch to handle error
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TFL_API_KEY}`,
        },
      });
      //display api repsonse as output via the console
      console.log("API Response:", response.data);

      // Assuming the response contains fields like 'travelTimeMinutes' and 'valid'
      //I need to rejig this so that it fetches the required data
      const { travelTimeMinutes, valid } = response.data;

      return {
        from,
        to,
        travelTimeMinutes,
        valid,
      };
    } catch (error) {
      const typedError = error as Error; // Corrected Type assertion error
      console.error("Error planning journey:", typedError.message);
    }
  }

  public async planJourney(from: string, to: string) {
    // Encode the start and end locations to ensure they are URL-safe
    const encodedFrom = encodeURIComponent(from);
    const encodedTo = encodeURIComponent(to);
    //url with uncoded elements that I am sending
    const url = `${this.baseUrl}/${encodedFrom}/to/${encodedTo}
?nationalSearch=true
&date=20240903
&time=1800
&timeIs=Departing
&journeyPreference=LeastTime`;
    //FROM: 69%20Notting%20Hill%20Gate,%20London%20W11%203JS
    //TO: Bristol%20Temple%20Meads

    //add a try/catch to handle error
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TFL_API_KEY}`,
        },
      });
      //display api repsonse as output via the console
      console.log("API Response:", response.data);

      // Assuming the response contains fields like 'travelTimeMinutes' and 'valid'
      //I need to rejig this so that it fetches the required data
      const { travelTimeMinutes, valid } = response.data;

      return {
        from,
        to,
        travelTimeMinutes,
        valid,
      };
    } catch (error) {
      const typedError = error as Error; // Corrected Type assertion error
      console.error("Error planning journey:", typedError.message);
    }
  }

  public async getJourneyArrivalTime() {
    //GET JOURNEY ARRIVAL TIME FROM RESPONSE
  }

  public async planJourneyForNextWednesday(
    from: string,
    to: string,
    time: string
  ) {
    //set JOURNEY ARRIVAL TIME FRO RESPONSE
  }

  public async planLatestPossibleJourney(
    from: string,
    to: string,
    time: string
  ) {
    //Get the latest possible departure time
  }
}

/*
params: {
    nationalSearch: 'false',
    date: '20240905',
    time: '1800',
    timeIs: 'Departing',
    journeyPreference: 'LeastTime',
    */

import axios from "axios";

//Export class to ensure that methods are reachable
export class JourneyService {
  //Set baseURL so that the suffix URL can be dynamic according to test
  private baseUrl = "https://api.tfl.gov.uk/Journey/JourneyResults";

  public async planQuickestJourney(from: string, to: string) {
    // Encode the start and end locations to ensure they are URL-safe
    const encodedFrom = encodeURIComponent(from);
    const encodedTo = encodeURIComponent(to);
    //URL with uncoded elements that I am sending
    const url = `${this.baseUrl}/${encodedFrom}/to/${encodedTo}
  ?nationalSearch=false
  &date=20240903
  &time=1800
  &timeIs=Departing
  &journeyPreference=LeastTime`;
    //FROM: 69%20Notting%20Hill%20Gate,%20London%20W11%203JS
    //TO: Southbank%20Centre

    //Add a try/catch to handle any errors or invalid responses
    try {
      const response = await axios.get(url, {});
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
      const response = await axios.get(url, {});
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
    //Read journey time from repsonse
  }

  public async planJourneyForNextWednesday(
    from: string,
    to: string,
    time: string
  ) {
    //Set jounrey arrival time from response
  }

  public async planLatestPossibleJourney(
    from: string,
    to: string,
    time: string
  ) {
    //Get the latest possible departure time
  }
}

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
  &date=20240911
  &time=1800
  &timeIs=Departing
  &journeyPreference=LeastTime`;
    //FROM: 69%20Notting%20Hill%20Gate,%20London%20W11%203JS
    //TO: Southbank%20Centre

    //Add a try/catch to handle any errors or invalid responses
    try {
      const response = await axios.get(url, {});
      //check that there is a valid response from API
      console.log("API Response:", response.data);

      return response.data;
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
&date=20240911
&time=1800
&timeIs=Departing
&journeyPreference=LeastTime`;
    //FROM: 69%20Notting%20Hill%20Gate,%20London%20W11%203JS
    //TO: Bristol%20Temple%20Meads

    //add a try/catch to handle error
    try {
      const response = await axios.get(url, {});
      //check that there is a valid response from API
      console.log("API Response:", response.data);

      return response.data;
    } catch (error) {
      const typedError = error as Error; // Corrected Type assertion error
      console.error("Error planning journey:", typedError.message);
    }
  }

  public async planLatestPossibleJourney(
    from: string,
    to: string,
    time: string
  ) {
    // Encode the start and end locations to ensure they are URL-safe
    const encodedFrom = encodeURIComponent(from);
    const encodedTo = encodeURIComponent(to);
    //url with uncoded elements that I am sending
    const url = `${this.baseUrl}/${encodedFrom}/to/${encodedTo}
?nationalSearch=false
&date=20240918
&time=${time}
&timeIs=Arriving
&journeyPreference=LeastTime`;
    //FROM: London%20Luton%20Airport%20Operations%20Ltd,%20Navigation%20House,%20Airport%20Way,%20London,%20Luton%20Airport,%20Luton,%20LU2%209LY
    //TO: 69%20Notting%20Hill%20Gate,%20London%20W11%203JS
    //TIME: time=0850

    //add a try/catch to handle error
    try {
      const response = await axios.get(url, {});
      //check that there is a valid response from API
      console.log("API Response:", response.data);

      return response.data;
    } catch (error) {
      const typedError = error as Error; // Corrected Type assertion error
      console.error("Error planning journey:", typedError.message);
    }
  }
}

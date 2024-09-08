Take Home Test:

Create BDD scenarios and executable step definitions to test Tfl Unified API
https://api.tfl.gov.uk/

Scenarios -
a. Its the day of the Kaluza annual conference being held at the Southbank
Centre in London but you're at the office in 69 Notting Hill Gate in London.
Plan the quickest journey between the two (ie the journey with the shortest
travel time between the two)

b. You're at the office in 69 Notting Hill Gate London but need to get to the
Bristol office that is around the corner from Bristol Temple Meads train
station. Plan your journey from the london office to the train station in
bristol

c. Our Belfast based Lead qa is traveling to london for a day of meetings.
He's arriving into Luton Airport next wednesday for meetings and needs to
arrive at the office by 8.50am. Plan a journey with the latest time he can
leave luton airport to arrive at the office by 8.50am

Assumptions:
● The test preparation & execution should be on the API level
● Write in typescript (preferable) or javascript
● Use Cucumber
● Code to be shared via github and your repo should include everything needed to
execute the tests.
● Demonstrate the test execution (an automation report will suffice - you can commit it in your git repo)


 Strategy and Approach

 - Read the instructions a few times to understand the task
 - Investigated and signed up with the TFL API Swagger
 - Ran the API enpoints via the TFL API Swagger to check input and output are valid, confirmed returned reponses from endpoints - 200 response
 - Ran the instructions through ChatGTP to understand the overall steps
 - Checked Which IDE's are able to set up and work with a TypeScript project using Cucumber 
   for free or straight out the box (no paid required)
 - Chose Visual Studio Code (VS Code) as Cost: Free, TypeScript Support: Excellent, built-in and Cucumber Support: Requires a free extension for full support.
 - Downloaded VS Code to set up a example feature to test that is passes/and correctly fails
 - Installed Node.js and NPM (Node Package Manager) which comes with it
 - Set Up Project Directory
 - Initialised Project via Git command line interface and VS Code terminal
 - Installed Required Dependencies
 - Lost my mind trying to make the example feature work
 - Installed individual Cucumber Gherkin Prettier ESLint  
 - Installed Typescrpt Axios, Chai, Date extensions etc 
 - Imported Axios library to make restful HTTP requests
 - Wrote Gherkin steps and linked with step defs
 - Define const variables
 - Decided on what parameters I needed to send to the endpoint (format)
 - Identifyed API Key and any necessary Log in Credentials (not relevant as not needed to make calls)
 - Decided if I was going to send requests via JSON files or via a URL string appended with variable data - chose latter due to straightforward input requirements and limited amount of tests
 - Created methods to underpin step defs and to send and check data

To Do: 

 - Check that endpoint return responses match the expected result
 - Use console.log to output responses for debugging
 - Resolve configuration issue to amend the configuration files to align and correct cucumber settings (Resolve the Commmon JS Require/ES Module Import issue) 
 - Complete running and debugging of expected/actual results
 - Add in loops and complete last comaprisons of expected and actual results
 
 - Improvement: Provide consistency by setting a fixed departure time and date for each test
 - Improvement: check for a 200 repsponse instead of '.to.not.be.undefined;'
 - Improvement: Build parameters into more explicit Feature file steps
 - Improvement: Ignore mismatch of address format and string returned by API endpoint
 - Improvement: Could put in a method to handle the 300 response where multiple addresses are returned
 - Improvement: Could use address id and/or import/call geolocation to handle multiple addresses if they are returned
 - Use the journeyPlan API results to access specific raw data from the results (e.g.: journeyPlan.journeys for further tests)
 - Improvement: Add configuration to produce a cucumber report
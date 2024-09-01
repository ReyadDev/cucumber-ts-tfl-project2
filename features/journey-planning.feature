Feature: TfL Journey Planning

  Scenario: Quickest journey from 69 Notting Hill Gate to Southbank Centre
    Given I am at "69 Notting Hill Gate, London W11 3JS"
    Given I need to go to "Southbank Centre"
    When I plan the quickest journey
    Then I should see a valid journey plan with the shortest travel time

  Scenario: Journey from 69 Notting Hill Gate to Bristol Temple Meads train station
    Given I am at "69 Notting Hill Gate"
    And I need to go to "Bristol Temple Meads"
    When I plan the journey
    Then I should see a valid journey plan

  Scenario: Plan a journey from Luton Airport to arrive at the office by 8:50 AM next Wednesday
    Given I am at "Airport Way, Luton LU2 9LY"
    And I need to go to "69 Notting Hill Gate, London W11 3JS" by "08:50" next Wednesday
    When I plan the latest possible journey
    Then I should see a valid journey that arrives before "08:50" on that day

# Interview Scheduler

An SPA Application built in React that assists in scheduling for a business week. 

# Functional Features
- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Final Product

![Main Page](https://raw.githubusercontent.com/DJVinyl/scheduler/master/App%20Pictures/Main%20Page.png)

## Future Development
- Implement serverless backend (Heroku)
- Admin Portal to add/change Interviewers

## Setup

Install dependencies with `npm install`.

Dependicies include:
  - axios 
  - classnames
  - normalize.css
  - react
  - react-dom
  - react-script
  - cypress

In conjunction to server (scheduler-api)[https://github.com/DJVinyl/scheduler-api]


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress
```sh
npm run cypress
```




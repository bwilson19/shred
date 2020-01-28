# Shred

## Getting Started

Shred is a informative app that allows users to search through nearly all of the ski resorts in the world, and get updated details about each resort. Users are able to see a recent ski map image as well as current weather for the resort's location.

To see the live version, navigate to http://shredapp.herokuapp.com/ (Mobile Friendly)

## Description

This application pulls from 2 different data sources to gather real-time information for skiers/snowboarders. The goal is to condense the relevant info for these users into one location, so the users don't have to go to a few different websites to gather the same info. To do this, I've kept the workflow simple, and cut down on the number of clicks needed by the end user.

Here's a quick animation of the workflow:
![shred](https://user-images.githubusercontent.com/58187597/73314471-d3cc0900-41e2-11ea-9635-2ee50021c62b.gif)

The user will start on the home/search page, where they can either enter a partial name of a resort, a country or state (if United States) to bring up a list of matching results. 

**Note: If the search criteria is unique to a individual resort (i.e. the exact name), they will be brought directly to that resort's page.**

## Built With

- React (Bootstrapped with [Create React App](https://github.com/facebook/create-react-app))
- Javascript
- HTML
- CSS

## APIs

- Weather Data from https://openweathermap.org/api
- Ski Resort Data (including Ski Map images) from https://skimap.org/pages/Developers

### Future Updates

- Adding back-end functionality that allows for user's to leave reviews, ratings, and comments for resorts.
- Adding Google Maps API to give exact directions
- Give users the option to save their favorite resorts and quickly jump back to them (Favorites section)

## Creator

**Brendan Wilson** - [Portfolio](https://bwilson19.github.io)

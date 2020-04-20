# NDVI

Normalized Difference Vegetation Index ([NDVI](http://https://gisgeography.com/ndvi-normalized-difference-vegetation-index/ "NDVI")) quantifies vegetation by measuring the difference between near-infrared (which vegetation strongly reflects) and red light (which vegetation absorbs).

### Motivation and goal
The purpose of this software is to display the NDVI images of the user's areas. The MVP of this software is as simple as possible, for validation with a single user (my father). Initially, all areas will be registered manually, without a back-end, without a database. Over time the idea is to increase the software, add features and make it more professional.

#### Implemented until now
- Google Maps;
- farm location marker;
- Design of user areas;
- Calculation for initialization of the map in the center of the areas;

#### ToDo
- Calculation of NDVI;
- Dynamizing users;
- Dynamizing areas;
- Grain culture quotation;

### Tecnologies used
- ReactJS
- Tailwind CSS
- Turf JS
- Google Maps API

### To run this application
Run `yarn` or `npm install` to install all the dependencies.
Add a file called `.env` at the root of project and add the following line:

`REACT_APP_GOOGLE_MAPS_API_KEY=<insert your API KEY here>`

Now you can run the command `yarn start` or `npm start` to run the project

### Screenshots
![Mobile](https://user-images.githubusercontent.com/29802533/79703483-7ba52000-8282-11ea-855a-0d35b1a4e6a8.jpg "Mobile")
![Desktop](https://user-images.githubusercontent.com/29802533/79703486-81026a80-8282-11ea-8517-729767e01b1d.jpg "Desktop")

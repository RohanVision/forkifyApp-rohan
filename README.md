# forkify Project

Forkify 
Forkify is a web application (learning project) that allows users to search for recipes, view detailed recipe information, bookmark favorite recipes, and even add their own recipes. This application is built using modern JavaScript, HTML5, and CSS3, leveraging tools like Webpack and Babel for an efficient development process.

Demo Link - https://rohan-forkifyapp.netlify.app/

Table of Contents
- Features
- Installation
- Usage
- API

Features
- Search Recipes: Users can search for over 1,000,000 recipes.
- View Recipes: Detailed view of each recipe including ingredients, cooking time, and servings.
- Bookmarks: Bookmark favorite recipes for quick access.
- Add Recipes: Users can add their own recipes to the application.
- Responsive Design: The application is fully responsive and works on all devices.

API
The application uses the Forkify API for fetching recipes. The key configurations are:

- API_URL: https://forkify-api.herokuapp.com/api/v2/recipes/
- KEY: YOUR_API_KEY

Example Usage
Fetching a Recipe
  const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

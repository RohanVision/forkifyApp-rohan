import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime';

///////////////////////////////////////

if (module.hot) {
  module.hot.accept()
}

const controleRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    // console.log(id); // to test id

    // if (!id) return; guard clause
    if (id === '') return;
    recipeView.renderSpiner();

    // Update Results view to mark selected
    resultsView.update(model.getSearchResultPage());

    // Updating bookmarks View
    bookmarksView.update(model.state.bookmarks);

    // Loading Recipes
    await model.loadRecipe(id);

    // Rendering a recipe
    recipeView.render(model.state.recipes); // more descriptive
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();

    // 1) Get Search Query
    const query = searchView.getQuery();
    if (query === '') return;

    // 2) Load search results
    await model.loadSearchResults(query);


    // console.log(model.state.search.results);
    // 3) render search results sucess
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search)

  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render New Results
  resultsView.render(model.getSearchResultPage(goToPage));

  // 2) Render new pagination buttons
  paginationView.render(model.state.search);

}

const controlServing = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipes); // more descriptive
  recipeView.update(model.state.recipes); // more descriptive
}

const controlAddBookmark = function () {
  // 1. Add/remove bookmark
  if (model.state.recipes.bookmarks === false) {
    model.addBookmark(model.state.recipes);
  } else {
    model.deleteBookmark(model.state.recipes.id);
  }
  // console.log(model.state.recipes);

  // Update receipe view
  recipeView.update(model.state.recipes);

  // Render Bookmark
  bookmarksView.render(model.state.bookmarks);
}

const controleBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpiner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipes);

    // Sucess Message
    addRecipeView.renderMessage();

    // Render Bookmark View
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipes.id}`);

    // close the window
    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    console.log('testAddRecipe', err);
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  bookmarksView.addHandlerRender(controleBookmarks);
  recipeView.addHandlerRender(controleRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);;
}
init();
import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No Receipe found for your query! Please try other query';
    _message = '';

    _generateMarkup() {
        return this._data.map(results => previewView.render(results, false)).join(' ');
    }
}

export default new ResultsView();
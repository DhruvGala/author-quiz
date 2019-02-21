import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm'
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/MarkTwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name: 'George Orwell',
        imageUrl: 'images/authors/GeorgeOrwell.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['1984']
    },
    {
        name: 'J K Rowling',
        imageUrl: 'images/authors/JKRowling.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Harry Potter and the Chamber of Secrets']
    },
    {
        name: 'Margaret Atwood',
        imageUrl: 'images/authors/MargaretAtwood.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Handmaid\'s Tale']
    },
    {
        name: 'Neil deGrasse Tyson',
        imageUrl: 'images/authors/NeildeGrasseTyson.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Astrophysics for People in a Hurry']
    },
    {
        name: 'Stephen Hawking',
        imageUrl: 'images/authors/StephenHawking.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['A brief History of Time']
    }    
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks.slice(0,4));
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
            author: authors.find((author) =>
            author.books.some((title) =>
            title === answer))
    }
}

function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''},
    action) {
        switch (action.type) {
            case 'ANSWER_SELECTED':
                const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
                return Object.assign({}, state, { 
                    highlight: isCorrect ? 'correct' : 'wrong'
                });
            case 'CONTINUE':
                return Object.assign({}, state, {
                    highlight: '',
                    turnData: getTurnData(state.authors)
                });
            case 'ADD_AUTHOR':
                return Object.assign({}, state, {
                    authors: state.authors.concat([action.author])
                });
            default: return state;
        }
    return state;
}

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz} />
                <Route path="/add" component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

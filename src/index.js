import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
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

function resetSet() {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

let state = resetSet();

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function App() {
    return(<AuthorQuiz {...state} 
        onAnswerSelected={onAnswerSelected}
        onContinue={() => {
            state = resetSet();
            render();
        }} />);
}

const AuthorWrapper = withRouter(({history}) => 
    <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }} />
);

function render() {
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/add" component={AuthorWrapper} />
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

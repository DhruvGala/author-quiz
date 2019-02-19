import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['The Shining', 'Animal Farm', '1984', 'David Copperfield', 'A Tale of Two Cities','A Brief Hstory of Time', 'Hamlet'],
    author: {
      name: 'George Orwell',
      imageUrl: 'images/authors/GeorgeOrwell.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['1984', 'Animal Farm']
    },
  },
  highlight: 'none'
}

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected ={() => {}}/>, div);
  });
});

import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';

function Hero() {
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p>Select the book written by the author shown.</p>
    </div>
  </div>);
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightToBackgroundColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return (<div className="row turn" style={{backgroundColor: highlightToBackgroundColor(highlight)}}>
  <div className="col-4 offset-1">
    <img src={author.imageUrl} className="authorimage" alt="Author"/>
  </div>
  <div className="col-6">
    {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/> )}
  </div>
    </div>);
}

function Book({title, onClick})  {
  return (<div className="answer" onClick={() => {onClick(title);}}>
    <h4>{title}</h4>
  </div>);
}

function Continue() {
  return (<div />);
}

function Footer() {
  return (<div id="footer" className="row">
    <p className="text-muted credit">
      All the images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikipedia Commons</a> and are in the public domain.
    </p>
  </div>)
}

function AuthorQuiz({turnData, highlight, onAnswerSelected}) {
  return (<div className="container-fluid">
      <Hero/>
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue/>
      <Footer/>
    </div>
  );
}

export default AuthorQuiz;

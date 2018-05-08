import React from 'react';

import '../styles/Footer.css';

const Footer = () => {

  const reactJSX = (
    <a href="https://reactjs.org/" title="ReactJS" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-react"></i>
    </a>
  );

  const bulmaJSX = (
    <a href="https://bulma.io/" title="Bulma" target="_blank" rel="noopener noreferrer">
      <img src="./images/bulma.svg" alt="Bulma logo"></img>
    </a>
  );

  const authorJSX = (
    <a href="https://github.com/danielpes" target="_blank" rel="noopener noreferrer">Daniel de Paula</a>
  );

  return (
    <div className="Footer">
      <span>
        Made with { reactJSX } and { bulmaJSX } by { authorJSX }
      </span>
    </div>
  );
};

export default Footer;

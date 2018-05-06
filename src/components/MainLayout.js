import React, { Component } from 'react';

import '../styles/MainLayout.css';

class MainLayout extends Component {
  render() {
    return (
      <div className="MainLayout">
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default MainLayout;
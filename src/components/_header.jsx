// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/components/header.css';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <header>
          <h1>LIBRE</h1>
          <div className="line a" />
          <h2>WUCHIEN'S</h2>
          <div className="line b" />
          <h1 className="three">blog</h1>
        </header>
        <nav>
          <ul>
            <li><Link to="/blog/1">BLOG</Link></li>
            <li><Link to="/portfolio">PORTFOLIO</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;

// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './_header';
import Blog from './blog';
import BlogPost from './blog-post';
import About from './about';
import Portfolio from './portfolio';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/blog/:pageid/:postid" component={BlogPost} />
      <Route path="/blog/:pageid" component={Blog} />
      <Route path="/blog" component={Blog} />
    </Switch>
    <Route path="/about" component={About} />
    <Route path="/portfolio" component={Portfolio} />
  </div>
);

export default App;

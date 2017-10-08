import React, {Component} from 'react';
import AddForm from './../components/Form/entry.js';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom';
import TableOverview from '../components/Table/TableListing'; 

const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={TableOverview}/>
            <Route exact path="/add" component={AddForm}/>
        </Switch>
    </Router>
  )

  export default AppRouter
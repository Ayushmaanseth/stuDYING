import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Registration from './Registration/Registration.js'
import Feed from './Feed';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Route exact path="/" component={Registration}/>
                        <Route path="/feed" component={Feed}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;

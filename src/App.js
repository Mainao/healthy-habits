import React, { Component } from 'react';
import './App.css';

import Food from './components/Food';

class App extends Component {
    render() {

        return(
            <React.Fragment>
                <nav className="navbar navbar-light border-bottom justify-content-between">
                    <span className="navbar-brand mx-auto"><span className="text-primary">Healthy Living</span> Healthy Thinking</span>
                </nav>
                <div className="container">
                    <Food />
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;
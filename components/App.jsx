import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import isMobile from 'is-mobile';

import Template from './Template';
import Home from './Home';
import Container from './Container';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, menuItems: [{ url: '/', title: 'Home' }],
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { menuItems, open } = this.state;
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route>
              <div>
                <Route
                  render={(props) => {
                    return (
                      <Template
                        open={open}
                        toggleDrawer={this.toggleDrawer}
                        title="Excel Chart"
                        navItems={menuItems}
                        {...props}
                      />
                    );
                  }}
                />

                <Route
                  exact
                  path="/"
                  render={(props) => {
                    return (
                      <Container open={open} mobile={isMobile()}>
                        <Home
                          {...props}
                        />
                      </Container>
                    );
                  }}
                />


              </div>
            </Route>
          </div>

        </Router>

      </MuiThemeProvider>
    );
  }
}

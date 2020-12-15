import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Listings } from "./sections";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/index.css";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/host" render={() => <div>Host</div>} />
        <Route exact path="/listing/:id" render={() => <div>Listing</div>} />
        <Route exact path="/listings/:location?" component={Listings} />
        <Route exact path="/user/:id" render={() => <div>User</div>} />
        <Route render={() => <div>Not Found</div>} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

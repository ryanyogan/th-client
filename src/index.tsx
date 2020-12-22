import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/index.css";
import { Login } from "./sections/LogIn";
import { Layout } from "antd";
import { Viewer } from "./lib/types";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  return (
    <Router>
      <Layout id="app">
        <Switch>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route exact path="/host" render={() => <div>Host</div>} />
          <Route exact path="/listing/:id" render={() => <div>Listing</div>} />
          <Route
            exact
            path="/listings/:location?"
            render={() => <div>Listings</div>}
          />
          <Route exact path="/user/:id" render={() => <div>User</div>} />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </Layout>
    </Router>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();

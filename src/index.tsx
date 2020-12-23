import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/index.css";
import { Login } from "./sections/LogIn";
import { Affix, Layout, Spin } from "antd";
import { Viewer } from "./lib/types";
import { AppHeader, User, Listing } from "./sections";
import {
  LogIn as LogInData,
  LogInVariables,
} from "./lib/graphql/mutations/LogIn/__generated__/LogIn";
import { LOG_IN } from "./lib/graphql/mutations/LogIn";
import { AppHeaderSkeleton, ErrorBanner } from "./lib/components";
import { Home } from "./sections/Home";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  headers: {
    "X-CSRF-TOKEN": sessionStorage.getItem("token") || "",
  },
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
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data?.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching Tinyhouse" />
        </div>
      </Layout>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We could not verify you are logged in.  Pleae try again." />
  ) : null;

  return (
    <Router>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route exact path="/host" render={() => <div>Host</div>} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route
            exact
            path="/listings/:location?"
            render={() => <div>Listings</div>}
          />
          <Route
            exact
            path="/user/:id"
            render={(props) => <User {...props} viewer={viewer} />}
          />
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

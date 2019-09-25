import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth, DashBoard } from "../containers";
import { Header } from "../components/home";
import "./index.scss";

const index = props => {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/admin" component={Auth} />
            <Route exact path="/admin/dashboard" component={DashBoard} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default index;

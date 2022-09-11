import CyberMovieHeader from "common/components/Header";
import SideBar from "common/components/SideBar";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Style from "app/App.module.css";
import { fetchUserInfoAction } from "features/authentication/action";
import { useDispatch } from "react-redux";
import { LogInRoute } from "./guard";

const MovieManagement = React.lazy(() =>
  import("features/main/pages/MovieManagement")
);
const UserManagement = React.lazy(() =>
  import("features/main/pages/UserManagement")
);
const SignIn = React.lazy(() => import("features/authentication/pages/SignIn"));
const Profile = React.lazy(() => import("features/user/pages/profile"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserInfoAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="container">
        <CyberMovieHeader />
        <div className={Style.main}>
          <SideBar />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <SignIn />
              </Route>

              <LogInRoute
                path="/movieManagement"
                component={MovieManagement}
                redirectPath="/"
              />

              <LogInRoute
                path="/userManagement"
                component={UserManagement}
                redirectPath="/"
              />

              <LogInRoute
                path="/profile"
                component={Profile}
                redirectPath="/"
              />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;

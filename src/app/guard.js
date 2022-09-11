import { Redirect, Route } from "react-router-dom";

const createRoute = (condition) => {
  return (props) => {
    const { path, component, redirectPath } = props;
    if (condition()) {
      return <Route path={path} component={component} />;
    } else {
      return <Redirect to={redirectPath} />;
    }
  };
};

const logIn = () => {
  if (!!localStorage.getItem("token")) {
    return true;
  }

  return false;
};

const notLogIn = () => {
  if (!!localStorage.getItem("token")) {
    return false;
  }

  return true;
};

export const LogInRoute = createRoute(logIn);
export const NotLogInRoute = createRoute(notLogIn);

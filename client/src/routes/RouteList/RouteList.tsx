import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";
import { Props } from "./types";
import { AppRoute } from "../types";
import ShipmentsManagement from "../../features/shipments/components/ShipmentsManagement";
import { ADMIN_HOME_PAGE, ASSIGNEE_HOME_PAGE, LOGIN_PAGE } from "../../utilities/constants";


const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { loggedIn }: any = useContext(AuthContext);
  return (
    <Route
      render={props =>
        loggedIn ? <Component {...props} /> : <Redirect to={LOGIN_PAGE} />
      }
      {...rest}
    />
  );
};

const RouteList = ({ routes }: Props) => (
  <React.Fragment>
    <Switch>
      {routes.map((route: AppRoute) => (
        <Route key={route.path} {...route} />
      ))}
      <ProtectedRoute path={ADMIN_HOME_PAGE} component={ShipmentsManagement} />
      <ProtectedRoute path={ASSIGNEE_HOME_PAGE} component={ShipmentsManagement} />
    </Switch>
  </React.Fragment>
);

export default RouteList;

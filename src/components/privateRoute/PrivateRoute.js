import React from "react";
import {Redirect, Route} from "react-router-dom";

function PrivateRoute({auth, children, ...rest}) {
    return (
      <Route{... rest} >
          {auth === true ? { children } : <Redirect to="/admin/login" />}
      </Route>
    );
}

export default PrivateRoute;
import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import Profile from "./containers/Profile";
import Settings from "./containers/Settings";
import ResetPassword from "./containers/ResetPassword";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import ChangePasswordSuccess from "./containers/ChangePasswordSuccess";
import ChangeEmailSuccess from "./containers/ChangeEmailSuccess";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/profile" exact component={Profile} props={childProps} />
    <AuthenticatedRoute path="/settings" exact component={Settings} props={childProps} />
    <AuthenticatedRoute path="/settings/password" exact component={ChangePassword} props={childProps} />
    <AuthenticatedRoute path="/settings/email" exact component={ChangeEmail} props={childProps} />
    <AuthenticatedRoute path="/settings/emailsuccess" exact component={ChangeEmailSuccess} props={childProps} />
    <AuthenticatedRoute path="/settings/passwordsuccess" exact component={ChangePasswordSuccess} props={childProps} />
    <UnauthenticatedRoute
	  path="/login/reset"
	  exact
	  component={ResetPassword}
	  props={childProps}
	/>
	
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

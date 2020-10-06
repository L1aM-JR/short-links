import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LinksPage } from "./pages/LinksPage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";
import { CreatePage } from "./pages/CreatePage";

export function useRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" component={LinksPage} exact />
        <Route path="/create" component={CreatePage} exact />
        <Route path="/detail/:id" component={DetailPage} />
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={AuthPage} exact />
      <Redirect to="/" />
    </Switch>
  );
}
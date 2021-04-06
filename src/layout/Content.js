import { Route, Switch } from "react-router";
import routes from "../routes";

const Content = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} component={route.Component} />
      ))}
    </Switch>
  );
};

export default Content;

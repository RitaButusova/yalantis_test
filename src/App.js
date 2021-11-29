import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import Employees from "./components/Employees";
//import { useRoutes } from 'hookrouter';
//import routes from "./routes";

/*function App() {
  const routeResult = useRoutes(routes);
  return routeResult;
}

export default App;
*/

export default function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/employees" component={Employees}></Route>
      </Switch>
    </HashRouter>
  );
}

// import "./App.css";
import { Route, Switch } from 'react-router';
import { Users, Login, Tasks } from "./pages/index";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/user" component={Users} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;

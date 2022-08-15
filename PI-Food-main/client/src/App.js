import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import  {Home}  from './components/Home';
import  LandingPage from './components/LandingPage';
import CreateRecipe from './components/CreateRecipe';
import DetailRecipe from './components/DetailRecipe';

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        {/* <h1>Henry Food's</h1> */}
        <Switch>
          <Route exact path={"/"} component={LandingPage}/>
          <Route path='/home/:id' render={(match)=><DetailRecipe match={match}/>} />
          <Route exact path="/home" component={Home}/>
          <Route exact path="/recipes" component={CreateRecipe}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

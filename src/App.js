import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import  Login  from './Components/Login';
import SignUp from './Components/SignUp';
import "react-toastify/dist/ReactToastify.css";
import Products from './Components/Products';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Router>
     <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      <ToastContainer />
    </Router>

    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import '../assets/App.scss';
import NavAdmin from "../components/NavAdmin";
import Login from './Login';

function App() {
  const [accessToken,setAccessToken] = React.useState(()=>{
    const initToken = localStorage.getItem("accessToken") || null;
    return initToken;
  });


  const handleLogin = (token) =>{
      setAccessToken(token);
      localStorage.setItem("accessToken",token);
  }
  return (
    <BrowserRouter>

      <div className="App">
          {accessToken ? <NavAdmin /> : <Login handleLogin={handleLogin} /> }
      </div>
    </BrowserRouter>
  );
}

export default App;

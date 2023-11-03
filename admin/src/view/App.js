import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import '../assets/App.scss';
import NavAdmin from "../components/NavAdmin";
import Login from './Login';
import { AuthContext } from "../Context/AuthContext.jsx";
function App() {
  const [accessToken, setAccessToken] = React.useState(() => {
    const initToken = localStorage.getItem("accessToken") || null;
    return initToken;
  });

  const handleLogin = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  }
  const handleLogout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  }
  return (
    <AuthContext.Provider value={{ accessToken, handleLogin,handleLogout }}>
    <BrowserRouter>
      <div className="App">
          {accessToken ? <NavAdmin /> : <Login/> }
      </div>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

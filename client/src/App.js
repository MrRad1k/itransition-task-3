import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/authHooks'


function App() {
  const { login, logout, token, userId, isReady } = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)
  console.log(routes)

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          {routes}
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
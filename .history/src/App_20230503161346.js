import * as React from 'react';
import Login from "./auth/Login";
import Register from "./auth/Register";
import weatherdata from './pages/Weatherdata';
import Home from './pages/Home';
import { auth } from './fire';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  
  const [user, setUser] = React.useState(null);
  const [authState, setAuthState] = React.useState('login');

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth,
      async authenticatedUser => {
        if(authenticatedUser) {
          setUser(authenticatedUser.email)
          setAuthState('Weatherdata');
        } else {
          setUser(null);
          setAuthState('login');
        }
      })

      return unSubscribeAuth;
  }, [user]);

  if(authState === null) return <div className='font-bold text-center text-5xl'>loading...</div>
  if(authState === 'login') return <Login setAuthState={setAuthState} setUser={setUser}/>
  if(authState === 'register') return <Register setAuthState={setAuthState} setUser={setUser}/> 
  if(user) return <weatherdata user={user} setAuthState={setAuthState} setUser={setUser}/>
}

export default App;
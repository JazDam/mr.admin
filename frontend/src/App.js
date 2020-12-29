import React, { useState } from 'react';
import Navigation from './components/Navigation';
import OperationList from './components/OperationsList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {

  const [usuario, setUsuario] = useState(null);
  const [filters, setFilters] = useState(
    {
      category: '',
      type: ''
    }
  )

  const onLoginSuccess = (loggedUser) => {
    setUsuario(loggedUser);
  }

  const onLogout = () => {
    let url = 'http://localhost:8888/auth';
    fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => response.json()
    ).then(data => {
      setUsuario(null);
    })
  }

  const handleFilterChange = filters => {
    setFilters(filters)
  }

  return (
    <Router>
      <Navigation user={usuario}
        handleLoginSuccess={onLoginSuccess}
        handleLogout={onLogout} />
      <Switch>
        {usuario &&
        <Route exact path="/" children={
              
              <OperationList type="misoperaciones"
                  user={usuario}
                  filters={filters}
                  onFilterChange={handleFilterChange}/>
        }>
        </Route>
        }
        <h1>Inicia sesión, si no tenés cuenta registrate =)</h1>

        <Redirect to={{ pathname: '/' }} />
      </Switch>
    </Router>
  );
}

export default App;

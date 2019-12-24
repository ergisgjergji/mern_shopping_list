import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'reactstrap';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Container>
            <ItemModal/>
            <ShoppingList/>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

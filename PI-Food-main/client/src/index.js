import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from './store';


ReactDOM.render( 
  <Provider store={store}>  
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>, //El provider simpre tiene que encerrar nuestro archivo app para darle las funcionalidades de REDUX
  //Entonces de esta manera es posible conectar la tienda redux a nuestra aplicacion react y darle funcionalidades como por ej: Hooks, connect y demás
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

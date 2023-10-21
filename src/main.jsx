
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from './store.js';
import {positions,transitions,Provider as AlertProvider}from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

export const server="https://ecommerce-backend-ua5q.onrender.com"

const options={
  timeout: 5000,
  position:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  
<AlertProvider template={AlertTemplate} {...options}>

    <App />
</AlertProvider>

  </Provider>
)

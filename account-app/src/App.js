import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from './components/List';
import Form from './components/Form';
import './App.scss';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios
      .get('http://localhost:8000/accounts')
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  
  console.log(data);

  return (
    <div className="App">
      <h1>Account Data</h1>
      <List list={data} />
      <Form />
    </div>
  );
}

export default App;

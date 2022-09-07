// import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import Content from './content';
import { Sidebar } from './sidebar';

function App() {
  useEffect(() => {
    const fragment = window.location.hash.substr(1);
    try{
      document.getElementById(fragment + "-link").click();
    } catch(err){}
    
  }, []);

  return (
    <div className="">

      <div className="wrapper">
        <Sidebar />
        <Content />
      </div>

    </div>
  );
}

export default App ;



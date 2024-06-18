import logo from './logo.svg';
import './App.css';
import ProjectNavbar from './Projectnavbar/Projectnavbar';
import AlignmentExample from './Projectnavbar/Projectnavbar';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Navigation from './navigation/navigation';
import ProjectFooter from './footer/ProjectFooter';
import RecipientsForm from './Forms/ReciepentsForm';



function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <ProjectNavbar/> */}
      <Navigation/>
      {/* <ProjectFooter/> */}
      {/* <RecipientsForm/> */}
      
     
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import UploadSVG from './UploadSVG';

function App() {
  return (
    <div className="App">
      <main className="App-header">

        <UploadSVG />

        <div>Parse svg file</div>

        <div>Form for edit/create svg file</div>

      </main>
    </div>
  );
}

export default App;

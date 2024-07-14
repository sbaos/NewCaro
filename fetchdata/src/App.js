import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState} from 'react';
import A from './A.tsx';
import MultiFileUploader from './fileupload.tsx';
function App() {

  return (
  <div style={{display: 'flex'} }>
    <A></A>
{/* <MultiFileUploader></MultiFileUploader> */}
  </div>
    
  );
}

export default App;

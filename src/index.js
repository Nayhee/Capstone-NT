import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Capstone } from "./components/Capstone"
import './index.css';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
      <Router>
        <Capstone/>
      </Router>
    </StrictMode>
);
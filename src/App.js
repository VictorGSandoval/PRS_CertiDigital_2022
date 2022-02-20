import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Institute from "./pages/Institute";
import Student from "./pages/Student";
import Career from "./pages/Career";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
      <div className="row mt-4 container">
        <Router>
          <Route exact path="/" component={Student} />
          <Route exact path="/institute" component={Institute} />
          <Route exact path="/career" component={Career} />
        </Router>
      </div>
      </div>
    </div>
  );
}

export default App;

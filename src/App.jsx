import React from "react";
import UserListPage from "./Components/UserListPage/UserListPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDetailsPage from "./Components/UserDetailsPage/UserDetailsPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserListPage />}></Route>
          <Route path="/userDetails" element={<UserDetailsPage />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

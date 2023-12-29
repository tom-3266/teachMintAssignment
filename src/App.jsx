import React from "react";
import UserListPage from "./Components/UserListPage/UserListPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserListPage />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

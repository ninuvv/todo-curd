import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import AddEditToDo from "./pages/AddEditToDo";

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route  path="/add" element={<AddEditToDo />} />
          <Route  path="/edit/:id" element={<AddEditToDo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

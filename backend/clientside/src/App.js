import "./App.css"
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NewNote from "./Pages/NewNote";
import RequireAuth from "./Redux/Auth/RequireAuth";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Notes from "./Pages/Notes";

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/register/*" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/newnote" element={<NewNote />} />
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

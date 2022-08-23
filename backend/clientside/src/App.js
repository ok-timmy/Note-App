import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

function App() {
  const [user, setUser] = useState({});
  // window.location.reload();
  useEffect(() => {
    const thisUser = localStorage.getItem('user');
    const thisVeryUser = JSON.parse(thisUser);
    setUser(thisVeryUser)
  }, [])
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header  prop={user}/>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

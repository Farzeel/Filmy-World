import Card from "./components/Card";
import Header from "./components/Header";
import { Route,Routes } from 'react-router-dom'
import Addmovie from "./components/Addmovie";
import Details from "./components/Details";
import { createContext,useState } from "react"; 
import Login from "./components/Login";
import Signup from "./components/Signup";

const Appstate = createContext()

function App() {
const [login, setlogin] = useState(false);
const [userName, setUserName] = useState("");
  return (
    <Appstate.Provider value={{login,userName,setlogin,setUserName}}>
    <div className="App">
     <Header/>
     <Routes>
     <Route path="/" element={<Card/>}></Route>
     <Route path="/addmovie" element={<Addmovie/>}></Route>
     <Route path="/detail/:id" element={<Details/>}></Route>
     <Route path="/login" element={<Login/>}></Route>
     <Route path="/signup" element={<Signup/>}></Route>
     </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export{Appstate}

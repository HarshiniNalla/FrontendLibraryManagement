import SearchAppBar from './navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Home ';
import AvailableBooks from './Availablebooks';
import NewBook from './NewBook';
import MyBooks from './MyBook';
function App() {
  return (
    <Router>
     <SearchAppBar />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/availableBooks" element={<AvailableBooks />}/>
      <Route path="/newBook" element={<NewBook/>}></Route>
      <Route path="/myBooks" element={<MyBooks/>}></Route>
     
    </Routes>
  </Router>
  );
}

export default App;

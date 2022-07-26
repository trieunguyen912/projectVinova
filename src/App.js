import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './components/users';
import Post from './components/post'; 
import DefaultLayout from './layouts/defaultLayout';
import Home from './components/home';
import Category from './components/category';
import Reward from './components/reward';
import Settings from './components/settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element={<DefaultLayout><Home/></DefaultLayout>}></Route>
        <Route path = '/users' element={<DefaultLayout><Users/></DefaultLayout>}></Route>
        <Route path = '/post' element={<DefaultLayout><Post/></DefaultLayout>}></Route>
        <Route path = '/category' element={<DefaultLayout><Category/></DefaultLayout>}></Route>
        <Route path = '/reward' element={<DefaultLayout><Reward/></DefaultLayout>}></Route>
        <Route path = '/settings' element={<DefaultLayout><Settings/></DefaultLayout>}></Route>
      </Routes>
    </Router>
  );
}

export default App;

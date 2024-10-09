import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MotorcycleList from './components/MotocycleList';
import SlideShow from './components/SlideShow';
import Header from './components/Nav';
import Admin from './pages/admin/Admin';
import Footer from './components/Footer';
import About from './pages/About/AboutPage';
import Contact from './pages/Contact/ContactPage';
import DesignBy from './components/DesignBy/DesignBy'

//import HomePage from './pages/HomePage'

const App = () => {
  return (
<Router>
  <Header/>
  <Routes>
    <Route path='/' element={
      <>
      <SlideShow/>
      <MotorcycleList/>
      </>
      } />
  <Route path='/moto2go/admin' element={<Admin/>} />
  <Route path='/about' element={<About/>} />
  <Route path='/contact' element={<Contact/>} />

  </Routes>
  <Footer/>
  <DesignBy/>
</Router>

  );
};

export default App;

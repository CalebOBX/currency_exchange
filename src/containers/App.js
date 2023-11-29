import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConversionList from './ConversionList';
import Layout from './Layout';
import ConversionSwapper from './ConversionSwapper'
import '../css/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ConversionList />} />
          <Route path='/conversion-swapper' element={<ConversionSwapper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

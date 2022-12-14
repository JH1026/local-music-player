import { ThemeProvider } from '@mui/material';
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import CommonLayout from './layouts/CommonLayout';
import Home from './pages/home/Home';
import InputMusic from './pages/input-music/InputMusic';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommonLayout />}>
            <Route index element={<Home />} />
            <Route path="input" element={<InputMusic />} />
            <Route path="contact" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

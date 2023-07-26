import React, {Suspense} from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './../pages/MainPage';

export const AppRouter: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/page/:page2" element={<MainPage/>}/>
        <Route path="/page/:page3" element={<MainPage/>}/>
        <Route path="/page/:page4" element={<MainPage/>}/>
        <Route path="/page/:page5" element={<MainPage/>}/>
      </Routes>
    </Suspense>
  )
}

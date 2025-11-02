import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './routes/AdminLayout'
import Layout from './routes/Layout'
import NoPage from "./pages/NoPage"
const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index path='/*' element={<Layout />} />
                <Route path='/admin/*' element={<AdminLayout />} />
                <Route path="/admin/*/*" element={<NoPage />}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App
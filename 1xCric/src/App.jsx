import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home"
import About from "./Pages/About"
import Schedule from "./Pages/Schedule"
import Categories from "./Pages/Categories"
import CategoryPage from "./Pages/CategoryPage"
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Tabbar from './Components/Tabbar';
import navigationData from "./Components/navigations";
import NewsPage from './Pages/NewsPage';
import LatestNews from './Pages/LatestNews';
import AdminPanel from './Pages/AdminPanel';
import NewsEditPage from './Pages/NewsEditPage';
import AdminDashboard from './Pages/AdminDashboard';
import AdminSettings from './Pages/AdminSettings';
import AdminCategories from './Pages/AdminCategories';
import AdminPublished from './Pages/AdminPublished';
import Login from './Pages/Login';
import PrivateRoute from './Components/PrivateRoute';
import AdminAddUser from './Pages/AdminAddUser';
import AdminUsersPage from './Pages/AdminUsersPage';
import AdminEditUserPage from './Pages/AdminEditUserPage';
import AdminAddNewsPage from './Pages/AdminAddNewsPage';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/Admin');
  return (
    <div>
      <div className=''><Navbar/></div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/News/:id' element={<NewsPage/>}/>
        <Route path='/LatestNews' element={<LatestNews/>}/>
        <Route path='/Categories' element={<Categories/>}/>
        <Route path='/Category/:category' element={<CategoryPage/>}/>
        <Route path='/News' element={<Categories/>}/>
        <Route path='/Schedule' element={<Schedule/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Admin/AddNews" element={<AdminAddNewsPage/>}/>
        <Route path="/Admin" element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        } />
        <Route path="/Admin/edit/:id" element={
          <PrivateRoute>
            <NewsEditPage />
          </PrivateRoute>
        } />
        <Route path="/Admin/Users/edit/:id" element={
          <PrivateRoute>
            <AdminEditUserPage />
          </PrivateRoute>
        } />
        <Route path="/Admin/Users" element={
          <PrivateRoute>
            <AdminUsersPage/>
          </PrivateRoute>
        } />
        <Route path="/Admin/Dashboard" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/Admin/Published" element={
          <PrivateRoute>
            <AdminPublished />
          </PrivateRoute>
        } />
        <Route path="/Admin/Settings" element={
          <PrivateRoute>
            <AdminSettings />
          </PrivateRoute>
        } />
        <Route path="/Admin/Categories" element={
          <PrivateRoute>
            <AdminCategories />
          </PrivateRoute>
        } />
        <Route path="/Admin/AddUser" element={
          <PrivateRoute adminOnly={true}>
            <AdminAddUser />
          </PrivateRoute>
        } />
      </Routes>
      <Tabbar navigationData={navigationData}/>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App
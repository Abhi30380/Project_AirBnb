import './App.css'
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/indexpage"
import LoginPage from './pages/loginpage';
import Layout from './layout';
import RegisterPage from './pages/registerpage';
import axios from 'axios';
import { UserContextProvider } from './usercontext';
import ProfilePage from './pages/profilePage';
import PlacesPage from './pages/placespage';
import PlacesFormPage from './pages/placesFormPage'
import PlacePage from './pages/placePage';
import BookingsPage from './pages/bookingsPage';
import BookingPage from './pages/bookingpage';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage/>}/>
          <Route path='/account/places' element={<PlacesPage/>}/>
          <Route path='/account/places/new' element={<PlacesFormPage/>}/>
          <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
          <Route path='/place/:id' element={<PlacePage/>}/>
          <Route path='/account/booking' element={<BookingsPage/>}/>
          <Route path='/account/booking/:id' element={<BookingPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>  
  )
}

export default App

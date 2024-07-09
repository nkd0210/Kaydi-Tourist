import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ProfilePage from './pages/ProfilePage'
import CreatePlace from './pages/CreatePlace'
import ListingDetail from './pages/ListingDetail'
import Trip from './pages/TripList'
import WishList from './pages/WishList'
import PropertyList from './pages/PropertyList'
import ReservationList from './pages/ReservationList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/createPlace' element={<CreatePlace />} />
        <Route path='/detailplace/:listingId' element={<ListingDetail />} />
        <Route path='/trip/:userId' element={<Trip />} />
        <Route path='/wishlist/:userId' element={<WishList />} />
        <Route path='/propertylist/:userId' element={<PropertyList />} />
        <Route path='/reservationlist/:userId' element={<ReservationList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

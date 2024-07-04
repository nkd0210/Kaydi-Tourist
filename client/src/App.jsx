import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ProfilePage from './pages/ProfilePage'
import CreatePlace from './pages/CreatePlace'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/createPlace' element={<CreatePlace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signinpage from './Pages/Signinpage'
import Loginpage from './Pages/Loginpage'
import {Toaster} from 'react-hot-toast'
import Dashboard from './components/Dashboard'
import Protectedroute from './Protectedroute/protectedroute'



function App() {

  return (
    <>
    <Toaster/>
    <Navbar></Navbar>
      <Routes>
        <Route path='/signup' element={<Signinpage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/dashboard' element={
          <Protectedroute>
          <Dashboard/>
          </Protectedroute>
          }/>
      </Routes>
    </>
  )
}

export default App

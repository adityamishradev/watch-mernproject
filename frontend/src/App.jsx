
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Mainroutes from './routes/Mainroutes'

const App = () => {
  const location = useLocation();
  
  // Hide navbar and footer on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div>
      {!isAdminPage && <Navbar/>}
      <Mainroutes/>
      {!isAdminPage && <Footer/>}
    </div>
  )
}

export default App
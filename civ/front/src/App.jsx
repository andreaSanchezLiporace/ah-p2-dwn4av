import { Outlet } from "react-router-dom"
import { SessionProvider } from './contexts/session.context'
import Header from './components/Header'
import Footer from './components/Footer'

function App(){
  return (
    <SessionProvider>
      <Header />
      <Outlet />
      <Footer />
    </SessionProvider>
  )
}

export default App;
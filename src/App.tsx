import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import NavBar from "./components/navbar/NavBar"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Cadastro from "./pages/cadastro/Cadastro"
import { AuthProvider } from "./contexts/AuthContext"



function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <div className="min-h-[80vh]">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
            </Routes>

          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App

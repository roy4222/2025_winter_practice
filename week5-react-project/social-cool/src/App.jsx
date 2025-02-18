import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Profile from './components/Profile'
import About from './components/About'
import ProductShowcase from './components/ProductShowcase'
import CustomProduct from './components/CustomProduct'
import SaleEvent from './components/SaleEvent'
import { DarkModeProvider } from './context/DarkModeContext'

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/showcase" element={<ProductShowcase />} />
              <Route path="/custom" element={<CustomProduct />} />
              <Route path="/sale" element={<SaleEvent />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DarkModeProvider>
  )
}

export default App

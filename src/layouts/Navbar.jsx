import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import { useState } from 'react'; 
import useAuthContext from '../hooks/useAuthContext'; 

import bloodDropLogo from '../assets/images/blooddrop.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  
  const { user, logoutUser } = useAuthContext(); 
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-red-600 font-bold text-xl">
              <img 
                src={bloodDropLogo} 
                alt="BloodLink Logo" 
                className="h-8 w-8 mr-2 object-contain drop-shadow-sm" 
              />
              Bondhon 
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/add-request" className="text-gray-700 hover:text-red-600 transition">Find Blood</Link>
            <Link to="/requests" className="text-gray-700 hover:text-red-600 transition">Donate Now</Link>
            <Link to="/fundraising" className="text-gray-700 hover:text-red-600 transition font-medium">Fundraising</Link>
            <Link to="/about" className="text-gray-700 hover:text-red-600 transition">About</Link>
            
            {user ? (
               <div className="flex items-center space-x-4">
                 <Link to="/dashboard" className="text-gray-700 font-medium hover:text-red-600 transition">
                   Dashboard
                 </Link>
                 
                 {/* Admin Panel Link - Desktop */}
                 {(user?.is_staff || user?.is_superuser) && (
                   <Link to="/admin" className="text-blue-600 font-bold hover:text-blue-800 transition">
                     Admin Panel
                   </Link>
                 )}

                 <button 
                   onClick={handleLogout}
                   className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 shadow-sm transition font-medium"
                 >
                   Logout
                 </button>
               </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-red-600 px-3 py-2 font-medium">Login</Link>
                <Link to="/register" className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 shadow-sm font-medium transition">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Transition */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2 shadow-inner">
          <Link 
            to="/add-request" 
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-md font-medium"
          >
            Find Blood
          </Link>
          <Link 
            to="/requests" 
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-md font-medium"
          >
            Donate Now
          </Link>
          <Link 
            to="/fundraising" 
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-md font-medium"
          >
            Fundraising
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-md font-medium"
          >
            About
          </Link>
          
          <div className="pt-4 border-t border-gray-100">
            {user ? (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="block bg-red-600 text-white text-center px-4 py-2 rounded-md font-medium"
                >
                  Dashboard
                </Link>

                {/* Admin Panel Link - Mobile */}
                {(user?.is_staff || user?.is_superuser) && (
                   <Link 
                     to="/admin" 
                     onClick={() => setIsOpen(false)}
                     className="block bg-blue-600 text-white text-center px-4 py-2 rounded-md font-medium"
                   >
                     Admin Panel
                   </Link>
                )}

                <button 
                  onClick={handleLogout}
                  className="block w-full bg-red-50 text-red-600 text-center px-4 py-2 rounded-md font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-gray-700 hover:text-red-600 px-3 py-2 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsOpen(false)}
                  className="block bg-red-600 text-white text-center px-4 py-2 rounded-md font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
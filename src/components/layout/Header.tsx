import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, PenTool as Tool, MessageSquare, Home } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-emerald-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Tool className="h-6 w-6" />
            <span>FixHub</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" icon={<Home className="h-5 w-5" />} text="Home" />
            <NavLink to="/repairers" icon={<Tool className="h-5 w-5" />} text="Find Repairers" />
            <NavLink to="/requests" icon={<MessageSquare className="h-5 w-5" />} text="Repair Requests" />
            <NavLink to="/repairers/add" text="Offer Repair Skills" className="bg-amber-600 hover:bg-amber-700" />
            <NavLink to="/requests/add" text="Request a Repair" className="bg-rose-600 hover:bg-rose-700" />
            
            {/* Added Login and SignUp links */}
            <NavLink to="/login" text="Login" />
            <NavLink to="/signup" text="Sign Up" />
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              <MobileNavLink to="/" icon={<Home className="h-5 w-5" />} text="Home" />
              <MobileNavLink to="/repairers" icon={<Tool className="h-5 w-5" />} text="Find Repairers" />
              <MobileNavLink to="/requests" icon={<MessageSquare className="h-5 w-5" />} text="Repair Requests" />
              <MobileNavLink to="/repairers/add" text="Offer Repair Skills" className="bg-amber-600" />
              <MobileNavLink to="/requests/add" text="Request a Repair" className="bg-rose-600" />
              
              {/* Added Mobile Login and SignUp links */}
              <MobileNavLink to="/login" text="Login" />
              <MobileNavLink to="/signup" text="Sign Up" />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, text, icon, className }) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${className || 'hover:bg-emerald-700'}`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ to, text, icon, className }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md ${className || 'hover:bg-emerald-700'}`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Header;

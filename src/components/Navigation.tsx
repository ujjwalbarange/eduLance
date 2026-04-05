import React from 'react';
import { Search, User as UserIcon, Menu, X, Globe, Code, Database, Terminal, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSellerMode, setIsSellerMode] = React.useState(false);

  const toggleSellerMode = () => {
    setIsSellerMode(!isSellerMode);
    if (!isSellerMode) {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">EduLance</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                placeholder="What software project do you need help with?"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Become a Seller</span>
              <button
                onClick={toggleSellerMode}
                className={cn(
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  isSellerMode ? "bg-green-500" : "bg-gray-200"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    isSellerMode ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">Sign In</Link>
            <Link
              to="/join"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              Join
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              placeholder="Search software projects..."
            />
          </div>
          <div className="flex flex-col space-y-4">
            <Link to="/login" className="text-base font-medium text-gray-700">Sign In</Link>
            <Link to="/join" className="text-base font-medium text-blue-600">Join EduLance</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  const categories = [
    { name: 'Web Dev', icon: Globe, links: ['React', 'Next.js', 'Node.js', 'PHP'] },
    { name: 'App Dev', icon: Terminal, links: ['Android', 'iOS', 'Flutter', 'React Native'] },
    { name: 'Data Science', icon: Database, links: ['Python', 'Machine Learning', 'R', 'Excel'] },
    { name: 'Scripting', icon: Code, links: ['Bash', 'PowerShell', 'Automation', 'Web Scraping'] },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h3 className="flex items-center text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.name}
              </h3>
              <ul className="space-y-2">
                {cat.links.map((link) => (
                  <li key={link}>
                    <Link to={`/search?q=${link}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Code className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold">EduLance</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EduLance. Built for students, by experts.
          </p>
        </div>
      </div>
    </footer>
  );
};

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/Hota Creatives logo final (1).png";

const navLinks = [
  { name: "Home", path: "/" },
  // { name: "Packages", path: "/packages" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="HOTA Creative Growth Agency"
              className="h-36 w-36 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 hover:text-accent ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-text-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/free-audit"
              className="bg-accent hover:bg-accent-hover text-black font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
            >
              Free Audit
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-bg-secondary border-b border-border animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium transition-colors duration-300 hover:text-accent ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-text-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/free-audit"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-accent hover:bg-accent-hover text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-300"
            >
              Free Audit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

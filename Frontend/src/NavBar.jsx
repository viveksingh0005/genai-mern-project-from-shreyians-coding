import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 cursor-pointer">
          🚀 Brand
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {['Home', 'Explore', 'Services', 'About', 'Contact'].map((item) => (
            <li key={item} className="relative group cursor-pointer">
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">

          <NavLink to="/login">
            <button className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition">
              Login
            </button>
          </NavLink>
          <NavLink to="/signup">
            <button className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition">
              Signup
            </button>
          </NavLink>

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          {['Home', 'Explore', 'Services', 'About', 'Contact'].map((item) => (
            <div key={item} className="text-gray-700 font-medium cursor-pointer hover:text-black transition">
              {item}
            </div>
          ))}

          <div className="flex items-center gap-4 pt-4 border-t">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User size={20} />
            </button>
          </div>

          <button className="w-full mt-3 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}

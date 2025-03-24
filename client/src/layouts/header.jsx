import profileImg from "@/assets/profile-image.jpg";
import { useTheme } from "@/hooks/use-theme";
import { Bell, ChevronsLeft, Moon, Sun } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Store user details
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from local storage (or API if needed)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token/session
    localStorage.removeItem("user"); // Clear user details
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
      {/* Sidebar Toggle */}
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-x-3">
        {/* Theme Toggle */}
        <button
          className="btn-ghost size-10"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun size={20} className="dark:hidden" />
          <Moon size={20} className="hidden dark:block" />
        </button>

        {/* Notifications */}
        <button className="btn-ghost size-10">
          <Bell size={20} />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="size-10 overflow-hidden rounded-full focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={profileImg}
              alt="profile image"
              className="size-full object-cover"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md py-2 dark:bg-slate-800 dark:text-white">
              {user ? (
                <Link
                  to={
                    user.role === "landlord"
                      ? "/landlord/profile"
                      : "/tenant/profile"
                  }
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
              ) : (
                <p className="block px-4 py-2 text-gray-500">Loading...</p>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};

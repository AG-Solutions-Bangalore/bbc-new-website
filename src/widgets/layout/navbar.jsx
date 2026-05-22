import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ routes, action }) {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateNavbar = () => {
      setScrolled(window.scrollY > 100);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    updateNavbar();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && openNav) {
        setOpenNav(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape' && openNav) {
        setOpenNav(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    // Lock body scroll when menu is open
    if (openNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [openNav]);

  // Close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navList = (
    <ul className="mb-0 mt-0 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        <li
          key={name}
          className="capitalize p-0"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 py-1 px-2 font-medium text-md hover:bg-black/5 rounded transition-colors"
              onClick={() => setOpenNav(false)}
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-4 h-4 opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 py-1 px-2 font-medium text-md hover:bg-black/5 rounded transition-colors"
              onClick={() => setOpenNav(false)}
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-4 h-4 opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  // Mobile navigation list with animations
  const mobileNavList = (
    <div className="flex flex-col space-y-6">
      {routes.map(({ name, path, icon, href, target }, index) => (
        <div
          key={name}
          className={`transition-all duration-300 ${
            openNav ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
          }`}
          style={{ transitionDelay: openNav ? `${100 + index * 100}ms` : "0ms" }}
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center text-xl font-medium text-white hover:text-pink-200 transition-colors"
              onClick={() => setOpenNav(false)}
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-6 h-6 mr-3",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center text-xl font-medium text-white hover:text-pink-200 transition-colors"
              onClick={() => setOpenNav(false)}
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-6 h-6 mr-3",
                })}
              {name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div
        className="fixed top-0 z-50"
        style={{
          width: "100%",
          left: scrolled ? "0%" : "50%",
          transform: scrolled ? "translateX(0%)" : "translateX(-50%)",
        }}
        ref={navRef}
      >
        <div
          style={{
            backgroundColor: scrolled
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(255, 255, 255, 0.7)",
            borderRadius: "0rem",
            boxShadow: scrolled
              ? "0 2px 8px rgba(0,0,0,0.1)"
              : "0 4px 12px rgba(0,0,0,0.05)",
            height: scrolled ? "4rem" : "4.5rem",
          }}
          className="transition-all duration-300 ease-in-out backdrop-blur-sm"
        >
          <div className="px-3 h-full">
            <div className="container mx-auto flex items-center justify-between h-full">
              <Link to="/" aria-label="Business Boosters home">
                <div className="flex items-center py-1 px-2">
                  <img
                    src="https://businessboosters.club/static/media/logo.b092c9f492105e973cc3.png"
                    alt="Business Boosters Logo"
                    width="196"
                    height="48"
                    decoding="async"
                    className=" h-12 w-auto "
                  />
                </div>
              </Link>
              <div className="hidden lg:block">{navList}</div>
              <div className="hidden gap-1 lg:flex items-center">
                <Link to='/register'>
                  <button
                    type="button"
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20 py-1.5 px-3 text-sm text-[#A51B64]"
                  >
                    Join Us
                  </button>
                </Link>
                <a
                  href="https://businessboosters.club/login"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button
                    type="button"
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20 py-1.5 px-3 text-sm text-[#A51B64]"
                  >
                    Login
                  </button>
                </a>
              </div>
              <button
                type="button"
                aria-label={openNav ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={openNav}
                className="ml-auto lg:hidden h-8 w-8 flex items-center justify-center z-50 relative rounded-lg align-middle select-none font-sans font-medium text-center uppercase transition-all hover:bg-gray-900/10 active:bg-gray-900/20"
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <XMarkIcon strokeWidth={2} className="h-5 w-5 text-black" />
                ) : (
                  <Bars3Icon strokeWidth={2} className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-page mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          openNav ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
            {/* Background gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-[#A51B64] to-[#4A064D] transition-opacity duration-300 ${
                openNav ? "opacity-[0.98]" : "opacity-0"
              }`}
            />

            {/* Content container */}
            <div className="relative h-full w-full flex flex-col p-6 overflow-y-auto">
              {/* Logo */}

              {/* Divider */}
              <div
                className={`h-1 bg-pink-300 rounded mx-auto mb-10 transition-all duration-500 ${
                  openNav ? "w-16" : "w-0"
                }`}
                style={{ transitionDelay: openNav ? "300ms" : "0ms" }}
              />

              {/* Navigation items */}
              <div className="flex-1 flex flex-col items-center justify-center">
                {mobileNavList}
              </div>

              {/* Action buttons */}
              <div
                className={`mt-8 mb-12 space-y-4 transition-all duration-500 ${
                  openNav ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
                style={{
                  transitionDelay: openNav ? `${400 + routes.length * 100}ms` : "0ms",
                }}
              >
                <Link to='/register' className="block">
                  <button
                    type="button"
                    onClick={() => setOpenNav(false)}
                    className="w-full rounded-lg py-3 px-7 text-base bg-white text-[#A51B64] hover:bg-pink-50 transition-colors align-middle select-none font-sans font-bold text-center uppercase"
                  >
                    Join Us
                  </button>
                </Link>
                <a
                  href="https://businessboosters.club/login"
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <button
                    type="button"
                    onClick={() => setOpenNav(false)}
                    className="w-full rounded-lg py-3 px-7 text-base border border-white text-white hover:bg-white/10 transition-colors align-middle select-none font-sans font-bold text-center uppercase"
                  >
                    Login
                  </button>
                </a>
              </div>

              {/* Social links or other footer info could go here */}
              <div
                className={`text-center text-white/80 text-sm transition-opacity duration-500 ${
                  openNav ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: openNav ? `${600 + routes.length * 100}ms` : "0ms",
                }}
              >
                Connect with Business Boosters
              </div>
            </div>
      </div>
    </>
  );
}

Navbar.defaultProps = {
  routes: [],
  action: null,
};

Navbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;






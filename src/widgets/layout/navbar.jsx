import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export function Navbar({ routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);
  const { scrollY } = useScroll();
  const navRef = useRef(null);
  
  const width = useTransform(scrollY, [0, 100], ["100%", "100%"]);
  const left = useTransform(scrollY, [0, 100], ["50%", "0%"]);
  const translateX = useTransform(scrollY, [0, 100], ["-50%", "0%"]);
  const navbarHeight = useTransform(scrollY, [0, 100], ["4.5rem", "4rem"]);
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.95)"]
  );
  const boxShadow = useTransform(
    scrollY, 
    [0, 100], 
    ["0 4px 12px rgba(0,0,0,0.05)", "0 2px 8px rgba(0,0,0,0.1)"]
  );
  const borderRadius = useTransform(scrollY, [0, 100], ["0rem", "0rem"]);
  
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
        <Typography
          key={name}
          as="li"
          variant="small"
          color="black"
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
        </Typography>
      ))}
    </ul>
  );

  // Mobile navigation list with animations
  const mobileNavList = (
    <div className="flex flex-col space-y-6">
      {routes.map(({ name, path, icon, href, target }, index) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
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
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      <motion.div
        className="fixed top-0 z-50"
        style={{
          width,
          left,
          translateX,
        }}
        ref={navRef}
      >
        <motion.div
          style={{
            backgroundColor,
            borderRadius,
            boxShadow,
            height: navbarHeight,
          }}
          className="transition-all duration-300 ease-in-out backdrop-blur-sm"
        >
          <div className="px-3 h-full">
            <div className="container mx-auto flex items-center justify-between h-full">
              <Link to="/">
                <div className="flex items-center py-1 px-2">
                  <img 
                    src="https://businessboosters.club/static/media/logo.b092c9f492105e973cc3.png" 
                    alt="Business Boosters Logo" 
                    className=" h-12 w-auto "
                  />
                </div>
              </Link>
              <div className="hidden lg:block">{navList}</div>
              <div className="hidden gap-1 lg:flex items-center">
                <Link to='/register'>
                  <Button variant="text" className="py-1.5 px-3 text-sm text-[#A51B64]">
                    Join Us
                  </Button>
                </Link>
                <a
                  href="https://businessboosters.club/login/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="text" className="py-1.5 px-3 text-sm text-[#A51B64]">
                    Login
                  </Button>
                </a>
              </div>
              <IconButton
                variant="text"
                size="sm"
                className="ml-auto lg:hidden h-8 w-8 flex items-center justify-center z-50 relative"
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <XMarkIcon strokeWidth={2} className="h-5 w-5 text-black" />
                ) : (
                  <Bars3Icon strokeWidth={2} className="h-5 w-5" />
                )}
              </IconButton>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Full-page mobile menu overlay */}
      <AnimatePresence>
        {openNav && (
          <motion.div 
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#A51B64] to-[#4A064D]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.98 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Content container */}
            <div className="relative h-full w-full flex flex-col p-6 overflow-y-auto">
              {/* Logo */}
             
              {/* Divider */}
              <motion.div 
                className="w-16 h-1 bg-pink-300 rounded mx-auto mb-10"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              
              {/* Navigation items */}
              <div className="flex-1 flex flex-col items-center justify-center">
                {mobileNavList}
              </div>
              
              {/* Action buttons */}
              <motion.div 
                className="mt-8 mb-12 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + routes.length * 0.1, duration: 0.5 }}
              >
                <Link to='/register' className="block">
                  <Button 
                    size="lg"
                    fullWidth
                    onClick={() => setOpenNav(false)}
                    className="py-3 text-base bg-white text-[#A51B64] hover:bg-pink-50 transition-colors"
                  >
                    Join Us
                  </Button>
                </Link>
                <a
                  href="https://businessboosters.club/login/"
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <Button 
                    variant="outlined"
                    size="lg"
                    fullWidth
                    onClick={() => setOpenNav(false)}
                    className="py-3 text-base border-white text-white hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Button>
                </a>
              </motion.div>
              
              {/* Social links or other footer info could go here */}
              <motion.div 
                className="text-center text-white/80 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + routes.length * 0.1, duration: 0.5 }}
              >
                Connect with Business Boosters
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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







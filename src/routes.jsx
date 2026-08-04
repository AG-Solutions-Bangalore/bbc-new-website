
import Services from "./pages/services";
import Gallery from "./pages/gallery";
import Contact from "./pages/contact";
import { Home, Profile } from "./pages";

export const routes = [
  {
    name: "Home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "About Us",
    path: "/aboutus",
    element: <Profile />,
  },
  {
    name: "Services",
    path: "/services",
    element: <Services />,
  },
  {
    name: "Gallery",
    path: "/gallery",
    element: <Gallery />,
  },
  {
    name: "Contact Us",
    path: "/contact",
    element: <Contact />,
  },

  // {
  //   name: "Docs",
  //   href: "https://www.material-tailwind.com/docs/react/installation",
  //   target: "_blank",
  //   element: "",
  // },
];

export default routes;

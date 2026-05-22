import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Profile = lazy(() => import("./pages/profile"));
const Services = lazy(() => import("./pages/services"));
const Gallery = lazy(() => import("./pages/gallery"));
const Contact = lazy(() => import("./pages/contact"));

export const routes = [
  {
    name: "home",
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

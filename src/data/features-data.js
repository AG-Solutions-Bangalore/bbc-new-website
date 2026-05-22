
import { FaHandshake } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
export const featuresData = [
  {
    color: "gray",
    link: "/register",
    title: "Join Us",
    icon: FaHandshake,
    description:
      "We all are here to develop and boost businesses of group members. We trust each other and help each other to grow.",
  },
  {
    color: "gray",
    link: "/services",
    title: "Find a Services",
    icon: IoSettingsOutline,
    description:
      "Services/Businesses referred to you would be given to you by our trusted members would be of best quality and price.",
  },
  {
    color: "gray",
    link: "https://businessboosters.club/login",
    title: "Login",
    icon: CiLogin,
    description:
      "Already Registered User ? Click here to login. You can update your details here.",
  },
];

export default featuresData;

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamSlider } from "@/widgets/cards";
import { featuresData, contactData } from "@/data";
import { RealStoriesSection } from "@/widgets/cards/stories-card";
import { realStoriesData } from "@/data/stories-data";
import TeamSliderPartner from "@/widgets/cards/team-card-partner";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";

// Animated components
const AnimatedCard = ({ children, delay = 0, ...props }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const AnimatedText = ({ children, delay = 0, ...props }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: "easeOut" 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const AnimatedButton = ({ children, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};
export function Home() {
  const [teamData, setTeamData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://businessboosters.club/public/api/getUser");
        if (response.data && response.data.profile) {
          const mappedData = response.data.profile.map((user) => ({
            img: user.image
              ? `http://businessboosters.club/public/images/user_images/${user.image}`
              : "http://businessboosters.club/public/images/user_images/no_images.png", 
            name: user.name || "Unknown",
            position: user.company_short || "Member",
          }));
          setTeamData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  
  return (
    <>
      {/* Hero Section with Parallax */}
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32 overflow-hidden">
        <motion.div 
          className="absolute top-0 h-full w-full bg-[url('https://businessboosters.club/static/media/bbc_banner.75f50e043a555b86430c.jpg')] bg-cover bg-center"
          style={{ y: heroY }}
        />
        <motion.div 
          className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center"
          style={{ opacity: heroOpacity }}
        />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-6 font-black"
                >
                  Your Most Trusted Business Partner.
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Typography variant="lead" color="white" className="opacity-80">
                  We provide expertise, connections and cultural awareness to help your organizations reach new markets and make successful deals.
                </Typography>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <motion.div 
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {featuresData.map(({ color, title, icon, description, link }, index) => {
              const isExternal = link.startsWith("http");
              const cardContent = (
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    y: -10
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FeatureCard
                    color={color}
                    title={title}
                    icon={React.createElement(icon, {
                      className: "w-5 h-5 text-white",
                    })}
                    description={description}
                  />
                </motion.div>
              );

              return (
                <motion.div key={title} variants={staggerItem}>
                  {isExternal ? (
                    <a href={link} className="block">
                      {cardContent}
                    </a>
                  ) : (
                    <Link to={link} className="block">
                      {cardContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* About Us Section */}
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <AnimatedCard>
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full text-center shadow-lg">
                  <motion.img
                    alt="Card Image"
                    src="/img/slogo.png"
                    className="h-full w-full"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </AnimatedCard>
              
              <AnimatedText delay={0.2}>
                <Typography
                  variant="h3"
                  className="mb-3 font-bold"
                  color="blue-gray"
                >
                  About Us
                </Typography>
              </AnimatedText>
              
              <AnimatedText delay={0.4}>
                <Typography className="mb-8 font-normal text-blue-gray-500">
                  The new digital world is very different from the old traditional business world. Advantage of this world is only enjoyed by large multiple chains of stores and online giant sellers.
                  <br />
                  <br />
                  The small and medium business persons are slowly and surely suffering and losing out. In such a scenario the need was to fight back with these giants collectively hence the thought of forming a decent and family type businesses group came to Mr. Bhupendra Kotwal, Mr. Umesh Tulsiyan and Mr. Narendra Gehlot who took the lead and started consulting and convincing business friends who not only joined the mission but supported the idea. Purpose of the group is simple.
                </Typography>
              </AnimatedText>
              
              <AnimatedButton>
                <Link to='/aboutus'>
                  <Button className="w-full sm:w-auto px-8 py-3 bg-[#A51B64] text-white rounded-lg hover:bg-[#A51B64] transition-colors duration-300">read more</Button>
                </Link>
              </AnimatedButton>
            </div>
            
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <AnimatedCard delay={0.5}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial={{ rotate: -3 }}
                  animate={{ rotate: 3 }}
                  transition={{ 
                    rotate: {
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                >
                  <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                    <CardBody>
                      <img
                        alt="Card Image"
                        src="https://businessboosters.club/static/media/about_us.bca55603f348c7edd1ab.jpg"
                        className="h-full w-full"
                      />
                    </CardBody>
                  </Card>
                </motion.div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="px-4 pt-20 pb-5">
        <div className="container mx-auto">
          <AnimatedText>
            <PageTitle section="" heading="Our Trusted Partners">
              The Trusted Partner You Can Have Faith In, Together we can do amazing things.
            </PageTitle>
          </AnimatedText>
          
          <motion.div 
            className="mt-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {error && <div className="text-red-500">{error}</div>}
            <TeamSlider teamData={teamData} loading={loading} />
            <TeamSliderPartner teamData={teamData} loading={loading} />
          </motion.div>
        </div>
      </section>
   
      {/* Consulting Section */}
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <AnimatedText>
            <PageTitle section="" heading="Best Consulting For Every Business">
              This is group which believes in fair and honest business, to not only help customers but develop personal relationship. Thus growing in every field.
              
              Our members not only enjoy business referrals but also have develop healthy family bonding with each other.
              
              we believe in <br/> <br/>  <span className="text-[#A51B64]  font-bold text-2xl">"SABKA SATH SABKA VISHWAS"</span>.
            </PageTitle>
          </AnimatedText>
          
          <motion.div 
            className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {contactData.map(({ title, icon, description }, index) => (
              <motion.div key={title} variants={staggerItem}>
                <Card
                  color="transparent"
                  shadow={false}
                  className="text-center text-blue-gray-900"
                >
                  <motion.div 
                    className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20"
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    {React.createElement(icon, {
                      className: "w-5 h-5 text-white",
                    })}
                  </motion.div>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    {description}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
      
          
          {/* Follow Us Section */}
          <AnimatedText>
            <PageTitle section="" heading="Follow Us"/>
             
          
          </AnimatedText>
          
          <div className="container mx-auto px-4 mb-8 mt-8">
            {/* First Row: Two Cards (50% width each) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* YouTube Card */}
              <AnimatedCard delay={0.1}>
                <motion.div
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => window.open("https://www.youtube.com/@BusinessboostersclubBangalore", "_blank")}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "#FFEEEE"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                      alt="YouTube"
                      className="w-10 h-10"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    />
                    <Typography variant="h5" className="text-gray-800">
                      YouTube
                    </Typography>
                  </div>
                  <Typography className="mt-2 text-gray-600">
                    Follow us on YouTube for the latest updates and tutorials.
                  </Typography>
                </motion.div>
              </AnimatedCard>

              {/* Facebook Card */}
              <AnimatedCard delay={0.2}>
                <motion.div
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => window.open("https://www.facebook.com/businessboosterclub2018/", "_blank")}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "#EEF6FF"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook"
                      className="w-10 h-10"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                    />
                    <Typography variant="h5" className="text-gray-800">
                      Facebook
                    </Typography>
                  </div>
                  <Typography className="mt-2 text-gray-600">
                    Connect with us on Facebook for community updates.
                  </Typography>
                </motion.div>
              </AnimatedCard>
            </div>

            {/* Second Row: One Card (Full Width) */}
            <AnimatedCard delay={0.3}>
              <motion.div
                className="bg-white flex flex-col lg:flex-row item-center gap-2 shadow-lg rounded-lg p-6 mt-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => window.open("https://play.google.com/store/apps/details?id=com.bbc.agsolutions&pcampaignid=web_share", "_blank")}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "#F0F8FF"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-4">
                  <motion.img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Playstore"
                    className="w-auto h-auto"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div className="">
                  <Typography variant="h5" className="text-gray-800">
                    Google Playstore
                  </Typography>
                  <Typography className="mt-2 text-gray-600">
                    Download our app from the Google Playstore for the best experience.
                  </Typography>
                </div>
              </motion.div>
            </AnimatedCard>
          </div>
        </div>
      </section>
      
      {/* Real Stories Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <RealStoriesSection storiesData={realStoriesData} />
      </motion.div>
      
      {/* Membership CTA Section */}
      <section className="px-4 md:px-20 pt-10 pb-5">
        <AnimatedCard>
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 p-12 rounded-lg shadow-lg"
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              scale: 1.01
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Left Side: Text */}
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <Typography variant="h3" className="font-bold text-gray-800">
                INTERESTED IN BECOMING THE BBC MEMBER?
              </Typography>
              <Typography variant="lead" className="mt-2 text-gray-600">
                Join us today and be part of a thriving business community.
              </Typography>
            </div>

            {/* Right Side: Button */}
            <Link to={'/contact'}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="filled"
                  color="green"
                  size="lg"
                  className="relative overflow-hidden transform transition-all duration-500"
                >
                  <motion.span 
                    className="relative z-10"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Contact Us
                  </motion.span>
                  <motion.span 
                    className="absolute inset-0 bg-green-600 opacity-0 hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ opacity: 0.2 }}
                  ></motion.span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </AnimatedCard>
      </section>
      
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Card, CardBody } from "@material-tailwind/react/components/Card";
import { Typography } from "@material-tailwind/react/components/Typography";
import { Button } from "@material-tailwind/react/components/Button";
import { Footer } from "@/widgets/layout/footer";
import { PageTitle } from "@/widgets/layout/page-title";
import { contactData } from "@/data";
import { realStoriesData } from "@/data/stories-data";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { fetchUsers, getUserImageUrl } from "@/lib/api";

const TeamSlider = lazy(() =>
  import("@/widgets/cards/team-card").then((module) => ({
    default: module.TeamSlider,
  }))
);
const TeamSliderPartner = lazy(() => import("@/widgets/cards/team-card-partner"));
const RealStoriesSection = lazy(() => import("@/widgets/cards/stories-card"));

const useDeferredSection = (rootMargin = "800px") => {
  const ref = React.useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isReady, rootMargin]);

  return [ref, isReady];
};

const PartnerSlidersFallback = () => (
  <div className="space-y-8">
    {[0, 1].map((row) => (
      <div key={row} className="flex overflow-hidden">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="mx-2 shrink-0 basis-1/2 text-center animate-pulse sm:basis-1/4 md:basis-1/6 xl:basis-[11.111%]"
          >
            <div className="h-[12rem] w-[7rem] bg-gray-300 rounded-2xl mx-auto" />
            <div className="mt-2 mb-1 h-4 bg-gray-300 rounded w-3/4 mx-auto" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

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
        ease: [0.25, 0.1, 0.25, 1],
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
        ease: "easeOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const AnimatedButton = ({ children, ...props }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} {...props}>
    {children}
  </motion.div>
);

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
      ease: "easeOut",
    },
  },
};

export function HomeAbout() {
  return (
    <div className="mt-32 flex flex-wrap items-center">
      <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
        <AnimatedCard>
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full text-center shadow-lg">
            <motion.img
              alt="Card Image"
              src="/img/slogo.png"
              width="190"
              height="190"
              loading="lazy"
              decoding="async"
              className="h-full w-full"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </AnimatedCard>

        <AnimatedText delay={0.2}>
          <Typography variant="h3" className="mb-3 font-bold" color="blue-gray">
            About Us
          </Typography>
        </AnimatedText>

        <AnimatedText delay={0.4}>
          <Typography className="mb-8 font-normal text-blue-gray-500">
            The new digital world is very different from the old traditional
            business world. Advantage of this world is only enjoyed by large
            multiple chains of stores and online giant sellers.
            <br />
            <br />
            The small and medium business persons are slowly and surely suffering
            and losing out. In such a scenario the need was to fight back with
            these giants collectively hence the thought of forming a decent and
            family type businesses group came to Mr. Bhupendra Kotwal, Mr. Umesh
            Tulsiyan and Mr. Narendra Gehlot who took the lead and started
            consulting and convincing business friends who not only joined the
            mission but supported the idea. Purpose of the group is simple.
          </Typography>
        </AnimatedText>

        <AnimatedButton>
          <Link to="/aboutus">
            <Button className="w-full sm:w-auto px-8 py-3 bg-[#A51B64] text-white rounded-lg hover:bg-[#A51B64] transition-colors duration-300">
              read more
            </Button>
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
                repeatType: "reverse",
              },
            }}
          >
            <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
              <CardBody>
                <img
                  alt="Card Image"
                  src="https://businessboosters.club/static/media/about_us.bca55603f348c7edd1ab.jpg"
                  width="512"
                  height="384"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full"
                />
              </CardBody>
            </Card>
          </motion.div>
        </AnimatedCard>
      </div>
    </div>
  );
}

export default function HomeDeferredSections() {
  const [teamData, setTeamData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [partnersRef, partnersReady] = useDeferredSection("900px");
  const [storiesRef, storiesReady] = useDeferredSection("900px");

  useEffect(() => {
    if (!partnersReady) return undefined;

    let isMounted = true;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const users = await fetchUsers();
        const mappedData = users.map((user) => ({
          img: getUserImageUrl(user.image),
          name: user.name || "Unknown",
          position: user.company_short || "Member",
        }));

        if (isMounted) setTeamData(mappedData);
      } catch (fetchError) {
        console.error("Error fetching user data:", fetchError);
        if (isMounted) setError("Failed to load user data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [partnersReady]);

  return (
    <>
      <section className="px-4 pt-20 pb-5">
        <div className="container mx-auto">
          <AnimatedText>
            <PageTitle section="" heading="Our Trusted Partners">
              The Trusted Partner You Can Have Faith In, Together we can do
              amazing things.
            </PageTitle>
          </AnimatedText>

          <motion.div
            ref={partnersRef}
            className="mt-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {error && <div className="text-red-500">{error}</div>}
            {partnersReady ? (
              <Suspense fallback={<PartnerSlidersFallback />}>
                <TeamSlider teamData={teamData} loading={loading} />
                <TeamSliderPartner teamData={teamData} loading={loading} />
              </Suspense>
            ) : (
              <PartnerSlidersFallback />
            )}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <AnimatedText>
            <PageTitle section="" heading="Best Consulting For Every Business">
              This is group which believes in fair and honest business, to not
              only help customers but develop personal relationship. Thus growing
              in every field. Our members not only enjoy business referrals but
              also have develop healthy family bonding with each other. we
              believe in <br /> <br />{" "}
              <span className="text-[#A51B64]  font-bold text-2xl">
                "SABKA SATH SABKA VISHWAS"
              </span>
              .
            </PageTitle>
          </AnimatedText>

          <motion.div
            className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {contactData.map(({ title, icon, description }) => (
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
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
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

          <AnimatedText>
            <PageTitle section="" heading="Follow Us" />
          </AnimatedText>

          <div className="container mx-auto px-4 mb-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedCard delay={0.1}>
                <motion.div
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/@BusinessboostersclubBangalore",
                      "_blank"
                    )
                  }
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "#FFEEEE",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                      alt="YouTube"
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
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

              <AnimatedCard delay={0.2}>
                <motion.div
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/businessboosterclub2018/",
                      "_blank"
                    )
                  }
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "#EEF6FF",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook"
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
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

            <AnimatedCard delay={0.3}>
              <motion.div
                className="bg-white flex flex-col lg:flex-row item-center gap-2 shadow-lg rounded-lg p-6 mt-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.bbc.agsolutions&pcampaignid=web_share",
                    "_blank"
                  )
                }
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "#F0F8FF",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-4">
                  <motion.img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Playstore"
                    width="646"
                    height="250"
                    loading="lazy"
                    decoding="async"
                    className="w-auto h-auto"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div>
                  <Typography variant="h5" className="text-gray-800">
                    Google Playstore
                  </Typography>
                  <Typography className="mt-2 text-gray-600">
                    Download our app from the Google Playstore for the best
                    experience.
                  </Typography>
                </div>
              </motion.div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <motion.div
        ref={storiesRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {storiesReady && (
          <Suspense fallback={null}>
            <RealStoriesSection storiesData={realStoriesData} />
          </Suspense>
        )}
      </motion.div>

      <section className="px-4 md:px-20 pt-10 pb-5">
        <AnimatedCard>
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 p-12 rounded-lg shadow-lg"
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              scale: 1.01,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <Typography variant="h3" className="font-bold text-gray-800">
                INTERESTED IN BECOMING THE BBC MEMBER?
              </Typography>
              <Typography variant="lead" className="mt-2 text-gray-600">
                Join us today and be part of a thriving business community.
              </Typography>
            </div>

            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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
                  />
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

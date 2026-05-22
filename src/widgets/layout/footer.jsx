import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { updateVisitorCount } from "@/lib/api";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  const [visitorCount, setVisitorCount] = useState(
    () => localStorage.getItem("visitor_count") || ""
  );

  useEffect(() => {
    if (!localStorage.getItem("visitor_count")) {
      const scheduleIdleTask =
        window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1));
      const cancelIdleTask = window.cancelIdleCallback || window.clearTimeout;

      const taskId = scheduleIdleTask(() => {
        updateVisitorCount()
          .then((data) => {
            if (data?.code == 200) {
              localStorage.setItem("visitor_count", data.visitorCount);
              setVisitorCount(data.visitorCount);
            }
          })
          .catch((error) => console.error("Error fetching visitor count:", error));
      });

      return () => cancelIdleTask(taskId);
    } else {
      setVisitorCount(localStorage.getItem("visitor_count") || "");
    }

    return undefined;
  }, []);

  return (
    <footer className="relative px-4 pt-2 pb-6">
      <div className="container mx-auto ">


        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-between">
  <div className="w-full md:w-auto px-16 text-center   md:text-left">
    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
      {copyright}
    </p>
  </div>
  <div className="w-full md:w-auto px-4 text-center md:text-right">
    <p className="font-semibold text-blue-gray-700">
      Visitor No: {visitorCount}
    </p>
  </div>
</div>

      </div>

    </footer>
  );
}

Footer.defaultProps = {

  copyright: (
    <>
      Copyright © {year} Business Boosters. All rights reserved.
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;

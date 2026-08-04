import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gif from "../../public/img/event.gif";

const Floating = () => {
  const { pathname } = useLocation();
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const scheduleIdleTask =
      window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1));
    const cancelIdleTask = window.cancelIdleCallback || window.clearTimeout;
    const taskId = scheduleIdleTask(() => setShowFloating(true));

    return () => cancelIdleTask(taskId);
  }, []);

  if (
    !showFloating ||
    pathname === "/interest" ||
    pathname.startsWith("/business-profile/")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-10 left-8 z-[99]">
      <Link to="/interest">
        <img
          src={gif}
          alt="Floating gif"
          width="151"
          height="91"
          loading="lazy"
          decoding="async"
          className="w-[100px] transition-transform duration-300 ease-in-out hover:scale-110 md:w-[150px]"
        />
      </Link>
    </div>
  );
};

export default Floating;

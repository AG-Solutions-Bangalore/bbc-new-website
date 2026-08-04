import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";


import { Navbar } from "./widgets/layout/navbar";
import routes from "./routes";
import Floating from "./pages/floating";

const Register = lazy(() => import("./pages/register"));
const Interest = lazy(() => import("./pages/interest"));
const ThankYou = lazy(() => import("./pages/thankyou"));
const Failure = lazy(() => import("./pages/failure"));
const Feedback = lazy(() => import("./pages/feedback"));
const BusinessProfile = lazy(() => import("./pages/business-profile"));

function App() {
  const { pathname } = useLocation();
  const isBusinessProfile = pathname.startsWith("/business-profile/");
  
  return (
    <>
      {!( isBusinessProfile ) && (
        <Navbar routes={routes} />
      )}
      <Floating />
      <main>
        <Suspense fallback={null}>
          <Routes>
            {routes.map(
              ({ path, element }, key) =>
                element && <Route key={key} path={path} element={element} />
            )}
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/interest" element={<Interest/>} />
            <Route path="/thankyou" element={<ThankYou/>} />
            <Route path="/failure" element={<Failure/>} />
            <Route path="/feedback" element={<Feedback/>} />
            <Route path="/business-profile/:id" element={<BusinessProfile/>} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;



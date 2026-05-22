import React, { useState } from "react";
import { Button } from "@material-tailwind/react/components/Button";
import { Card } from "@material-tailwind/react/components/Card";
import { Checkbox } from "@material-tailwind/react/components/Checkbox";
import { Input } from "@material-tailwind/react/components/Input";
import { Option, Select } from "@material-tailwind/react/components/Select";
import { Textarea } from "@material-tailwind/react/components/Textarea";
import { Footer } from "@/widgets/layout/footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Interest() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    person_name: "",
    person_mobile: "",
    person_email: "",
    person_occupation: "",
    person_service: "",
    person_company: "",
    person_area: "",
    person_message: "",
    person_join: "No",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "person_mobile") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleValidation = () => {
    let newErrors = {};

    if (!formData.person_name) newErrors.person_name = "Full name is required";


   

    if (!formData.person_email) {
      newErrors.person_email = "Email is required";
    } else if (!formData.person_email.endsWith(".com")) {
      newErrors.person_email = "Email must end with .com";
    }

    if (!formData.person_mobile || formData.person_mobile.length !== 10)
      newErrors.person_mobile = "Enter a valid 10-digit mobile number";
    if (!formData.person_occupation)
      newErrors.person_occupation = "Occupation is required";
    if (!formData.person_company)
      newErrors.person_company = "Company name is required";
    if (!formData.person_area) newErrors.person_area = "Area is required";
    if (!formData.person_service)
      newErrors.person_service = "Service details are required";
    if (formData.person_join !== "Yes") {
      newErrors.person_join = "You must agree to join BBC";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formdata before", formData)
    if (!handleValidation()) return;
    console.log("formdata after", formData)
    setLoading(true);

    try {
      const response = await axios.post(
        "https://businessboosters.club/public/api/createInterest",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        navigate("/thankyou");
      } else {
        navigate("/failure");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      navigate("/failure");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative block h-[25vh]  bg-white mt-16 md:mt-16">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
          <h1 className="text-center font-bold text-5xl mb-4 text-gray-800">
            Want to Join BBC?
          </h1>
          <p className="text-xl text-center font-light max-w-2xl text-gray-700">
            Join our network and expand your business opportunities!
          </p>
        </div>
      </section>

      {/* Form Section */}
      <Card className="p-8 bg-gradient-to-r mx-5 mt-8 md:mx-36 px-8 py-10 border border-[#A41460]  hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-semibold text-center text-[#A41460] mb-6">
          ✨ Join Us ✨
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <Input
                variant="static"

                label="Full Name *"
                labelProps={{ className: "!text-[#A41460]" }}

                placeholder="Enter your full name"
                name="person_name"
                value={formData.person_name}
                onChange={handleInputChange}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${errors.person_name ? "placeholder-red-500" : ""
                  }`}
              />
            </div>

            <div>
              <Input
                variant="static"
                label="Email *"
                labelProps={{ className: "!text-[#A41460]" }}
                type="email"
                placeholder="Enter your email"
                name="person_email"
                value={formData.person_email}
                onChange={handleInputChange}
               
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${errors.person_email ? "placeholder-red-500" : ""
                  }`}
                  
              />
                {errors.person_email && <p className=" text-sm text-red-500">{errors.person_email}</p>}
            </div>

            <div>
              <Input
                variant="static"
                label="Mobile Number *"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Enter your mobile number"
                name="person_mobile"
                value={formData.person_mobile}
                onChange={handleInputChange}
                maxLength={10}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${errors.person_mobile ? "placeholder-red-500" : ""
                  }`}
              // required
              />
            </div>

            <div>
              {/* <Select
                variant="static"
                required
                label="Occupation *"
                labelProps={{ className: "text-[#A41460]" }} 
             
                className={`${
                  errors.person_occupation ? "border-red-500" : ""
                }`}
              >
                <Option value="Business">Business</Option>
                <Option value="Professional">Professional</Option>
              </Select> */}

              <Select
                variant="static"
                required
                label="Occupation *"
                labelProps={{ className: "text-[#A41460]" }}
                value={formData.person_occupation}
                onChange={(value) => setFormData((prev) => ({ ...prev, person_occupation: value }))}
                className={`${errors.person_occupation ? "border-red-500" : ""}`}
              >
                <Option value="Business">Business</Option>
                <Option value="Professional">Professional</Option>
              </Select>

            </div>

            <div>
              <Input
                variant="static"
                label="Company *"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Enter your company"
                name="person_company"
                value={formData.person_company}
                onChange={handleInputChange}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${errors.person_company
                    ? "placeholder-red-500 border-red-500"
                    : ""
                  }`}
              />
            </div>

            <div>
              <Input
                variant="static"

                label="Area *"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Enter your area"
                name="person_area"
                value={formData.person_area}
                onChange={handleInputChange}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${errors.person_area ? "placeholder-red-500" : ""
                  }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Textarea
                variant="static"

                label="Service *"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Type all Products or Services separated by commas"
                name="person_service"
                value={formData.person_service}
                onChange={handleInputChange}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${errors.person_service ? "placeholder-red-500" : ""
                  }`}
              />
            </div>

            <div>
              <Textarea
                variant="static"
                label="Message"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Enter your message"
                name="person_message"
                value={formData.person_message}
                onChange={handleInputChange}
                className="bg-gray-100 text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <Checkbox
                  color="blue"
                  checked={formData.person_join === "Yes"}
                  onChange={handleInputChange}
                  name="person_join"
                  className={`bg-gray-100 text-gray-700 ${errors.person_join ? "border border-red-500" : ""
                    }`}
                />
                <label className="text-gray-700 text-xs md:text-sm">
                  To learn more about BBC, click here to attend the next
                  meeting.
                </label>
               
              </div>
              {errors.person_join && <p className="text-red-500 text-sm mt-1">{errors.person_join}</p>}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 bg-[#A41460] hover:bg-[#802053] transition-colors duration-300"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="bg-white mt-12">
        <Footer />
      </div>
    </>
  );
}

export default Interest;

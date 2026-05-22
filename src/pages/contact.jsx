import { Footer } from "@/widgets/layout/footer";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react/components/Button";
import { Card } from "@material-tailwind/react/components/Card";
import { Input } from "@material-tailwind/react/components/Input";
import { Textarea } from "@material-tailwind/react/components/Textarea";
import { Typography } from "@material-tailwind/react/components/Typography";
import axios from "axios";
import React, { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    person_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "phone") {
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

  const validate = () => {
    let tempErrors = {};
    if (!formData.person_name) tempErrors.person_name = "Full Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!formData.email.endsWith(".com")) {
      tempErrors.email = "Email must end with .com";
    }
  
    if (!formData.phone) tempErrors.phone = "Phone Number is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    const formPayload = new FormData();
    formPayload.append("contact_name", formData.person_name);
    formPayload.append("contact_email", formData.email);
    formPayload.append("contact_mobile", formData.phone);
    formPayload.append("contact_message", formData.message);
    console.log("contact payload",formPayload)
    try {
      const response = await axios.post(
        "http://businessboosters.club/public/api/createContactD",
        formPayload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert("Form submitted successfully!");
        setFormData({ person_name: "", email: "", phone: "", message: "" });
      } else {
        setErrors({ form: "Failed to submit the form. Please try again." });
      }
    } catch (error) {
      setErrors({ form: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative block h-[25vh]  bg-white mt-16 md:mt-16">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
          <Typography
            variant="h1"
            color="gray"
            className="text-center font-bold text-5xl mb-4"
          >
            Contact Us
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="text-xl text-center font-light max-w-2xl"
          >
            We're here to help! Reach out to us for any inquiries or support.
          </Typography>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card className="p-8 border border-blue-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-500 rounded-full">
                <MapPinIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <Typography variant="h5" className="font-bold text-blue-900">
                  Address
                </Typography>
                <Typography variant="paragraph" className="text-blue-800">
                  #763, 16th Main, BSK 2nd Stage, Bengaluru 560 070
                </Typography>
              </div>
            </div>
          </Card>

          {/* Email Card */}
          <Card className="p-8  border border-purple-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-purple-500 rounded-full">
                <EnvelopeIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <Typography variant="h5" className="font-bold text-purple-900">
                  Mail Us
                </Typography>
                <Typography variant="paragraph" className="text-purple-800">
                  businessboostersclub@gmail.com
                </Typography>
              </div>
            </div>
          </Card>

          {/* Phone Card */}
          <Card className="p-8  border border-green-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-green-500 rounded-full">
                <PhoneIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <Typography variant="h5" className="font-bold text-green-900">
                  Phone Us
                </Typography>
                {/* <Typography variant="paragraph" className="text-green-800">
                  <p>BHUPENDRA KOTWAL - 93412 14936</p>
                  <p>NARENDAR GEHLOT - 97411 41114</p>
                  <p>UMESH TULSYAN - 93416 66007</p>
                </Typography> */}
<Typography variant="paragraph" className="text-green-800">
  BHUPENDRA KOTWAL - 9341214936
</Typography>
<Typography variant="paragraph" className="text-green-800">
  NARENDAR GEHLOT - 9741141114
</Typography>
<Typography variant="paragraph" className="text-green-800">
  UMESH TULSYAN - 9341666007
</Typography>



              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-r  border border-[#A41460]  hover:shadow-2xl transition-shadow duration-300">
          <Typography
            variant="h4"
            className="font-bold text-center mb-8 text-[#A41460]"
          >
            Send Us a Message
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                variant="static"
                label="Full Name *"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Enter your full name"
                name="person_name"
                value={formData.person_name}
                onChange={handleInputChange}
                
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                  errors.person_name ? "placeholder-red-500" : ""
                }`}
              />
            </div>

            <div>
              <Input
                variant="static"
                label="Email *"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Enter your email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
               
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                  errors.email ? "placeholder-red-500" : ""
                }`}
              />
               {errors.email && <p className=" text-sm text-red-500">{errors.email}</p>}

            </div>

            <div>
              <Input
                variant="static"
                label="Phone Number *"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                minLength={10}
                onChange={handleInputChange}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                  errors.phone ? "placeholder-red-500" : ""
                }`}
                maxLength={10}
              />
            </div>

            <div>
              <Textarea
                variant="static"
                label="Message"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="bg-gray-100 text-gray-700 placeholder-gray-400"
                rows="2"
              />
            </div>

            {errors.form && (
              <Typography color="red" className="text-center">
                {errors.form}
              </Typography>
            )}

            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                color="indigo"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-[#A41460] hover:bg-[#802053] transition-colors duration-300"
              >
                {loading ? "Submitting..." : "Submit Now"}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-white mt-12">
        <Footer />
      </div>
    </>
  );
}

export default Contact;

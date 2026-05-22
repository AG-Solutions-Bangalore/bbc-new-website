import React, { useState } from "react";
import { Button } from "@material-tailwind/react/components/Button";
import { Card } from "@material-tailwind/react/components/Card";
import { Input } from "@material-tailwind/react/components/Input";
import { Option, Select } from "@material-tailwind/react/components/Select";
import { Textarea } from "@material-tailwind/react/components/Textarea";
import { Footer } from "@/widgets/layout/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";







const Feedback = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        feedback_name: '',
        feedback_subject: '',
        feedback_mobile: '',
        feedback_description: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (name === "feedback_mobile") {
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
  
      if (!formData.feedback_name) newErrors.feedback_name = "Full name is required";
  
  
  
      if (!formData.feedback_mobile || formData.feedback_mobile.length !== 10)
        newErrors.feedback_mobile = "Enter a valid 10-digit mobile number";
   
      if (!formData.feedback_subject)
        newErrors.feedback_subject = "Subject are required";
      if (!formData.feedback_description)
        newErrors.feedback_description = "Description  are required";


     
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
   
      if (!handleValidation()) return;
     
      setLoading(true);
  
      try {
        const response = await axios.post(
          "https://businessboosters.club/public/api/createFeedbackNew",
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
   <section className="relative block h-[25vh]  bg-white mt-16 md:mt-16">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
          <h1 className="text-center font-bold text-2xl md:text-4xl lg:text-5xl mb-4 text-gray-800">
          We Value Your Feedback
          </h1>
          <p className="text-md md:text-lg lg:text-xl text-center font-light max-w-2xl text-gray-700">
          Help us improve! Share your suggestions, feedback, or complaints with BBC.
          </p>
        </div>
      </section>
   {/* Form Section */}
   <Card className="p-8 bg-gradient-to-r mx-5 mt-8 md:mx-36 px-8 py-10 border border-[#A41460]  hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center text-[#A41460] mb-6">
          ✨ Feedback ✨
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <Input
                variant="static"

                label="Full Name *"
                labelProps={{ className: "!text-[#A41460]" }}

                placeholder="Enter your full name"
                name="feedback_name"
                value={formData.feedback_name}
                onChange={handleInputChange}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${errors.feedback_name ? "placeholder-red-500" : ""
                  }`}
              />
            </div>

      

            <div>
              <Input
                variant="static"
                label="Mobile Number *"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="Enter your mobile number"
                name="feedback_mobile"
                value={formData.feedback_mobile}
                onChange={handleInputChange}
                maxLength={10}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${errors.feedback_mobile ? "placeholder-red-500" : ""
                  }`}
              // required
              />
            </div>

            <div>
           

              <Select
                variant="static"
                required
                label="Subject *"
                labelProps={{ className: "text-[#A41460]" }}
                value={formData.feedback_subject}
                onChange={(value) => setFormData((prev) => ({ ...prev, feedback_subject: value }))}
                className={`${errors.feedback_subject ? "border-red-500" : ""}`}
              >
                <Option value="Suggestion">Suggestion</Option>
                <Option value="Feedback">Feedback</Option>
                <Option value="Complaint">Complaint</Option>
              </Select>

            </div>

         
          </div>

          <div className="grid grid-cols-1 ">
            <div>
              <Textarea
                variant="static"

                label="Description *"
                labelProps={{ className: "!text-[#A41460]" }}
                placeholder="write description here..."
                name="feedback_description"
                value={formData.feedback_description}
                onChange={handleInputChange}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${errors.feedback_description ? "placeholder-red-500" : ""
                  }`}
              />
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
  )
}

export default Feedback

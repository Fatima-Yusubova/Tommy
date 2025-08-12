import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "../../../store/eccomerceApi";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email field cannot be empty")
    .required("Pssword filed cannot be empty"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "6 character minimum"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await login(values).unwrap();
      toast.success("Signed in successfully!");
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res));
      resetForm();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 rounded-lg p-6 mt-10 mb-8">
        <p className="text-[#26282B] mb-4 text-sm font-medium">
          Join Hilfiger Club today for VIP access. Members get perks like:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li className="text-[#212529] text-sm">Early Access to Sales</li>
          <li className="text-[#212529] text-sm">Birthday & Welcome Gifts</li>
          <li className="text-[#212529] text-sm">Exclusive Promotions</li>
          <li className="text-[#212529] text-sm">Extended Returns</li>
        </ul>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={`w-full text-sm px-4 py-4 border rounded focus:outline-none focus:border-black ${
                  errors.email && touched.email
                    ? "border-red-700 text-red-700"
                    : "border-gray-300 text-[#464C52]"
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password*"
                className={`w-full text-sm px-4 py-4 border rounded focus:outline-none focus:border-black pr-12 ${
                  errors.password && touched.password
                    ? "border-red-700 text-red-700"
                    : "border-gray-300 text-[#464C52]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-4 rounded font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in with email and password"}
            </button>
            <button
              type="button"
              className="w-full border border-gray-300 text-black py-4 rounded font-medium text-sm"
            >
              Email me a verification code
            </button>
            <p className="text-sm text-gray-600 text-center mt-6">
              By creating an account, I agree to the <a href="#" className="underline text-[#464C52]">  Terms and Conditions </a> and  <a href="#" className="underline text-[#464C52]"> Privacy Policy</a>.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;

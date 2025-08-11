import React, { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSignUpMutation } from "../../../store/eccomerceApi";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "FirstName is too short") 
    .max(10, "FirstName is too long") 
    .required("Please enter a first name"), 
  lastName: Yup.string()
    .min(5, "LastName is too short")
    .max(20, "LastName is too long")
    .required("Please enter a last name"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Only Gmail addresses are allowed"
    )
    .required("Please enter an email address"),

  password: Yup.string()
    .matches(/[a-z]/, "1 lowercase character") 
    .matches(/[A-Z]/, "1 uppercase character") 
    .matches(/\d/, "1 number")
    .min(6, "6 character minimum") 
    .required("Password is required"),
  gender: Yup.string().required("Please select a gender"),
  dateOfBirth: Yup.string().required("Please enter a date of birth"),
  agreeToUpdates: Yup.boolean(),
});

const AccountMenu = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();
  const handleSubmit = async (values, {setFieldError }) => {
    try {
      const result = await signUp(values).unwrap();
      console.log(result)
      toast.success("Operation is successfull")
    } catch (error) {
     toast.error(error)
    } 
  }
  return (
    <div className="max-w-xl mx-auto py-15 px-5 md:px-10 max-h-screen overflow-y-auto scrollbar-hidden">
      <ul className="text-[#464C52] text-xl flex justify-between mb-6">
        <li className="border-b-2 border-black pb-2 flex-1 text-center cursor-pointer">
          Sign In
        </li>
        <li className="border-b border-gray-200 pb-2 flex-1 text-center cursor-pointer">
          Sign Up
        </li>
      </ul>
      <div className="bg-gray-100 rounded-lg p-6 mt-10 mb-8">
        <p className="text-[#26282B] mb-4 text-sm">
          VIP giriş üçün Hilfiger Club-a qoşulun. Üzvlər bu imtiyazları əldə
          edir:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li className="text-[#212529] text-sm">Satışlara erkən giriş</li>
          <li className="text-[#212529] text-sm">
            Ad günü və qarşılama hədiyyələri
          </li>
          <li className="text-[#212529] text-sm">Ekskluziv promosiyalar</li>
          <li className="text-[#212529] text-sm">Uzadılmış qaytarma müddəti</li>
        </ul>
      </div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          gender: "",
          dateOfBirth: "",
          agreeToUpdates: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values, errors, touched }) => (
          <Form className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  className={`w-full text-sm px-4 py-4 border rounded focus:outline-none focus:border-black ${
                    errors.firstName && touched.firstName
                      ? "border-red-700 text-red-700"
                      : "border-gray-300 text-[#464C52]"
                  }`}
                />
                <ErrorMessage  name="firstName" component="div" className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="flex-1">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  className={`w-full px-4 text-sm py-4 border rounded focus:outline-none focus:border-black  ${
                    errors.lastName && touched.lastName
                      ? "border-red-700 text-red-700"
                      : "border-gray-300 text-[#464C52]"
                  }`}
                />
                <ErrorMessage  name="lastName"   component="div"   className="text-red-500 text-xs mt-1"/>
              </div>
            </div>
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={`w-full text-sm px-4 py-4 border rounded focus:outline-none focus:border-black  ${
                  errors.email && touched.email
                    ? "border-red-700 text-red-700"
                    : "border-gray-300 text-[#464C52]"
                }`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Create a Password*"
                className={`w-full text-sm px-4 py-4 border rounded focus:outline-none focus:border-black  pr-12 ${
                  errors.password && touched.password
                    ? "border-red-700 text-red-700"
                    : "border-gray-300 text-[#464C52]" }`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-500">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <div className="mt-3 flex  items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${ values.password && /[a-z]/.test(values.password) ? "bg-black"   : "bg-gray-300" }`} >
                    {values.password && /[a-z]/.test(values.password) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      values.password && /[a-z]/.test(values.password)
                        ? "text-black"
                        : "text-gray-500"
                    }`}
                  > 1 lowercase character </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${ values.password && /[A-Z]/.test(values.password)  ? "bg-black"  : "bg-gray-300"}`}>
                    {values.password && /[A-Z]/.test(values.password) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${ values.password && /[A-Z]/.test(values.password)  ? "text-black"   : "text-gray-500" }`}
                  > 1 uppercase character </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${ values.password && /\d/.test(values.password) ? "bg-black" : "bg-gray-300"}`}>
                    {values.password && /\d/.test(values.password) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${ values.password && /\d/.test(values.password)  ? "text-black" : "text-gray-500" }`}> 1 number  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      values.password && values.password.length >= 6 ? "bg-black" : "bg-gray-300"}`}>
                    {values.password && values.password.length >= 6 && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span  className={`text-sm ${ values.password && values.password.length >= 6 ? "text-black" : "text-gray-500"}`}> 6 character minimum </span>
                </div>
              </div>
              <ErrorMessage  name="password"  component="div"   className="text-red-500 text-xs mt-1" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Field
                  as="select" 
                  name="gender"
                  className={`w-full text-sm px-4 py-4 border rounded focus:outline-none focus:border-black text-[#464C52] ${
                    errors.gender && touched.gender
                      ? "border-red-500": "border-gray-300" }`}>
                  <option value="">Select Gender*</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage   name="gender" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="flex-1">
                <Field
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth*"
                  className={`w-full text-sm px-4 py-4 border rounded focus:outline-none focus:border-black text-[#464C52] ${
                    errors.dateOfBirth && touched.dateOfBirth ? "border-red-500" : "border-gray-300" }`} />
                <ErrorMessage  name="dateOfBirth" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>
            <div className="flex items-start gap-3 mt-6">
              <div
                className="mt-1 cursor-pointer" onClick={() => setFieldValue("agreeToUpdates", !values.agreeToUpdates) }>
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                    values.agreeToUpdates  ? "bg-black border-black"  : "border-gray-400"  }`} >
                  {values.agreeToUpdates && ( <Check className="text-white" size={16} /> )}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#484848] leading-5">
                  I would like to receive updates on the latest products and
                  promotions via email or other channels. See
                  <a href="#" className="underline text-[#464C52]"> Privacy Policy </a>, which includes our<a href="#" className="underline text-[#464C52]"> Notice of Financial Incentive</a> and the <a href="#" className="underline text-[#464C52]">Terms and Conditions </a> , for more information.</p>
              </div>
            </div>
            <button
              type="submit" disabled={isSubmitting || isLoading} 
              className="w-full bg-black text-white py-4 rounded font-medium text-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Creat Account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default AccountMenu;

import React, { useState } from 'react'
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import {useLoginMutation} from '../../store/eccomerceApi'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Login = () => {
     const [showPassword, setShowPassword] = React.useState(false)
     const [email ,setEmail] = useState('')
     const [password ,setPassword] = useState('')

     const [login ,{isLoading}] = useLoginMutation()
     const navigate = useNavigate()

     const handleLogin = async() =>{
        try {
            let user = await login({email,password}).unwrap()
           localStorage.setItem("user", JSON.stringify(user))
             toast.success("Operation is succesed");
           
             console.log(user)
              if (user.user.role == "admin") {
                navigate("/admin/category")
              } else {
                navigate("/")
              }
        } catch (error) {
            console.log(error)
             toast.error(error?.data.message)
        }
     }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign in</h1>
            <p className="text-gray-600"> Sign in to access your account</p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              disabled={isLoading}
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-6 w-6" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
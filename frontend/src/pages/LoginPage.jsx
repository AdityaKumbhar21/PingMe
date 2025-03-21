import React, { useState } from 'react';
import {useAuthStore} from "../store/useAuthStore";
import {Mail, Lock, MessageSquare, Loader2, EyeOff, Eye}  from "lucide-react"
import {Link} from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";


const LoginPage = () => {
  const {login, isLoggingIn} = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const validateForm = ()=>{
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password) return toast.error("Password is required");
    if(formData.password.length < 6) return toast.error("Password must atleast contain 6 characters.");

    return true;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const success = validateForm();
    if(success === true) login(formData);
  }

  return (
    <div className='min-h-screen  grid lg:grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
          <div className='w-full max-w-md space-y-8'>
            {/* Logo */}
            <div className='text-center mb-8'>
              <div className='flex flex-col items-center gap-2 group'>
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="size-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Welcome Back User</h1>
                <p className="text-base-content/60">Some of your friends missed you! 😊</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className='space-y-6'>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <Mail className="w-5 h-5 text-gray-500 mx-3" />
                  <input
                    type="email"
                    className={`input flex-1 p-2 outline-none border-0 focus:outline-none focus:ring-0 focus:border-transparent`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
                
              <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <Lock className="w-5 h-5 text-gray-500 mx-3" />
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`input flex-1 p-2 border-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent`}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />

                      <button
                        type="button"
                        className="px-3 hover:cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)} // toggling the password
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-500" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                  </div>
              </div>
              
              <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
            </form>

            <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
          </div>
      </div>
        
        {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default LoginPage;
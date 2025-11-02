import React, { useState } from 'react';
import { ShieldCheck, Users, CheckCircle, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 lg:p-8" style={{
      backgroundImage: 'linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)',
      backgroundSize: '80px 80px',
      backgroundPosition: '0 0, 0 40px, 40px -40px, -40px 0px',
      backgroundColor: '#0a0a0a'
    }}>
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-16 lg:gap-20">
        
        {/* Left Side */}
        <div className="space-y-12 px-4 lg:px-8">
          {/* Logo and Title */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-7-5z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">Superlist</span>
            </div>
            
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">Start your 30-day free trial</h1>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-base font-medium">No credit card required</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-10">
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center border border-yellow-400/20">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white">Invite unlimited colleagues</h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  Integrate with guaranteed developer-friendly APIs or openly to choose a build-ready or low-code solution.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center border border-yellow-400/20">
                <ShieldCheck className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white">Ensure compliance</h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  Receive detailed insights on all your numbers in real-time, see where visitors are coming from.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center border border-yellow-400/20">
                <ShieldCheck className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white">Built-in security</h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  Keep your team members and customers in the loop by sharing your dashboard public.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex gap-8 text-base text-gray-400">
            <a href="#" className="hover:text-white transition-colors font-medium">Terms</a>
            <a href="#" className="hover:text-white transition-colors font-medium">Privacy</a>
            <a href="#" className="hover:text-white transition-colors font-medium">Docs</a>
            <a href="#" className="hover:text-white transition-colors font-medium">Helps</a>
            <div className="flex items-center gap-2 ml-auto">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
              </svg>
              <span className="font-medium">English</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-3xl p-10 lg:p-12 shadow-2xl border border-gray-800">
          {/* Social Login Buttons */}
          <div className="mb-10">
            <p className="text-gray-300 text-base font-medium mb-5">Register with:</p>
            <div className="grid grid-cols-3 gap-4">
              <button className="flex items-center justify-center gap-2 px-5 py-4 bg-[#3a3a3a] hover:bg-[#454545] rounded-xl transition-all text-sm font-medium border border-gray-700 hover:border-gray-600">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="hidden sm:inline">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-4 bg-[#3a3a3a] hover:bg-[#454545] rounded-xl transition-all text-sm font-medium border border-gray-700 hover:border-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="hidden sm:inline">Github</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-4 bg-[#3a3a3a] hover:bg-[#454545] rounded-xl transition-all text-sm font-medium border border-gray-700 hover:border-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
                </svg>
                <span className="hidden sm:inline">Gitlab</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-base">
              <span className="px-5 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] text-gray-300 font-medium">Or</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-medium text-gray-200 mb-3">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Alaska" 
                    className="w-full pl-12 pr-4 py-4 bg-[#3a3a3a] border border-gray-600 rounded-xl text-white text-base placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-200 mb-3">Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Young" 
                    className="w-full pl-12 pr-4 py-4 bg-[#3a3a3a] border border-gray-600 rounded-xl text-white text-base placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-base font-medium text-gray-200 mb-3">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="alaska2104" 
                  className="w-full pl-12 pr-4 py-4 bg-[#3a3a3a] border border-gray-600 rounded-xl text-white text-base placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-base font-medium text-gray-200 mb-3">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="alaskayoung@gmail.com" 
                  className="w-full pl-12 pr-4 py-4 bg-[#3a3a3a] border border-gray-600 rounded-xl text-white text-base placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-base font-medium text-gray-200 mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password" 
                  className="w-full pl-12 pr-14 py-4 bg-[#3a3a3a] border border-gray-600 rounded-xl text-white text-base placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-3">Minimum length is 8 characters.</p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-yellow-400/50 mt-8"
            >
              Sign Up
            </button>
          </form>

          {/* Terms and Login Link */}
          <div className="mt-8 space-y-5">
            <p className="text-sm text-gray-400 text-center leading-relaxed">
              By creating an account, you agree to the{' '}
              <a href="#" className="text-white underline hover:text-yellow-400 transition-colors">Terms of Service</a>.
              We'll occasionally send you account-related emails.
            </p>
            <p className="text-base text-center text-gray-300">
              Already have an account?{' '}
              <a href="#" className="text-white hover:text-yellow-400 font-semibold transition-colors">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

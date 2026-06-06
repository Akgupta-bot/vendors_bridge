import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, Globe, Shield, Lock, 
  FileText, Check, Upload, ArrowRight, ArrowLeft, Eye, EyeOff
} from 'lucide-react';
import LoginCharacter from '../../assets/login-character.svg';

type AuthMode = 'LOGIN' | 'REGISTER';

export const AuthPages: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [showPassword, setShowPassword] = useState(false);

  // Registration Form State
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    role: 'VENDOR',
    password: '',
    confirmPassword: '',
    additionalInfo: '',
    agreeTerms: false,
  });

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  // Profile Photo State
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // h-screen and overflow-hidden guarantees NO scrollbars and a perfect dynamic screen fit
    <div className="h-screen w-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans">
      
      {/* Outer Card Wrapper matching the Pinterest frame */}
      <div className="w-full max-w-5xl h-full max-h-[720px] bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden flex flex-col md:flex-row">
        
        <AnimatePresence mode="wait">
          {mode === 'LOGIN' ? (
            /* ========================================================================= */
            /* 1. MINIMALIST LOGIN PANEL (Left side matching your reference image)      */
            /* ========================================================================= */
            <motion.div 
              key="login-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full md:w-1/2 h-full p-8 lg:p-16 flex flex-col justify-between bg-white"
            >
              {/* Spacer/Logo placeholder matching reference top gap */}
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-xs font-bold">
                VB
              </div>

              <div className="my-auto max-w-sm w-full mx-auto">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back!</h2>
                <p className="text-slate-400 text-xs mt-2 font-medium">
                  Simplify your workflow and boost your productivity with VendorBridge ERP.
                </p>

                <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Username" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition text-sm"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    />
                  </div>

                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-5 py-3 pr-12 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition text-sm"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  <div className="text-right">
                    <button type="button" className="text-xs font-semibold text-slate-900 hover:underline">
                      Forgot Password?
                    </button>
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-2 bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3 rounded-full transition-all text-sm shadow-md"
                  >
                    Login
                  </button>
                </form>

                {/* Subtle Divider Line */}
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-4 text-[11px] text-slate-400 font-medium uppercase tracking-wider">or continue with</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                {/* Social Badges matching your reference layout */}
                <div className="flex justify-center gap-3">
                  {['G', '', 'f'].map((icon, idx) => (
                    <button key={idx} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-800 hover:bg-slate-50 transition text-sm">
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-400 font-medium">
                  Not a member?{' '}
                  <button onClick={() => setMode('REGISTER')} className="text-emerald-600 font-bold hover:underline">
                    Register now
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* 2. REGISTRATION PANEL (Fills the view nicely with dynamic scrolling)     */
            /* ========================================================================= */
            <motion.div 
              key="register-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full md:w-1/2 h-full p-6 lg:p-10 flex flex-col justify-between bg-white overflow-y-auto custom-scrollbar"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
                    <p className="text-slate-400 text-xs font-medium">Join our centralized procurement platform.</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setMode('LOGIN')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  
                  {/* Photo Section */}
                  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-14 h-14 rounded-full border border-dashed border-slate-300 hover:border-emerald-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-white transition relative shrink-0"
                    >
                      {profilePreview ? (
                        <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Upload size={16} className="text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Profile Photo</p>
                      <p className="text-[11px] text-slate-400">Click circle container to browse asset file.</p>
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  </div>

                  {/* Standardized Input Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" placeholder="First Name" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                      value={registerForm.firstName} onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                    />
                    <input 
                      type="text" placeholder="Last Name" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                      value={registerForm.lastName} onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                    />
                  </div>

                  <input 
                    type="email" placeholder="Email Address" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                    value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  />

                  <input 
                    type="tel" placeholder="Phone Number" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                    value={registerForm.phone} onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                  />

                  {/* Select Options */}
                  <div className="grid grid-cols-2 gap-3">
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-50 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition appearance-none text-slate-700"
                      value={registerForm.country} onChange={(e) => setRegisterForm({...registerForm, country: e.target.value})}
                    >
                      <option value="" disabled>Country Location</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="DE">Germany</option>
                    </select>

                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-50 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition appearance-none text-slate-700"
                      value={registerForm.role} onChange={(e) => setRegisterForm({...registerForm, role: e.target.value})}
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="MANAGER">Manager</option>
                      <option value="PROCUREMENT_OFFICER">Procurement Officer</option>
                      <option value="VENDOR">Vendor</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="password" placeholder="Password" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                      value={registerForm.password} onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    />
                    <input 
                      type="password" placeholder="Confirm Password" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                      value={registerForm.confirmPassword} onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                    />
                  </div>

                  <textarea 
                    rows={2} placeholder="Additional Information Notes..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition resize-none"
                    value={registerForm.additionalInfo} onChange={(e) => setRegisterForm({...registerForm, additionalInfo: e.target.value})}
                  />

                  <div className="flex items-start gap-2 px-1">
                    <input 
                      type="checkbox" id="terms" className="mt-0.5 accent-slate-900 h-3.5 w-3.5 rounded"
                      checked={registerForm.agreeTerms} onChange={(e) => setRegisterForm({...registerForm, agreeTerms: e.target.checked})}
                    />
                    <label htmlFor="terms" className="text-[10px] text-slate-400 leading-tight select-none">
                      I agree to the terms and data storage conditions.
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-2.5 rounded-full transition text-xs shadow-md"
                  >
                    Register Button
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* ========================================================================= */}
{/* 3. MINT GRAPHIC PANEL (Right side perfectly copying your image reference) */}
{/* ========================================================================= */}
<div className="hidden md:flex md:w-1/2 h-full bg-[#f4fbf7] p-12 flex-col justify-between items-center text-center relative select-none">
  {/* Top Pagination Dot Trackers mimicking your card image */}
  <div className="flex gap-1.5 mt-2">
    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
    <div className="w-4 h-1.5 rounded-full bg-emerald-500" />
    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
  </div>
  
  {/* Centered Decorative Illustration Container */}
  <div className="relative my-auto flex items-center justify-center max-w-[280px] lg:max-w-[320px]">
    {/* Local Minimalist Tech Vector Character Image */}
    <motion.img 
      src={LoginCharacter} 
      alt="Workspace Character" 
      className="w-full h-auto object-contain px-4"
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
    />


    {/* Simulated Vector Floating Card Items - Bottom Right */}
    <div className="absolute bottom-10 right-[-10px] bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-lg text-[9px] font-bold text-slate-700 transform rotate-3">
      ✨ Organized Workflow
    </div>
  </div>
  
  {/* Explanatory Typography Core Footer */}
  <div className="max-w-xs mb-4">
    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Make your work easier and organized</h3>
    <p className="text-slate-400 text-xs mt-2 font-medium">
      Centralized corporate data streams inside an elegant dashboard frame.
    </p>
  </div>
</div>

      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Heart, Building2, Droplets, User, Lock, Mail, Info, Shield, Users, Clock, Eye, EyeOff, Phone, UserPlus, Calendar } from 'lucide-react';

export default function VitaDrop() {
  const [activeTab, setActiveTab] = useState('donor');
  const [showAbout, setShowAbout] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    hospitalId: '',
    bloodBankId: '',
    name: '',
    mobile: '',
    confirmPassword: '',
    gender: '',
    dob: ''
  });

  const validateField = (name, value) => {
    const errors = { ...validationErrors };
    
    switch (name) {
      case 'mobile':
        if (value && !/^\d{10}$/.test(value)) {
          errors.mobile = 'Mobile number must be exactly 10 digits';
        } else {
          delete errors.mobile;
        }
        break;
      case 'email':
        if (value && !(/^[^\s@]+@[^\s@]+\.[^\s@]*com[^\s@]*$/i.test(value))) {
          errors.email = 'Email must contain @ and .com';
        } else {
          delete errors.email;
        }
        break;
      case 'hospitalId':
        if (value && !/^\d{10}$/.test(value)) {
          errors.hospitalId = 'Hospital ID must be exactly 10 digits';
        } else {
          delete errors.hospitalId;
        }
        break;
      case 'bloodBankId':
        if (value && !/^\d{10}$/.test(value)) {
          errors.bloodBankId = 'Blood Bank ID must be exactly 10 digits';
        } else {
          delete errors.bloodBankId;
        }
        break;
      default:
        break;
    }
    
    setValidationErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For mobile, hospital ID, and blood bank ID, only allow numeric input
    if ((name === 'mobile' || name === 'hospitalId' || name === 'bloodBankId') && value && !/^\d*$/.test(value)) {
      return;
    }
    
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    
    // Validate the field
    validateField(name, value);
    
    // Check password match
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password') {
        setPasswordMatch(newFormData.confirmPassword === '' || newFormData.confirmPassword === value);
      } else {
        setPasswordMatch(newFormData.password === value);
      }
    }
  };

  const handleSubmit = () => {
    // Check for validation errors
    const hasErrors = Object.keys(validationErrors).length > 0;
    
    if (hasErrors) {
      alert('Please fix all validation errors before submitting.');
      return;
    }
    
    if (showRegister && !passwordMatch) {
      alert('Passwords do not match!');
      return;
    }
    
    // Check required fields
    if (activeTab === 'donor') {
      if (showRegister) {
        if (!formData.name || !formData.mobile || !formData.email || !formData.gender || !formData.dob || !formData.password || !formData.confirmPassword) {
          alert('Please fill in all required fields.');
          return;
        }
      } else {
        if (!formData.email || !formData.password) {
          alert('Please fill in all required fields.');
          return;
        }
      }
    } else if (activeTab === 'hospital') {
      if (!formData.hospitalId || !formData.password) {
        alert('Please fill in all required fields.');
        return;
      }
    } else if (activeTab === 'bloodbank') {
      if (!formData.bloodBankId || !formData.password) {
        alert('Please fill in all required fields.');
        return;
      }
    }
    
    const action = showRegister ? 'Registration' : 'Login';
    alert(`${action} successful for ${activeTab}!`);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      hospitalId: '',
      bloodBankId: '',
      name: '',
      mobile: '',
      confirmPassword: '',
      gender: '',
      dob: ''
    });
    setShowRegister(false);
    setPasswordMatch(true);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setValidationErrors({});
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  if (showAbout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-3xl">🩸</span>
                <h1 className="text-4xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300">VitaDrop</h1>
              </div>
              <p className="text-gray-600 text-lg">Blood Donation Management Platform</p>
            </div>

            {/* About Content */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-red-600 text-white p-6">
                <h2 className="text-3xl font-bold text-center">About VitaDrop</h2>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Mission */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-red-600 mb-4">Our Mission</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    VitaDrop is dedicated to bridging the gap between blood donors and those in need. 
                    We provide a comprehensive platform that connects hospitals, blood banks, and donors 
                    to ensure life-saving blood is available when and where it's needed most.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-red-50 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 hover:bg-red-100">
                    <Users className="w-12 h-12 text-red-600 mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                    <h4 className="text-xl font-semibold text-red-600 mb-2">For Donors</h4>
                    <p className="text-gray-600">
                      Register as a donor, track your donations, receive notifications for urgent needs, 
                      and make a difference in someone's life.
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-red-50 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 hover:bg-red-100">
                    <Building2 className="w-12 h-12 text-red-600 mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                    <h4 className="text-xl font-semibold text-red-600 mb-2">For Hospitals</h4>
                    <p className="text-gray-600">
                      Manage blood inventory, request specific blood types, track patient needs, 
                      and coordinate with blood banks efficiently.
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-red-50 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 hover:bg-red-100">
                    <Droplets className="w-12 h-12 text-red-600 mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                    <h4 className="text-xl font-semibold text-red-600 mb-2">For Blood Banks</h4>
                    <p className="text-gray-600">
                      Monitor blood storage, manage expiry dates, coordinate with hospitals, 
                      and organize donation drives effectively.
                    </p>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-red-600 text-white rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-6 text-center">Impact Statistics</h3>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold mb-2">10,000+</div>
                      <div className="text-red-100">Active Donors</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">500+</div>
                      <div className="text-red-100">Partner Hospitals</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">25,000+</div>
                      <div className="text-red-100">Lives Saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAbout(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Back to Login
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-gray-500">
              <p>&copy; 2025 VitaDrop - All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl">🩸</span>
            <h1 className="text-4xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300 cursor-default">VitaDrop</h1>
          </div>
          <p className="text-gray-600 hover:text-gray-700 transition-colors duration-200">Blood Donation Management Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
          {/* Tab Header */}
          <div className="bg-red-600 p-1">
            <div className="flex">
              {['hospital', 'bloodbank', 'donor'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`flex-1 py-3 px-2 text-sm font-semibold rounded-lg m-1 transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab
                      ? 'bg-white text-red-600 shadow-md'
                      : 'text-white hover:bg-red-500 hover:shadow-lg'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {tab === 'hospital' && <Building2 className="w-4 h-4 mb-1 transition-transform duration-200 hover:scale-110" />}
                    {tab === 'bloodbank' && <Droplets className="w-4 h-4 mb-1 transition-transform duration-200 hover:scale-110" />}
                    {tab === 'donor' && <User className="w-4 h-4 mb-1 transition-transform duration-200 hover:scale-110" />}
                    <span>{tab === 'bloodbank' ? 'Blood Bank' : tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 hover:text-red-600 transition-colors duration-300">
              {showRegister ? 'Register as Donor' : `Login as ${activeTab === 'bloodbank' ? 'Blood Bank' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
            </h2>

            {/* Registration Fields for Donor */}
            {showRegister && activeTab === 'donor' && (
              <>
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-red-500 transition-colors duration-200" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Mobile Number
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-red-500 transition-colors duration-200" />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      maxLength="10"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300 hover:shadow-md ${
                        validationErrors.mobile 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-red-500 hover:border-gray-300'
                      }`}
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                  {validationErrors.mobile && (
                    <p className="text-red-500 text-sm mt-1 animate-pulse">{validationErrors.mobile}</p>
                  )}
                </div>

                {/* Gender Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Gender
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-red-500 transition-colors duration-200" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Date of Birth Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Date of Birth
                  </label>
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-red-500 transition-colors duration-200" />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Hospital ID Field */}
            {activeTab === 'hospital' && !showRegister && (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Hospital ID
                </label>
                <div className="relative group">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-red-500 transition-colors duration-200" />
                  <input
                    type="text"
                    name="hospitalId"
                    value={formData.hospitalId}
                    onChange={handleInputChange}
                    maxLength="10"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300 hover:shadow-md ${
                      validationErrors.hospitalId 
                        ? 'border-red-400 focus:border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-red-500 hover:border-gray-300'
                    }`}
                    placeholder="Enter Hospital ID"
                    required
                  />
                </div>
                {validationErrors.hospitalId && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">{validationErrors.hospitalId}</p>
                )}
              </div>
            )}

            {/* Blood Bank ID Field */}
            {activeTab === 'bloodbank' && !showRegister && (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Blood Bank ID
                </label>
                <div className="relative group">
                  <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-red-500 transition-colors duration-200" />
                  <input
                    type="text"
                    name="bloodBankId"
                    value={formData.bloodBankId}
                    onChange={handleInputChange}
                    maxLength="10"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300 hover:shadow-md ${
                      validationErrors.bloodBankId 
                        ? 'border-red-400 focus:border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-red-500 hover:border-gray-300'
                    }`}
                    placeholder="Enter Blood Bank ID"
                    required
                  />
                </div>
                {validationErrors.bloodBankId && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">{validationErrors.bloodBankId}</p>
                )}
              </div>
            )}

            {/* Email Field - Only for donor */}
            {(activeTab === 'donor' || showRegister) && (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-red-500 transition-colors duration-200" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300 hover:shadow-md ${
                      validationErrors.email 
                        ? 'border-red-400 focus:border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-red-500 hover:border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">{validationErrors.email}</p>
                )}
              </div>
            )}

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-red-500 transition-colors duration-200" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field - Only for registration */}
            {showRegister && (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-red-500 transition-colors duration-200" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300 hover:shadow-md ${
                      passwordMatch 
                        ? 'border-gray-200 focus:border-red-500 hover:border-gray-300' 
                        : 'border-red-400 focus:border-red-500 bg-red-50'
                    }`}
                    placeholder="Re-enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {!passwordMatch && formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">Passwords do not match</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl active:scale-95"
            >
              {showRegister ? 'Register' : 'Sign In'}
            </button>

            {/* Links */}
            <div className="flex justify-between text-sm">
              {!showRegister && (
                <button className="text-red-600 hover:text-red-700 font-medium transition-all duration-200 hover:underline transform hover:scale-105">
                  Forgot Password?
                </button>
              )}
              {activeTab === 'donor' && (
                <button
                  onClick={() => setShowRegister(!showRegister)}
                  className="text-red-600 hover:text-red-700 font-medium transition-all duration-200 hover:underline transform hover:scale-105 flex items-center gap-1"
                >
                  <UserPlus className="w-4 h-4" />
                  {showRegister ? 'Back to Login' : 'Register'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* About Us Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAbout(true)}
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full shadow-md hover:shadow-lg"
          >
            <Info className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
            About Us
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>&copy; 2025 VitaDrop - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
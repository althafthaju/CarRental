// src/components/SignUp.jsx
import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    address: '',
    userLicense: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement signup logic here
    console.log('Signing up:', formData);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="tel" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="userLicense" placeholder="User License" value={formData.userLicense} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/login`, { email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success("Login Successful!", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.data.message || "Invalid credentials", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{
      backgroundImage: "url('/22.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div className='shadow-lg bg-white p-5' style={{
        width: '100%',
        maxWidth: '400px',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      }}>
        <h2 className='text-center mb-4' style={{ fontWeight: '600', color: '#333' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group mb-3'>
            <label style={{ fontWeight: '500' }}>Email</label>
            <input
              type='email'
              name='email'
              className='form-control rounded-pill px-4 py-2'
              onChange={(e) => Setemail(e.target.value)}
              required
            />
          </div>

          <div className='form-group mb-4'>
            <label style={{ fontWeight: '500' }}>Password</label>
            <input
              type='password'
              name='password'
              className='form-control rounded-pill px-4 py-2'
              onChange={(e) => Setpassword(e.target.value)}
              required
            />
          </div>

          <button type='submit' className='btn btn-warning w-100 rounded-pill fw-bold'>
            Login
          </button>
        </form>

        <p className='text-center mt-4 mb-0'>
          <b>Don't have an account?</b> <Link to="/register" className='text-decoration-none'>Register</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [conf_pass, Setconf_pass] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const checkValidation = () => {
    if (!formdata.username || !formdata.email || !formdata.password || !conf_pass) {
      toast.warning("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formdata.email.toLowerCase())) {
      toast.warning("Please enter a valid email", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      return false;
    }

    if (formdata.password !== conf_pass) {
      toast.warning("Passwords do not match", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkValidation()) {
      try {
        const response = await axios.post('http://localhost:3000/register', formdata);
        console.log("Response:", response.data);
        toast.success("Registration Successful!", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });

        setFormData({ username: '', email: '', password: '' });
        Setconf_pass("");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (err) {
        console.error("Registration Error:", err);
        toast.error("Registration failed. Try again!", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
      }
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
      <div className="shadow-lg bg-white p-5" style={{
        width: '100%',
        maxWidth: '450px',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <h2 className="text-center mb-4" style={{ fontWeight: '600', color: '#333' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label style={{ fontWeight: '500' }}>Username</label>
            <input
              type="text"
              name="username"
              className="form-control rounded-pill px-4 py-2"
              value={formdata.username}
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label style={{ fontWeight: '500' }}>Email</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-pill px-4 py-2"
              value={formdata.email}
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label style={{ fontWeight: '500' }}>Password</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-pill px-4 py-2"
              value={formdata.password}
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label style={{ fontWeight: '500' }}>Confirm Password</label>
            <input
              type="password"
              name="conf_password"
              className="form-control rounded-pill px-4 py-2"
              value={conf_pass}
              onChange={(e) => Setconf_pass(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold">
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;

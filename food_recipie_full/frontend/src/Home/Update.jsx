import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const [formdata, setFormData] = useState({
    name: "",
    ingredients: "",
    timeToCook: "",
    steps: "",
    image: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        const { name, ingredients, timeToCook, steps, image } = response.data;
        setFormData({
          name,
          ingredients: ingredients.join(', '),
          timeToCook,
          steps: steps.join('. '),
          image: image || null,
        });
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formdata,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You need to log in first", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const formattedData = new FormData();
    formattedData.append("name", formdata.name);
    formattedData.append("ingredients", formdata.ingredients);
    formattedData.append("timeToCook", formdata.timeToCook);
    formattedData.append("steps", formdata.steps);

    if (formdata.image) {
      formattedData.append("image", formdata.image);
    }

    try {
      const response = await axios.put(`http://localhost:3000/recipes/${id}`, formattedData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      if (response.status === 200) {
        toast.success("Recipe Updated Successfully", {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Error, data is not valid", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      minHeight: '100vh',
      padding: '50px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div className="container bg-white p-5 shadow-lg rounded-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4" style={{ fontWeight: '600', color: '#333' }}>Update Recipe</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form-group mb-3'>
            <label className="fw-semibold">Recipe Name</label>
            <input
              type='text'
              name='name'
              className='form-control rounded-pill px-4 py-2'
              value={formdata.name}
              onChange={handleInput}
              required
            />
          </div>

          <div className='form-group mb-3'>
            <label className="fw-semibold">Ingredients (comma-separated)</label>
            <input
              type='text'
              name='ingredients'
              className='form-control rounded-pill px-4 py-2'
              value={formdata.ingredients}
              onChange={handleInput}
              required
            />
          </div>

          <div className='form-group mb-3'>
            <label className="fw-semibold">Time to Cook</label>
            <input
              type='text'
              name='timeToCook'
              className='form-control rounded-pill px-4 py-2'
              value={formdata.timeToCook}
              onChange={handleInput}
              required
            />
          </div>

          <div className='form-group mb-3'>
            <label className="fw-semibold">Steps (separated by full stops)</label>
            <textarea
              name='steps'
              className='form-control rounded-3 px-3 py-2'
              value={formdata.steps}
              onChange={handleInput}
              rows={4}
              required
            ></textarea>
          </div>

          <div className='form-group mb-4'>
            <label className="fw-semibold">Upload New Recipe Image (optional)</label>
            <input
              type='file'
              name='image'
              className='form-control'
              onChange={handleFileChange}
            />
          </div>

          <button type='submit' className='btn btn-warning w-100 fw-bold rounded-pill'>
            Update Recipe
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Update;

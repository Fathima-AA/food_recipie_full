import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function RecipeCard() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/recipes/${id}`)
      .then((response) => {
        console.log("Fetched data:", response.data);
        setRecipe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe details", error);
        setLoading(false);
      });
  }, [id]);

  // Styles object
  const styles = {
    pageContainer: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '40px 20px',
      minHeight: '100vh',
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    imageColumn: {
      flex: '1',
      minWidth: '300px',
      padding: '20px'
    },
    imageContainer: {
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      backgroundColor: '#f8f9fa'
    },
    image: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      display: 'block'
    },
    detailsColumn: {
      flex: '1',
      minWidth: '300px',
      padding: '30px'
    },
    title: {
      color: '#FF6B6B',
      fontSize: '2.2rem',
      marginTop: '0',
      marginBottom: '15px',
      fontWeight: '700'
    },
    cookingTime: {
      fontSize: '1.1rem',
      color: '#495057',
      marginBottom: '25px',
      padding: '8px 16px',
      backgroundColor: '#fff4e6',
      borderRadius: '8px',
      display: 'inline-block'
    },
    sectionTitle: {
      color: '#495057',
      fontSize: '1.5rem',
      marginTop: '30px',
      marginBottom: '15px',
      fontWeight: '600',
      borderBottom: '2px solid #FF6B6B',
      paddingBottom: '8px',
      display: 'inline-block'
    },
    ingredientsList: {
      listStyleType: 'none',
      padding: '0',
      margin: '0'
    },
    ingredientItem: {
      padding: '8px 0',
      borderBottom: '1px dashed #e9ecef',
      display: 'flex',
      alignItems: 'center'
    },
    bulletPoint: {
      color: '#FF6B6B',
      marginRight: '10px',
      fontSize: '1.2rem'
    },
    stepsList: {
      paddingLeft: '20px',
      margin: '0'
    },
    stepItem: {
      padding: '10px 0',
      lineHeight: '1.6'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column'
    },
    loadingText: {
      color: '#FF6B6B',
      fontSize: '1.5rem',
      marginTop: '20px'
    },
    loadingSpinner: {
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #FF6B6B',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    },
    divider: {
      margin: '30px 0',
      height: '1px',
      backgroundColor: '#e9ecef'
    },
    badge: {
      padding: '5px 12px',
      backgroundColor: '#4DABF7',
      color: 'white',
      borderRadius: '20px',
      fontSize: '0.9rem',
      marginRight: '8px',
      display: 'inline-block'
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #FF6B6B',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={styles.loadingText}>Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Recipe not found</p>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.row}>
          {/* Recipe Image */}
          <div style={styles.imageColumn}>
            <div style={styles.imageContainer}>
              <img
                style={styles.image}
                src={recipe.image || "placeholder.jpg"}
                alt={recipe.name || "Recipe"}
              />
            </div>
          </div>

          {/* Recipe Details */}
          <div style={styles.detailsColumn}>
            <h1 style={styles.title}>{recipe.name}</h1>
            
            <div style={styles.cookingTime}>
              <span style={{marginRight: '8px'}}>⏱️</span>
              <strong>Cooking Time:</strong> {recipe.timeToCook || "N/A"}
            </div>

            <div style={styles.divider}></div>

            {/* Ingredients */}
            <h2 style={styles.sectionTitle}>Ingredients</h2>
            <ul style={styles.ingredientsList}>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} style={styles.ingredientItem}>
                    <span style={styles.bulletPoint}>•</span>
                    {ingredient}
                  </li>
                ))
              ) : (
                <li style={styles.ingredientItem}>No ingredients available.</li>
              )}
            </ul>

            <div style={styles.divider}></div>

            {/* Steps */}
            <h2 style={styles.sectionTitle}>Preparation Steps</h2>
            <ol style={styles.stepsList}>
              {recipe.steps && recipe.steps.length > 0 ? (
                recipe.steps.map((step, index) => (
                  <li key={index} style={styles.stepItem}>
                    {step}
                  </li>
                ))
              ) : (
                <li style={styles.stepItem}>No steps provided.</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
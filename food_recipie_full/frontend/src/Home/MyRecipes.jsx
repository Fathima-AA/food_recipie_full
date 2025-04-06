import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://localhost:3000/my-recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMyRecipes(response.data);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    fetchMyRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.delete(`http://localhost:3000/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the state to remove the deleted recipe from the list
      setMyRecipes(myRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Styles object
  const styles = {
    pageContainer: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#FF6B6B',
      fontSize: '2.5rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    },
    cardsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '25px',
      marginTop: '20px'
    },
    card: {
      width: '280px',
      height: '400px',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      backgroundColor: 'white',
      border: 'none'
    },
    cardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
    },
    cardImage: {
      height: '200px',
      objectFit: 'cover',
      width: '100%',
      borderBottom: '3px solid #FF6B6B'
    },
    cardBody: {
      padding: '20px'
    },
    cardTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#343a40',
      marginBottom: '10px',
      height: '40px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    cardText: {
      fontSize: '1rem',
      color: '#6c757d',
      marginBottom: '15px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    updateButton: {
      backgroundColor: '#4DABF7',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      textDecoration: 'none',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(77, 171, 247, 0.3)'
    },
    deleteButton: {
      backgroundColor: '#FF6B6B',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      boxShadow: '0 2px 4px rgba(255, 107, 107, 0.3)'
    },
    createButtonContainer: {
      width: '100%',
      textAlign: 'center',
      marginTop: '40px'
    },
    createButton: {
      backgroundColor: '#51CF66',
      color: 'white',
      padding: '12px 25px',
      fontSize: '1.1rem',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block',
      boxShadow: '0 4px 8px rgba(81, 207, 102, 0.3)',
      transition: 'all 0.3s ease'
    },
    noRecipesMessage: {
      textAlign: 'center',
      color: '#6c757d',
      fontSize: '1.2rem',
      marginTop: '40px',
      marginBottom: '40px'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.header}>My Culinary Creations</h2>
      
      <div style={styles.cardsContainer}>
        {myRecipes.length === 0 ? (
          <div style={styles.noRecipesMessage}>
            <p>You haven't created any recipes yet.</p>
            <p>Start your culinary journey today!</p>
            <span style={{fontSize: '3rem'}}>👨‍🍳</span>
          </div>
        ) : (
          myRecipes.map((recipe) => (
            <div 
              key={recipe._id} 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={recipe.image ? recipe.image : "default-recipe.jpg"}
                alt={recipe.name}
                style={styles.cardImage}
                onClick={() => navigate(`/recipe/${recipe._id}`)}
              />
              <div style={styles.cardBody}>
                <h5 style={styles.cardTitle}>{recipe.name}</h5>
                <p style={styles.cardText}>
                  <span style={{color: '#FF6B6B', fontWeight: 'bold'}}>⏱️ </span>
                  <strong>{recipe.timeToCook}</strong>
                </p>
                <div style={styles.buttonContainer}>
                  <Link 
                    to={`/update_recipe/${recipe._id}`} 
                    style={styles.updateButton}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#339af0';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#4DABF7';
                    }}
                  >
                    Update
                  </Link>
                  <button 
                    style={styles.deleteButton}
                    onClick={() => handleDeleteRecipe(recipe._id)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#ff8c8c';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#FF6B6B';
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div style={styles.createButtonContainer}>
        <Link 
          to="/create_recipe" 
          style={styles.createButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#40c057';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(81, 207, 102, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#51CF66';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 8px rgba(81, 207, 102, 0.3)';
          }}
        >
          + Create New Recipe
        </Link>
      </div>
    </div>
  );
};

export default MyRecipes;
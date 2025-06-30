import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FavoritesContext } from "../components/FavoritesContext";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { favoritesState, dispatch } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipe(res.data.meals[0]);
      } catch (error) {
        console.error("Failed to fetch recipe:", error.message);
      }
    };

    fetchDetails();
  }, [id]);

  const getIngredients = () => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        list.push(`${measure} ${ingredient}`);
      }
    }
    return list;
  };

  const isFavorited = favoritesState.some(r => r.idMeal === recipe?.idMeal);

  const toggleFavorite = () => {
    if (isFavorited) {
      dispatch({ type: "REMOVE_FAVORITE", payload: recipe.idMeal });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: recipe });
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="App">
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="300" />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <h3>Instructions</h3>
      <p style={{ maxWidth: "700px", margin: "0 auto" }}>{recipe.strInstructions}</p>

      <h3>Ingredients</h3>
      <ul style={{ textAlign: "left", maxWidth: "400px", margin: "0 auto" }}>
        {getIngredients().map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <button onClick={toggleFavorite} style={{ marginTop: "1rem", padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", backgroundColor: "#ff7043", color: "#fff" }}>
        {isFavorited ? "💔 Remove from Favorites" : "❤️ Add to Favorites"}
      </button>

      <br /><br />
      <Link to="/">⬅️ Back to Search</Link>
    </div>
  );
};

export default RecipeDetail;

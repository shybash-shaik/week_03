import React, { useContext } from "react";
import { FavoritesContext } from "../components/FavoritesContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favoritesState } = useContext(FavoritesContext);

  return (
    <div className="App">
      <h2>❤️ Favorite Recipes</h2>
      {favoritesState.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="recipe-list">
          {favoritesState.map((recipe) => (
            <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`} className="recipe-link">
              <div className="recipe-card">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <h3>{recipe.strMeal}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
      <br />
      <Link to="/">⬅️ Back to Search</Link>
    </div>
  );
};

export default Favorites;

import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.idMeal}`} className="recipe-link">
      <div className="recipe-card">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
          width="250"
          height="200"
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
        <h3>{recipe.strMeal}</h3>
      </div>
    </Link>
  );
};

export default RecipeCard;

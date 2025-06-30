import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";
import '../styles/Home.css'
const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchRecipes = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setRecipes((data.meals || []).slice(0, 12));
    } catch (err) {
      console.error("Fetch error:", err);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🍽️ Recipe Finder</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={fetchRecipes} />

      {isLoading && <p>🔍 Searching for recipes...</p>}
      {!isLoading && hasSearched && recipes.length === 0 && <p>No results found.</p>}
      {!isLoading && recipes.length > 0 && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Home;

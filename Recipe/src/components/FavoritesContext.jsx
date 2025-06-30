import React, { createContext, useReducer, useEffect } from "react";

export const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.payload];
    case "REMOVE_FAVORITE":
      return state.filter(recipe => recipe.idMeal !== action.payload);
    default:
      return state;
  }
};

const getInitialState = () => {
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
};

export const FavoritesProvider = ({ children }) => {
  const [favoritesState, dispatch] = useReducer(favoritesReducer, [], getInitialState);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesState));
  }, [favoritesState]);

  return (
    <FavoritesContext.Provider value={{ favoritesState, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

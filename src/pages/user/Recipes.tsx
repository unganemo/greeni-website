import React from "react";
import { useParams } from "react-router-dom";

const Recipes = () => {
  const { user_id } = useParams();
  return <div>Recipes with user id: {user_id}</div>;
};

export default Recipes;

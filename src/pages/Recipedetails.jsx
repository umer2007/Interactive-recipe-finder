import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const Recipedetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        const data = res.data;
        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        } else {
          console.log('No meal found');
        }
      })
      .catch((error) => {
        console.error('There was an error making the request:', error);
      });
  }, [id]);

  if (!meal) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };

  const renderMeasures = () => {
    const measures = [];
    for (let i = 1; i <= 20; i++) {
      const measure = meal[`strMeasure${i}`];
      if (measure && measure.trim() !== '') {
        measures.push(measure);
      }
    }
    return measures;
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-8">
        <FaArrowLeft className="text-gray-500 cursor-pointer" onClick={() => history.back()} />
        <h1 className="text-3xl font-bold ml-4">{meal.strMeal}</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="overflow-hidden rounded-lg">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-auto transform hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg text-gray-700"><strong>Category:</strong> {meal.strCategory}</p>
          <h2 className="text-xl font-semibold mt-4">Ingredients:</h2>
          <ul className="list-disc list-inside mt-2">
          {renderIngredients().map((ingredient, index) => (
            <li key={index} className="text-lg text-gray-700">{ingredient}</li>
          ))}
        </ul>
        </div>
      </div>
      <div className="mt-8">
        
        <h2 className="mt-6 text-xl font-semibold">Measures:</h2>
        <ul className="list-disc list-inside mt-2">
          {renderMeasures().map((measure, index) => (
            <li key={index} className="text-lg text-gray-700">{measure}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recipedetails;

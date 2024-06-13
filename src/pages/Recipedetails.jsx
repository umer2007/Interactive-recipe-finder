import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

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
              <Spin size='large' />
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

  const renderYoutubeLinks = () => {
    const videoLinks = []
    const link = meal.strYoutube;
    if (link) {
      videoLinks.push(link);
    }
    return videoLinks;
  }

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
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-lg shadow-lg mt-4 mb-4">
      <div className="flex items-center mb-8">
        <FaArrowLeft className="text-white cursor-pointer" onClick={() => history.back()} />
        <h1 className="text-3xl font-bold ml-4 text-white">{meal.strMeal}</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="overflow-hidden rounded-lg">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-auto transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md ">
          <p className="text-lg text-gray-900 mb-4"><strong>Category:</strong> {meal.strCategory}</p>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Ingredients:</h2>
              <ul className="list-disc list-inside mt-2">
                {renderIngredients().map((ingredient, index) => (
                  <li key={index} className="text-lg text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Measures:</h2>
              <ul className="list-disc list-inside mt-2">
                {renderMeasures().map((measure, index) => (
                  <li key={index} className="text-lg text-gray-700">{measure}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" border-gray-500 border-solid border-2 rounded-lg p-4 bg-cyan-300 mt-4">
            <h2 className="text-xl font-semibold text-gray-900">Youtube Link:</h2>
            <ul className="list-disc list-inside mt-2">
              {renderYoutubeLinks().map((link, index) => (
                <li key={index} className="text-lg text-black"><Link to={`${link}`} target='_blank'>Check video recipe</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="mt-4 text-lg text-white font-semibold"><strong>Instructions:</strong> {meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default Recipedetails;

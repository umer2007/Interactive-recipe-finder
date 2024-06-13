import React, { useState, useEffect } from 'react';
import { Input, Button, Spin } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Finder = ({ addToFavorites }) => {
  const navigate = useNavigate();
  const [noMealsFound, setNoMealsFound] = useState(false);
  const [input, setInput] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from local storage when component mounts
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (recipeName) {
      setLoading(true);
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
        .then((res) => {
          const data = res.data;
          if (data.meals && data.meals.length > 0) {
            const filteredMeals = data.meals.filter(meal => meal.strCategory.toLowerCase() !== "pork");
            setMeals(filteredMeals);
            setNoMealsFound(filteredMeals.length === 0);
          } else {
            setMeals([]);
            setNoMealsFound(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('There was an error making the request:', error);
          setLoading(false);
          // Optionally, handle errors with a notification or alert
        });
    }
  }, [recipeName]);

  const renderIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };

  const renderMeasures = (meal) => {
    const measures = [];
    for (let i = 1; i <= 20; i++) {
      const measure = meal[`strMeasure${i}`];
      if (measure && measure.trim() !== '') {
        measures.push(measure);
      }
    }
    return measures;
  };

  const handleChange = (event) => {
    setInput(event.target.value);
    if (noMealsFound) {
      setNoMealsFound(false);
    }
  };

  const findRecipeName = () => {
    if (input.trim() === '') {
      alert('Input is empty');
    } else {
      setRecipeName(input);
    }
  };

  const displayFullRecipe = (idMeal) => {
    navigate(`/recipedetails/${idMeal}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      findRecipeName();
    }
  };

  return (
    <>
      <div className='flex justify-center mt-4'>
        <Input
          type='text'
          placeholder='Enter recipe name'
          className='w-64 mr-2 font-poppins'
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Button type='primary' onClick={findRecipeName} className='font-poppins'>
          Search
        </Button>
      </div>
      <div className='flex justify-center mt-8'>
        <h1 className='text-3xl font-semibold font-poppins'>Recipes</h1>
      </div>
      <div className='flex justify-center mt-4'>
        <div className='w-3/4 border-2 border-gray-300 rounded-lg p-4'>
          {noMealsFound ? (
            <div>
              <h1 className='text-center'>No meals found</h1>
            </div>
          ) : loading ? (
            <div className='flex items-center justify-center'>
              <Spin size='large' />
            </div>
          ) : (
            <ul className='space-y-4'>
              {meals.map((meal) => (
                <li
                  key={meal.idMeal} // Unique key based on meal id
                  className='flex flex-col md:flex-row border-indigo-500 border-b-2 rounded-lg p-4 bg-white shadow-md'
                >
                  <div className='md:w-1/2 pr-4 border-r-2 border-indigo-500 flex flex-col'>
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className='w-full h-auto mb-4 flex-grow'
                      style={{ maxHeight: '300px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className='md:w-1/2 pl-4 ml-4 flex flex-col justify-between'>
                    <div>
                      <h2 className='text-xl font-semibold mb-2'>{meal.strMeal}</h2>
                      <p className='mb-2'>
                        <strong>Category:</strong> {meal.strCategory}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className='font-medium mb-1'>Ingredients:</h3>
                          <ul className='list-disc list-inside'>
                            {renderIngredients(meal).map((ingredient, index) => (
                              <li key={`${meal.idMeal}-ingredient-${index}`}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className='font-medium mb-1'>Measures:</h3>
                          <ul className='list-disc list-inside'>
                            {renderMeasures(meal).map((measure, index) => (
                              <li key={`${meal.idMeal}-measure-${index}`}>{measure}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='mt-4 flex justify-between'>
                      <Button
                        type='primary'
                        onClick={() => displayFullRecipe(meal.idMeal)}
                      >
                        Show More...
                      </Button>
                      <Button
                        type='secondary'
                        onClick={() => addToFavorites(meal)}
                      >
                        Add to Favorites
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Finder;

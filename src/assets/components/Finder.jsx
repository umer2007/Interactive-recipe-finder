import React, { useState, useEffect } from 'react';
import { Input, Button, Spin } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Finder = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recipeName) {
      setLoading(true);
      axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
        .then((res) => {
          const data = res.data;
          if (data.meals && data.meals.length > 0) {
            setMeals(data.meals);
          } else {
            setMeals([]);
            console.log('No meals found');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('There was an error making the request:', error);
          setLoading(false);
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
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const findRecipeName = () => {
    if (input.trim() === "") {
      alert("Input is empty");
    } else {
      setRecipeName(input);
    }
  };

  const displayFullRecipe = (idMeal) => {
    navigate(`/recipedetails/${idMeal}`);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      findRecipeName();
    }
  }

  return (
    <>
      <div className='flex justify-center mt-4'>
        <Input
          type='primary'
          placeholder='Enter recipe name'
          className='w-64 mr-2'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Button type="primary" onClick={findRecipeName}>Search</Button>
      </div>
      <div className='flex justify-center mt-8'>
        <h1 className='text-3xl font-bold'>Recipes</h1>
      </div>
      <div className='flex justify-center mt-4'>
        <div className='w-3/4 border-2 border-gray-300 rounded-lg p-4'>
          {loading ? (
            <div className="flex items-center justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <ul className='space-y-4'>
              {meals.map((meal) => (
                <li key={meal.idMeal} className='flex flex-col md:flex-row border-indigo-500 border-b-2 rounded-lg p-4 bg-white shadow-md'>
                  <div className='md:w-1/2 pr-4 border-r-2 border-indigo-500'>
                    <h2 className='text-xl font-semibold mb-2'>{meal.strMeal}</h2>
                    <p className='mb-2'><strong>Category:</strong> {meal.strCategory}</p>
                    <h3 className='font-medium mb-1'>Ingredients:</h3>
                    <ul className='list-disc list-inside ml-4'>
                      {renderIngredients(meal).map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <h3>Measures :</h3>
                    <ul className='list-disc list-inside ml-4'>
                      {renderMeasures(meal).map((measure, index) => (
                        <li key={index}>{measure}</li>
                      ))}
                    </ul>
                  </div>
                  <div className='md:w-1/2 pl-4'>
                    {meal.strInstructions}
                  </div>
                  <div className='mt-4 md:mt-0 md:ml-auto'>
                    <Button type="primary" onClick={() => displayFullRecipe(meal.idMeal)}>Show More...</Button>
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

export default Finder

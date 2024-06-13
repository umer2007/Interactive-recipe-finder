import React from 'react';
import { Button } from 'antd';

const Favorites = ({ favorites, setFavorites }) => {
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

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-page">
      <h1 className='text-3xl font-semibold font-poppins text-center text-white'>Favorite Recipes</h1>
      <div className='flex justify-center mt-4'>
        <div className='w-3/4 border-2 border-gray-300 rounded-lg p-4'>
          {favorites.length === 0 ? (
            <div>   
              <h2 className='text-center font-semibold font-poppins text-yellow-400'>No favorites added yet</h2>
            </div>
          ) : (
            <ul className='space-y-4'>
              {favorites.map((meal) => (
                <li
                  key={meal.idMeal} // Ensure each key is unique based on meal.idMeal
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
                    <div className='mt-4 flex justify-end'>
                      <Button
                        type='danger'
                        onClick={() => removeFromFavorites(meal.idMeal)}
                      >
                        Remove from Favorites
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;

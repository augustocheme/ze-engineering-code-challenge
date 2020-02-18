import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import './CategoriesFilter.scss';
import { dispatchCustomEvent } from '../../helpers/customEvent';

const GET_CATEGORIES = gql`
  {
    allCategory {
      title
      id
    }
  }
`;

const CategoriesFilter = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  // React.useEffect(() => {}, [selectedCategory]);

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleCategorySelect = selectedCategory => {
    if (selectedCategory == null || selectedCategory === '') {
      console.log('teste');
      document.getElementById('filter-input').value = null;
    }
    setSelectedCategory(selectedCategory);
    dispatchCustomEvent('update-categories-filter', {
      selectedCategory
    });
  };

  if (data) {
    return (
      <div className="categories-filter">
        <p>Filtrar os resultados por categoria: </p>
        <select id="filter-input" className="filter-input">
          <option value={null} />
          {data.allCategory.map(category => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <button
          className="add-filter-button"
          onClick={() =>
            handleCategorySelect(document.getElementById('filter-input').value)
          }
        >
          Aplicar
        </button>
        {selectedCategory != null && (
          <button
            className="remove-filter-button"
            onClick={() => handleCategorySelect(null)}
          >
            Remover
          </button>
        )}
      </div>
    );
  }
};

export default CategoriesFilter;

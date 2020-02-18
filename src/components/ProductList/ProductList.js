import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import ProductCard from '../ProductCard/ProductCard';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import './ProductList.scss';
import CategoriesFilter from '../CategoriesFilter/CategoriesFilter';
import {
  listenCustomEvent,
  unlistenCustomEvent
} from '../../helpers/customEvent';

const GET_PRODUCTS = gql`
  query poc($id: ID!, $categoryId: Int, $search: String) {
    poc(id: $id) {
      id
      products(categoryId: $categoryId, search: $search) {
        id
        title
        images {
          url
        }
        productVariants {
          price
        }
      }
    }
  }
`;

const ProductList = props => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      id: props.pocId,
      categoryId: null,
      search: ''
    }
  });

  React.useEffect(() => {
    listenCustomEvent('update-categories-filter', handleFilterUpdate);

    return () => {
      unlistenCustomEvent('update-categories-filter', handleFilterUpdate);
    };
  }, []);

  const handleFilterUpdate = React.useCallback(event => {
    const { selectedCategory } = event.detail;
    if (selectedCategory === '') {
      selectedCategory = null;
    }
    refetch({ categoryId: selectedCategory });
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div className="product-list-container">
      {data && (
        <div className="product-list">
          {data.poc.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

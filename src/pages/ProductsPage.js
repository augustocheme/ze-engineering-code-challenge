import React from "react";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import ProductList from "../components/ProductList/ProductList";
import PageContainer from "../components/PageContainer/PageContainer";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import CategoriesFilter from "../components/CategoriesFilter/CategoriesFilter";

import "./ProductsPage.scss";

const GET_POC = gql`
  query pocSearchMethod(
    $now: DateTime!
    $algorithm: String!
    $lat: String!
    $long: String!
  ) {
    pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
      id
      status
      tradingName
      officialName
    }
  }
`;

const ProductsPage = props => {
  const { lat, lon } = props.location.state;
  const date = React.useMemo(() => new Date().toISOString(), []);
  const { loading, error, data } = useQuery(GET_POC, {
    variables: {
      now: date,
      algorithm: "NEAREST",
      lat: lat,
      long: lon
    }
  });

  return (
    <PageContainer>
      <div className="products-page">
        <CategoriesFilter />
        {loading && <LoadingScreen />}
        {error && <p>Error :(</p>}
        {data && <ProductList pocId={data.pocSearch[0].id} />}
      </div>
    </PageContainer>
  );
};

export default ProductsPage;

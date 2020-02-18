import React from 'react';
import AddressSearch from '../components/AddressSearch/AddressSearch';
import PageContainer from '../components/PageContainer/PageContainer';

const HomePage = props => {
  return (
    <PageContainer>
      <AddressSearch />
    </PageContainer>
  );
};

export default HomePage;

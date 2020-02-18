import React from 'react';
import { useHistory } from 'react-router-dom';

import './AddressSearch.scss';

const AddressSearch = () => {
  const [address, setAddress] = React.useState('');
  let history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();

    const encodedAddress = encodeURI(address);

    const data = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=6dda378bb043ff&q=${encodedAddress}&format=json`
    ).then(response => response.json());

    const { lat, lon } = data[0];

    history.push({ pathname: '/products', state: { lat, lon } });
  };

  return (
    <div className="form-container">
      <h1>Digite o endereço para ver os produtos disponíveis</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o endereço"
          className="address-field"
          onChange={event => setAddress(event.target.value)}
        />
        <input type="submit" value="procurar" className="submit-button" />
      </form>
    </div>
  );
};

export default AddressSearch;

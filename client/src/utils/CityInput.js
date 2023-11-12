import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

const CHAT_QUERY = gql`
  query Chat($message: String!) {
    chat(message: $message)
  }
`;

const CityInput = () => {
  const [city, setCity] = useState('');
  const [getChatResponse, { loading, data }] = useLazyQuery(CHAT_QUERY);

  const fetchChatResponse = () => {
    getChatResponse({ variables: { message: city } });
  };

  return (
    <div>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={fetchChatResponse}>Ask</button>

      {loading && <p>Loading...</p>}
      {data && <div>Response: {data.chat}</div>}
    </div>
  );
};

export default CityInput;

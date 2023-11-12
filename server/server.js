const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const axios = require('axios');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// API routes call
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

// route to fetch cities by state and country
  app.get('/api/cities/:country/:state', async (req, res) => {
    const { country, state } = req.params;
    try {
      const response = await axios.get(
        `https://countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
        {
          headers: {
            'X-CSCAPI-KEY': process.env.CSC_API_KEY,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // route for ChatGPT
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 429) {
        // If rate-limited, wait for a while and then retry
        setTimeout(async () => {
          try {
            const retryResponse = await axios.post(/* Same API request as above */);
            res.json({ reply: retryResponse.data.choices[0].message.content });
          } catch (retryError) {
            console.error(retryError);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        }, 5000); 
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
    });

  app.use(routes);
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();

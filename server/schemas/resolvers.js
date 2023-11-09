// const { Profile } = require('../models');
// const { signToken, AuthenticationError } = require('../utils/auth');

// const resolvers = {
//   Query: {
//     profiles: async () => {
//       return Profile.find();
//     },
//     profile: async (_, { profileId }) => {
//       return Profile.findById(profileId);
//     },
//     me: async (_, __, { user }) => {
//       if (user) {
//         const profile = await Profile.findById(user._id);
//         if (profile) {
//           return profile;
//         }
//         throw new AuthenticationError('User not found');
//       }
//       throw new AuthenticationError('User not authenticated');
//     },
//   },
//   Mutation: {
//     addProfile: async (_, { name, email, password }) => {
//       const profile = await Profile.create({ name, email, password });
//       const token = signToken(profile);
//       return { token, profile };
//     },
//     login: async (_, { email, password }) => {
//       const profile = await Profile.findOne({ email });
//       if (!profile || !(await profile.isCorrectPassword(password))) {
//         throw new AuthenticationError('Incorrect email or password');
//       }
//       const token = signToken(profile);
//       return { token, profile };
//     },
//     removeProfile: async (_, __, { user }) => {
//       if (user) {
//         const profile = await Profile.findByIdAndDelete(user._id);
//         if (profile) {
//           return profile;
//         }
//         throw new AuthenticationError('User not found');
//       }
//       throw new AuthenticationError('User not authenticated');
//     },
//   },
// };

// module.exports = resolvers;
// const City = require('../models'); 
const axios = require('axios');
// const { OpenAIAPIKey } = require('../config/connection'); 


const resolvers = {
  // Query: {
  // getCityByStateAndName: async (_, { state, name }) => {
  //     try {
  //       const city = await City.findOne({ state, name });
  //       if (city) {
  //         return city;
  //       } else {
  //         throw new Error('City not found');
  //       }
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   },
  // },
   Query: { 
  chat: async (_, { message }) => {
      try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
          prompt: `Tell me about ${message}`,
          max_tokens: 150,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OpenAIAPIKey}`, // Make sure OpenAIAPIKey is defined and accessible
          },
        });

        return response.data.choices[0].text.trim();
      } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
      }
    },
  },
};

module.exports = resolvers;
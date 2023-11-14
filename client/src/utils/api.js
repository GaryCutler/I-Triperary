
   export const FetchData = async () => {
    try {
      const response = await fetch('https://api.countrystatecity.in/v1/states');
      if (!response.ok) {
        throw new Error('error');

      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

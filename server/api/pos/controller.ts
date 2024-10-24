import { analyzeImageAndGetRecipes } from '../../../server/domain/pos/event/posEvent';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    try {
      if (!body.imageData) {
        return {
          status: 400,
          body: { error: 'Image data is required' },
        };
      }

      const recipes = await analyzeImageAndGetRecipes(body.imageData);
      return {
        status: 200,
        body: { recipes },
      };
    } catch (error) {
      console.error('Error in analyzeImageAndGetRecipes:', error);
      return {
        status: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  },
}));

import { analyzeImageAndGetRecipes } from '../../../server/domain/pos/event/posEvent';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    try {
      const image = body.get('image') as File;
      const recipes = await analyzeImageAndGetRecipes(image);
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

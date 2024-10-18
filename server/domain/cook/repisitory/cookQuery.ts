import axios from 'axios';

const COOKPAD_API_KEY = 'YOUR_COOKPAD_API_KEY';

export const searchRecipes = async (ingredients: string[]) => {
  try {
    const query = ingredients.join(',');

    const response = await axios.get('https://api.cookpad.com/search', {
      headers: {
        Authorization: `Bearer ${COOKPAD_API_KEY}`,
      },
      params: {
        query, // 認識された食材をクエリとして送信
      },
    });

    return response.data.recipes; // レシピリストを返す
  } catch (error) {
    console.error('Cookpad API Error:', error);
    throw new Error('クックパッドAPIの呼び出しに失敗しました');
  }
};

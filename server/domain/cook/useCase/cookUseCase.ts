import { searchRecipes } from 'cook';
import fs from 'fs';
import { recognizeIngredients } from './openaiService';

export const cookUseCase = async (imagePath: string) => {
  try {
    // OpenAIを使って画像から食材を認識
    const ingredients = await recognizeIngredients(imagePath);

    // クックパッドAPIを使ってレシピを検索
    const recipes = await searchRecipes(ingredients);

    // 一時ファイルを削除
    fs.unlinkSync(imagePath);

    return { ingredients, recipes };
  } catch (error) {
    console.error('cookUseCase Error:', error);
    throw new Error('食材認識またはレシピ検索に失敗しました');
  }
};

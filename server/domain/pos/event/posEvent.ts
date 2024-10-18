// import { openai } from 'service/openai';

// export async function streamChatCompletion(quesiton: string): Promise<string> {
//   let responseText = '';
//   try {
//     const stream = await openai.chat.completions.create({
//       model: 'gpt-4o-mini',
//       messages: [{ role: 'user', content: quesiton }],
//       stream: true,
//     });

//     for await (const chunk of stream) {
//       responseText += chunk.choices[0]?.delta?.content || '';
//     }
//     return responseText;
//   } catch (error) {
//     console.error('Error while calling OpenAI API:', error);
//     throw error;
//   }
// }

import { openai } from 'service/openai';

export async function analyzeImageAndGetRecipes(image: File): Promise<string[]> {
  try {
    const base64Image = await imageToBase64(image);
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // 注意: モデル名を正確に指定してください
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'この画像に写っている食材を識別し、それらを使ったおすすめのレシピを3つ提案してください。各レシピについて、レシピ名と簡単な調理手順を含めてください。',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content !== 'string') {
      throw new Error('Unexpected response format from OpenAI API');
    }

    const suggestedRecipes = parseRecipes(content);
    return suggestedRecipes;
  } catch (error) {
    console.error('Error in analyzeImageAndGetRecipes:', error);
    throw error;
  }
}

function parseRecipes(content: string): string[] {
  // OpenAIの応答をパースしてレシピのリストを作成
  const recipes = content.split(/\d+\.\s/).filter((recipe) => recipe.trim() !== '');
  console.log('あ');
  return recipes.map((recipe) => recipe.trim());
}

async function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (): void => {
      const result = reader.result;
      if (typeof result === 'string') {
        const base64String = result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

import { streamChatCompletion } from '../../../server/domain/pos/event/posEvent';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    console.log('Received question:', body.question); // リクエストで送信された質問をログに出力

    try {
      const responseText = await streamChatCompletion(body.question);
      console.log('OpenAI API Response:', responseText); // OpenAI API のレスポンスをログに出力

      return {
        status: 200,
        body: { response: responseText },
      };
    } catch (error) {
      console.error('Error in streamChatCompletion:', error); // エラーが発生した場合のログ
      return {
        status: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  },
}));

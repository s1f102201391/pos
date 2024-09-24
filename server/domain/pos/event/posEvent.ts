import { openai } from 'service/openai';

export async function streamChatCompletion(quesiton: string): Promise<string> {
  let responseText = '';
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: quesiton }],
      stream: true,
    });

    for await (const chunk of stream) {
      responseText += chunk.choices[0]?.delta?.content || '';
    }
    return responseText;
  } catch (error) {
    console.error('Error while calling OpenAI API:', error);
    throw error;
  }
}

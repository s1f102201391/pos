import { openai } from 'service/openai';

// analyzeImageAndGetRecipes関数の引数の型を変更
export async function analyzeImageAndGetRecipes(
  imageBase64: string,
  preferredIngredient?: string,
  notuse?: string,
): Promise<string[]> {
  try {
    // 質問文を動的に生成
    let promptText = `この画像に写っている食材を識別し全てリストアップしてください。その後、それらを使ったおすすめのレシピを1つ提案してください。各レシピについて、レシピ名と簡単な調理手順を含めてください。
出力した結果をそのまま表示するため、余計なテキストを含めず目的のプロンプトのみ生成してください。また食材リストが不明の場合はレシピは表示しないでください
書き方の例は以下です
"食材リスト
\n・卵
\n・レタス
\n・にんじん
\n・ピーマン
\n・トマト
---------------------
\nおすすめレシピ
\n1.レタスチャーハン

\n・材料
\nご飯:300g
\n卵:1個
\nウインナー:1本
\nレタス:大きめの葉2枚
\n塩コショウ:少々
\n鶏がらスープ:大匙1弱
\nマヨネーズ:大匙1弱
\n醤油:小匙1

\n・作り方
\n①ウインナーは小さめに切りレタスは手でちぎっておく。
\n②フライパンに油大匙1(分量外)を敷きウインナーと卵を割り入れて少し炒め半熟位で御飯を加え木じゃくを水で少し濡らし炒める。
\n③焦らずゆっくり木じゃくで米を切るように炒め鶏ガラスープと塩コショウを入れ良く混ぜ合わせる。
\n④マヨネーズをまんべんなくかけ醤油を回し入れて全体に絡めレタスを加えてサッと炒めたら完成"
`;
    if (preferredIngredient) {
      promptText += `特に『${preferredIngredient}』を使用したレシピを1つ提案してください。`;
    }
    if (notuse) {
      promptText += `『${notuse}』を絶対に使用しないレシピを1つ提案してください。`;
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: promptText,
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
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

    return formatRecipes(content);
  } catch (error) {
    console.error('Error in analyzeImageAndGetRecipes:', error);
    throw error;
  }
}

function formatRecipes(content: string): string[] {
  // 空行で分割して各セクションを取得
  const sections = content.split('\n\n').filter((section) => section.trim() !== '');

  // 食材リストと各レシピを別々に処理
  const formattedSections = sections.map((section) => {
    // 各セクション内の改行を保持
    return section
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
  });

  return formattedSections;
}

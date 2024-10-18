// import { Request, Response } from 'express';

import { cookUseCase } from 'domain/cook/useCase/cookUseCase';

export const analyzeImageController = async (req: Request, res: Response) => {
  try {
    // 画像がアップロードされたか確認
    if (!req.file) {
      return res.status(400).json({ error: '画像ファイルが見つかりません' });
    }

    // アップロードされた画像パスをユースケースに渡して処理
    const { ingredients, recipes } = await cookUseCase(req.file.path);

    // 認識された食材とレシピを返す
    res.json({ ingredients, recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '処理中にエラーが発生しました' });
  }
};

import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      FormData: string[]; // 既存の型定義を維持
      imageData: string; // 画像データ用のフィールドを追加
    };
    resBody: { recipes: string[] };
    status: 200 | 400 | 500;
  };
}>;

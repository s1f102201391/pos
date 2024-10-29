import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      FormData: string[];
      imageData: string;
      preferredIngredient?: string; // 追加
    };
    resBody: { recipes: string[] };
    status: 200 | 400 | 500;
  };
}>;

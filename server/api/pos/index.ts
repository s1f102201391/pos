import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: FormData;
    resBody: { recipes: string[] };
  };
}>;

import type { DefineMethods } from 'aspida';
import type { ScrapedSyllabusData } from 'common/types/class';

export type Methods = DefineMethods<{
  get: {
    query: {
      scrapedData: ScrapedSyllabusData[]; // クエリパラメータとして渡される scrapedData
    };
    resBody: string | null; // レスポンスボディに渡すデータ
  };
}>;

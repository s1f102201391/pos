import type { ScrapedSyllabusData } from 'common/types/class';
import { classUseCase } from 'domain/class/useCase/classUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }: { query: { scrapedData: ScrapedSyllabusData[] } }) => {
    // scrapedData が存在するか確認
    if (!query.scrapedData || query.scrapedData.length === 0) {
      return { status: 400, body: 'Invalid or missing scrapedData' };
    }

    // 例えば、scrapedData に classUrl があると仮定します。
    const classUrl = query.scrapedData[0].classUrl; // 最初のデータの URL を使用する

    if (!classUrl) {
      return { status: 400, body: 'classUrl is missing in scrapedData' };
    }

    // classUrl を使ってデータを取得
    const result = await classUseCase.scrapeClassAndInstructors(classUrl);
    return { status: 200, body: result };
  },
}));

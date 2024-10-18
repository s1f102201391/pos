import { load } from 'cheerio';
import { decode } from 'iconv-lite';
import { transaction } from 'service/prismaClient';

export const classUseCase = {
  scrapeClassAndInstructors: async (): Promise<string | null> => {
    return transaction('RepeatableRead', async () => {
      const classUrl = 'https://g-sys.toyo.ac.jp/syllabus/category/18501';
      // URLを固定で使用

      try {
        // URLからHTMLコンテンツをフェッチ
        const response = await fetch(classUrl);
        console.log('fetch successful', response);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        console.log('buffer', buffer);

        // デコード処理
        const html = decode(Buffer.from(buffer), 'UTF-8');
        console.log('decoded', html);

        const $ = load(html);
        console.log('cheerio', $);

        // 必要なテキストを取得
        const mainText = $('.course_name').text().trim();
        console.log('Course name extracted:', mainText);

        return mainText ? mainText : null;
      } catch (error) {
        console.error('An error occurred:', error);
        return null;
      }
    });
  },
};

// // スクレイピング処理 (HTML要素からデータを抽出)
// const courseName = $('div.main_text .course_name').text().trim();
// const instructor = $('div.main_text .instructor_name').text().trim();
// const semester = $('div.main_text .semester').text().trim();
// const period = $('div.main_text .period').text().trim();
// const conduction = $('div.main_text .conduction').text().trim();
// const yearOfStudy = $('div.main_text .year_of_study').text().trim();
// const language = $('div.main_text .language').text().trim();
// const facultyName = '情報連携学部'; // 固定値として学部名
// const departmentName = '情報連携学科'; // 固定値として学科名

// スクレイピングデータを型に合わせて作成
// スクレイピングデータを型に合わせて作成
// const scrapedData: ScrapedSyllabusData[] = [
//   {
//     courseName,
//     instructor,
//     semester,
//     period,
//     conduction,
//     yearOfStudy,
//     language,
//     facultyName,
//     departmentName,
//   },
// ];

// データベースに保存
// await scrapeAndSaveSyllabus(tx);

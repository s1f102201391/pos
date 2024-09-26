import { load } from 'cheerio';
import { decode } from 'iconv-lite';
import { transaction } from 'service/prismaClient';

export const classUseCase = {
  scrapeClassAndInstructors: async (classUrl: string): Promise<string | null> => {
    return transaction('RepeatableRead', async () => {
      // URLからHTMLコンテンツをフェッチ
      const response = await fetch(classUrl); // URLを使ってデータをフェッチ
      const buffer = await response.arrayBuffer(); // データをバッファとして取得
      const html = decode(Buffer.from(buffer), 'Shift_JIS'); // Shift_JIS を UTF-8 にデコード
      const $ = load(html); // HTML コンテンツを解析

      // 必要なテキストを取得
      const mainText = $('div.main_text').text().trim(); // div.main_text のテキストを抽出
      return mainText ? mainText : null; // テキストがない場合は null を返す
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

// データベースに保存
// await scrapeAndSaveSyllabus(tx);

// import puppeteer, { Page } from 'puppeteer';
// import fs from 'fs';
// import path from 'path';

// // 取得するシラバスの年度
// const year = new Date().getFullYear().toString();
// console.log("Search Year : ", year);

// // JSONを格納する配列
// const result: any[] = [];

// // データを取得する関数
// const scrapeData = async (page: Page) => {
//     // 開講年度を設定
//     await page.select('select[name="year"]', year);

//     // 学部を情報連携学部に設定
//     await page.select('select[name="faculty"]', '1F000-2017');

//     // 表示件数を1000件に設定
//     await page.select('select[name="perPage"]', '1000');

//     // 検索ボタンクリック
//     await page.click('input[type="submit"]');

//     // 検索結果の読み込みを待機
//     await page.waitForSelector('div[class="result-count"]');

//     // 検索結果の該当件数を取得
//     const totalText = await page.$eval('div[class="result-count"]', el => el.textContent || '');
//     const total = parseInt(totalText.match(/\d+/g)![1], 10);
//     console.log("Search Results : ", total);

//     for (let i = 0; i < total; i++) {
//         const xpath = `/html/body/div[3]/div/div/div/table[2]/tbody/tr[${i + 1}]`;

//         // 雛形オブジェクト
//         const obj: any = {
//             "@type": "terachan:INIADSyllabus",
//             "dc:date": new Date().toISOString(),
//             "owl:sameAs": `terachan.INIADSyllabus:${year}.${i + 1}`,
//             "dc:title": null,
//             "terachan:courseTitle": { "ja": null, "en": null },
//             "terachan:courseYear": parseInt(year),
//             "terachan:courseNo": i + 1,
//             "terachan:courseSemester": null,
//             "terachan:courseWeek": null,
//             "terachan:coursePeriod": null,
//             "terachan:courseLanguage": null,
//             "terachan:courseStudyYear": null,
//             "terachan:instructorName": [],
//             "terachan:instructorType": null,
//             "terachan:syllabusNo": { "ja": null, "en": null }
//         };

//         // 科目名を取得
//         const courseTitle = await page.$eval(`${xpath}/td[3]`, el => el.textContent || '').split('\n');
//         if (courseTitle.length === 2) {
//             obj["dc:title"] = courseTitle[0];
//             obj["terachan:courseTitle"]["ja"] = courseTitle[0];
//             obj["terachan:courseTitle"]["en"] = courseTitle[1];
//         }

//         // 開講学期
//         const courseSemester = await page.$eval(`${xpath}/td[2]`, el => el.textContent || '').split('\n');
//         if (courseSemester.length === 2) {
//             obj["terachan:courseSemester"] = courseSemester[1];
//         }

//         // 曜日・時限
//         const courseTime = await page.$eval(`${xpath}/td[5]`, el => el.textContent || '').split('\n');
//         if (courseTime.length === 2 && courseTime[1].split(',')[0] !== 'None') {
//             obj["terachan:courseWeek"] = courseTime[1].split(',')[0];
//             obj["terachan:coursePeriod"] = parseInt(courseTime[1].split(',')[1][0], 10);
//         }

//         // 主たる使用言語
//         const courseLanguage = await page.$eval(`${xpath}/td[7]`, el => el.textContent || '').split(' / ');
//         if (courseLanguage.length === 2) {
//             obj["terachan:courseLanguage"] = courseLanguage[1];
//         }

//         // 対象年次
//         const courseStudyYear = await page.$eval(`${xpath}/td[6]`, el => el.textContent || '');
//         const studyYear = [];
//         for (let y = parseInt(courseStudyYear[0], 10); y <= parseInt(courseStudyYear[courseStudyYear.length - 1], 10); y++) {
//             studyYear.push(y);
//         }
//         obj["terachan:courseStudyYear"] = studyYear;

//         // 教員名
//         const instructorName = await page.$eval(`${xpath}/td[4]`, el => el.textContent || '').split('\n');
//         if (instructorName.length > 0) {
//             obj["terachan:instructorName"] = instructorName.map(name => {
//                 const splitNames = name.split(' / ');
//                 return {
//                     "ja": splitNames[0].replace('　', ' '),
//                     "en": splitNames[1].replace('　', ' ')
//                 };
//             });
//         }

//         // 教員の種類
//         const instructorType = await page.$eval(`${xpath}/td[8]`, el => el.textContent || '').split('/');
//         if (instructorType.length === 2) {
//             obj["terachan:instructorType"] = instructorType[1][5];
//         }

//         // シラバス番号 (ja)
//         const syllabusNoJa = await page.$eval(`${xpath}/td[9]/div/button[class="btn_syllabus_jp"]`, el => el.getAttribute('onclick') || '');
//         const jaMatch = syllabusNoJa.match(/\d+/);
//         if (jaMatch) {
//             obj["terachan:syllabusNo"]["ja"] = parseInt(jaMatch[1], 10);
//         }

//         // シラバス番号 (en)
//         const syllabusNoEn = await page.$eval(`${xpath}/td[9]/div/button[class="btn_syllabus_en"]`, el => el.getAttribute('onclick') || '');
//         const enMatch = syllabusNoEn.match(/\d+/);
//         if (enMatch) {
//             obj["terachan:syllabusNo"]["en"] = parseInt(enMatch[1], 10);
//         }

//         // JSONに追加
//         console.log("Adding number :", i);
//         result.push(obj);
//     }
// };

// const saveData = async () => {
//     const outputDir = path.join(__dirname, 'data', year);
//     if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir, { recursive: true });
//     }
//     fs.writeFileSync(path.join(outputDir, 'syllabus.json'), JSON.stringify(result, null, 2), 'utf-8');
//     console.log('Data saved to file');
// };

// (async () => {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto('https://g-sys.toyo.ac.jp/syllabus/', { waitUntil: 'networkidle2' });

//     // データ取得
//     await scrapeData(page);

//     // ファイルに保存
//     await saveData();

//     // ブラウザを閉じる
//     await browser.close();
//     console.log("Done!");
// })();

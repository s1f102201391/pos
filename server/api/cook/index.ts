import express from 'express';
import multer from 'multer';
import { analyzeImageController } from './controller';

const app = express();
const upload = multer({ dest: 'upload/' }); // 画像アップロード用

// 画像アップロードルート
app.post('/api/analyze-image', upload.single('image'), analyzeImageController);

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Result } from 'utils/apiClient';
import { apiClient, Err, Ok } from 'utils/apiClient';
import styles from './Pos.module.css';

export const ChatComponent = () => {
  const [image, setImage] = useState<File | null>(null);
  const [recipes, setRecipes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const previewImageUrl = useMemo(() => image && URL.createObjectURL(image), [image]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (): Promise<Result<string[], Error>> => {
    if (!image) return Err(new Error('No image selected'));

    setIsLoading(true);
    setError(null);

    try {
      // FileをBase64文字列に変換
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(image);
      });

      const response = await apiClient.pos.$post({
        body: {
          FormData: [], // 既存の型定義に合わせて空配列を設定
          imageData: base64Image,
        },
      });
      return Ok(response.recipes);
    } catch (error) {
      return Err(error instanceof Error ? error : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    const result = await handleSubmit();
    if (result.ok) {
      setRecipes(result.value);
    } else {
      setError(result.error.message);
    }
  };

  useEffect(() => {
    if (!previewImageUrl) return;
    return () => URL.revokeObjectURL(previewImageUrl);
  }, [previewImageUrl]);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        {previewImageUrl && (
          <img src={previewImageUrl} alt="Preview" className={styles.previewImage} />
        )}
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isLoading}
        />
        <button className={styles.button} onClick={onSubmit} disabled={isLoading || !image}>
          {isLoading ? '処理中...' : 'レシピを取得'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <h3 className={styles.responseTitle}>おすすめレシピ:</h3>
          <ul className={styles.recipeList}>
            {recipes.map((recipe, index) => (
              <li key={index}>{recipe}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

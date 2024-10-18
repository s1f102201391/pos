import { useState } from 'react';
import type { Result } from 'utils/apiClient';
import { apiClient, Err, Ok } from 'utils/apiClient';
import styles from './Pos.module.css';

export const ChatComponent = () => {
  const [image, setImage] = useState<File | null>(null);
  const [recipes, setRecipes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (): Promise<Result<string[], Error>> => {
    if (!image) return Err(new Error('No image selected'));

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', image);

      const res = await apiClient.pos.$post({ body: formData });
      return Ok(res.recipes);
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

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isLoading} />
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

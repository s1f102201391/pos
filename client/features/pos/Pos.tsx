import { useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './Pos.module.css';
export const ChatComponent = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleAskQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.pos.$post({
        body: { question },
      });
      console.log('Received response from API:', res.response);
      setResponse(res.response || 'No response received.');
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        <input
          className={styles.input}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="質問を入力"
          disabled={isLoading}
        />
        {/* <input
          className={styles.input}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="商品を入力"
          disabled={isLoading}
        />
        <input
          className={styles.input}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="前日の発注数を入力"
          disabled={isLoading}
        /> */}
        <button
          className={styles.button}
          onClick={handleAskQuestion}
          disabled={isLoading || question.trim() === ''}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setQuestion('');
            setResponse('');
          }}
          disabled={isLoading}
        >
          Reset
        </button>
        <div>
          <h3 className={styles.responseTitle}>Response:</h3>
          <p className={styles.responseText}>{response}</p>
        </div>
      </div>
    </div>
  );
};

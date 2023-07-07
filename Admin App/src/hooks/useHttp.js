import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:5000/admin${requestConfig.url}`,
        {
          method: requestConfig.method || 'GET',
          headers: requestConfig.headers || {},
          body: JSON.stringify(requestConfig.body) || null,
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else applyData(data);
    } catch (err) {
      setError(err.message || 'Song thing went wrong!');
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;

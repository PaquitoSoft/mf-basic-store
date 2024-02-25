import { useEffect, useState } from 'react';
import { get } from '@paquitosoft/fetcher';
import { TProduct } from '@mf-basic-store/types';

type ServerData = {
  products: TProduct[];
};

const ENDPOINT_URL = `${import.meta.env.VITE_BACKEND_HOST_URL}/api/product`;

function useProducts() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await get<ServerData>(ENDPOINT_URL, { ttl: 60 });
        setProducts(data.products);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export default useProducts;

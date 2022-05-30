import { useRouter } from 'next/router';
import useSWR from 'swr';

const Result = () => {
  const router = useRouter();
  const { sessionId } = router.query;

  const { data, error } = useSWR(
    router.query.sessionId ? `/api/checkout/${router.query.sessionId}` : null,
    (url) => fetch(url).then((res) => res.json())
  );

  return <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>;
};

export default Result;

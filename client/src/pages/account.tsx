import { useLogoutMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

const Account = () => {
  const [, logout] = useLogoutMutation();
  return (
    <button
      onClick={() => {
        logout();
      }}
    >
      Logga ut
    </button>
  );
};

export default withUrqlClient(createUrqlClient)(Account);

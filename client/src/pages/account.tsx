import { useLogoutMutation } from '../generated/graphql';

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

export default Account;

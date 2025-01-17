import useAuth from '@/hooks/useAuth';

const Header = () => {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-slate-400">Fetch Dog Matcher</h1>
      <button
        onClick={logout}
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;

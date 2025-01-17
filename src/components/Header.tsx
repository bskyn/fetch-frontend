import useAuth from '@/hooks/useAuth';

const Header = () => {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Dog Finder</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;

import { useRouter } from "next/navigation";
import useUserStore from "../store/useUserStore";
import { useSession, signOut } from 'next-auth/react';

const LogoutButton = () => {
  const router = useRouter();
  const { setToken, setUser } = useUserStore((state) => ({
    setToken: state.setToken,
    setUser: state.setUser,
  }));

  const handleLogout = async () => {
    try {
      // NextAuth signOut fonksiyonu ile oturumu kapat
      await signOut({ redirect: false });

      localStorage.removeItem("token");
      setToken(null);  // Token'ı sıfırla
      setUser(null);  // User state'ini sıfırla

      // Kullanıcı bilgisini güncellemek için custom event tetikleyin
      window.dispatchEvent(new Event("userUpdated"));

      router.push("/login"); // Login sayfasına yönlendir
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      className="my-4 bg-red-600 text-white p-2 rounded-md"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;

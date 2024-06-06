import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("token");
    router.push("/login");
    console.dir(response);
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

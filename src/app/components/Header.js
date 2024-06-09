"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ButtonWithPopup from "@/components/ButtonWithPopup";
import DropdownMenu from "@/components/DropdownMenu";
import GoogleSignIn from "@/components/GoogleSignIn";
import useUserStore from "@/store/useUserStore";
import LogoutButton from "@/components/LogoutButton"; // LogoutButton bileşenini ekledik

// Icons
import LogoIcon from "@/components/icons/LogoIcon";
import UserIcon from "@/components/icons/UserIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import NotificationIcon from "@/components/icons/NotificationIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";

const Header = () => {

  const { data: session, status } = useSession();

  const router = useRouter();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (router.locale === "en") {
      router.push("/en");
    } else {
      router.push("/tr");
    }
  }, [router]);

  const [selectedLanguage, setSelectedLanguage] = useState("Dil seçin");
  const languages = ["tr", "en"];

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto h-28 flex flex-row justify-between items-center p-4">
        <a href="/" className="flex items-center">
          <div className="flex flex-row justify-start items-center gap-2 text-black rounded">
            <LogoIcon />
            <h1 className="text-black text-lg font-semibold">msn</h1>
          </div>
        </a>

        <div className="flex-grow flex flex-row gap-0 max-w-screen-sm mx-4">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full p-2 border border-gray-300 rounded-l-md"
          />
          <button className="bg-blue-500 px-5 rounded-r-md">
            <SearchIcon />
          </button>
        </div>

        <div className="flex flex-row gap-2 items-center">
          {session && session.user ? (
            <ButtonWithPopup
              button={
                session.user.image ? (
                  <button className="bg-lime-500 rounded-full p-2 overflow-hidden">
                    <Image
                      src={session.user.image} // session.user.picture yerine session.user.image kullanılıyor
                      alt="User Profile Image"
                      width={30} // Genişlik belirleyin
                      height={30} // Yükseklik belirleyin
                      className="object-cover w-full rounded-full"
                    />
                  </button>
                ) : (
                  <button className="bg-lime-500 rounded-full p-2 overflow-hidden">
                    <UserIcon />
                  </button>
                )
              }
            >
              <div className="p-4">
                <div>
                  <h3>{session?.user?.name || "Kullanıcı Adı"}</h3>
                  <h3>{session?.user?.email || "Email"}</h3>
                </div>
                <LogoutButton />
              </div>
            </ButtonWithPopup>
          ) : (
            <ButtonWithPopup
              button={
                <button className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                </button>
              }
            >
              <div className="p-4 flex flex-col items-start gap-2">
                <button onClick={handleLogin}>{t("login")}</button>
                <button onClick={handleRegister}>{t("register")}</button>
                <GoogleSignIn />
              </div>
            </ButtonWithPopup>
          )}
          <ButtonWithPopup
            button={
              <button>
                <div className="relative">
                  <NotificationIcon />
                  <span className="bg-red-800 min-w-4 min-h-1 rounded-full p-1 absolute -top-2 flex flex-row justify-center items-center text-[7px] text-white">
                    3
                  </span>
                </div>
              </button>
            }
          >
            <div className="">
              <div className="header flex items-center justify-between border-b-2 p-4">
                <h5 className="text-sm font-bold">{t("notifications")}</h5>
                <button className="text-blue-500 text-sm">
                  {t("settings")}
                </button>
              </div>
              <div className=" flex flex-col">
                <div className="p-4 flex flex-col border-b group cursor-pointer ">
                  <span className="text-xs text-slate-500">{t("topNews")}</span>
                  <h4 className="group-hover:underline">
                    Erken Seçim istemeyen Özel&apos;i haklı çıkaran anket -
                    Haberler.com
                  </h4>
                  <span className="text-xs text-slate-500">
                    Haberler.com - 1 sa. önce
                  </span>
                </div>
                <div className="p-4 flex flex-col border-b group cursor-pointer ">
                  <span className="text-xs text-slate-500">{t("topNews")}</span>
                  <h4 className="group-hover:underline">
                    Erken Seçim istemeyen Özel&apos;i haklı çıkaran anket -
                    Haberler.com
                  </h4>
                  <span className="text-xs text-slate-500">
                    Haberler.com - 1 sa. önce
                  </span>
                </div>
                <div className="p-4 flex flex-col border-b group cursor-pointer ">
                  <span className="text-xs text-slate-500">{t("topNews")}</span>
                  <h4 className="group-hover:underline">
                    Erken Seçim istemeyen Özel&apos;i haklı çıkaran anket -
                    Haberler.com
                  </h4>
                  <span className="text-xs text-slate-500">
                    Haberler.com - 1 sa. önce
                  </span>
                </div>
              </div>
            </div>
          </ButtonWithPopup>
          <ButtonWithPopup
            button={
              <button>
                <SettingsIcon />
              </button>
            }
          >
            <div className="p-4">
              <DropdownMenu items={languages} onSelect={handleSelectLanguage} />
            </div>
          </ButtonWithPopup>
        </div>
      </div>
    </div>
  );
};

export default Header;

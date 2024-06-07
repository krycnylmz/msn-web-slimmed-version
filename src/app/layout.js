"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import {jwtDecode} from "jwt-decode";
import "./globals.css";
import { metadata } from "./config/metadata";
import { appWithTranslation, useTranslation } from "next-i18next";
import nextI18nextConfig from "../../next-i18next.config";

import ButtonWithPopup from "@/components/ButtonWithPopup";
import DropdownMenu from "@/components/DropdownMenu";
import GoogleSignIn from "@/components/GoogleSignIn";
import useUserStore from "@/store/useUserStore";
import apiService from "@/lib/apiService";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }) {
  const { token, setToken, clearToken, user } = useUserStore((state) => ({
    token: state.token,
    setToken: state.setToken,
    clearToken: state.clearToken,
    user: state.user,
  }));

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setToken(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [setToken]);

  useEffect(() => {
    console.log("User information:", user);
  }, [user]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogout = async () => {
    try {
      const response = await apiService.logout();
      if (response.status === 200) {
        localStorage.removeItem("token");
        clearToken();
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <html lang={i18n.language} className="relative h-full">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="w-full relative bg-gray-200 h-full">
        <div className="w-full bg-gray-200 sticky top-0 z-50">
          <div className="max-w-screen-xl mx-auto h-28 flex flex-row justify-between items-center p-4">
            <a href="/" className="flex items-center">
              <div className="flex flex-row justify-start items-center gap-2 text-black rounded">
                <svg
                  fill="currentColor"
                  viewBox="0 0 124.66 168.19"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path d="M82,91.65c4.37-9.67,9-19.47,15.26-28.08a62.89,62.89,0,0,1,10.59-11.63c3.19-2.64,8.68-6.68,13-4.53s3.93,9,3.35,13a60,60,0,0,1-4.45,14.85c-5.44,12.75-14,24.19-22.79,34.8-1.61,1.94-3.24,3.87-4.93,5.76a91.06,91.06,0,0,1-1,9.88,60.69,60.69,0,0,1-12.4,29c-2.8,3.44-7.74,8.81-12.77,7.81-5.31-1.06-5.32-8.77-5-12.87a57.14,57.14,0,0,1,3.78-15.39C72,115.8,79.9,96.68,82,91.65"></path>
                      <path d="M71,105.76c-5.37,18.4-16.84,44.69-33.28,55.66-7.45,5-17.46,8.8-26.36,5.6C1.47,163.53-1.09,152.5.38,143.16,2,132.72,7.75,123.65,14.49,115.75a54.18,54.18,0,0,1,12.67-10.13c7.47,4.14,16.59,8.72,24.27,11.15A99.3,99.3,0,0,1,34,102.35c-5.72-6.66-14.92-19.81-17.78-30.09-2.93-10.55-5.37-21.58-5.08-32.58.27-10,2.75-20.5,8.77-28.68C26.14,2.62,36.09-2,46.41.86,56.2,3.59,63.73,11.6,68.72,20.13a68.58,68.58,0,0,1,8.86,29.44A154.72,154.72,0,0,1,71,105.76Z"></path>
                    </g>
                  </g>
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-row gap-2 items-center">
              {token ? (
                <ButtonWithPopup
                  button={
                    <button className="bg-lime-500 rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  }
                >
                  <div className="p-4">
                    <div>
                      <h3>{token.name || "Kullanıcı Adı"}</h3>
                      <h3>{token.email || "Email"}</h3>
                    </div>
                    <button
                      className="my-4 bg-red-600 text-white p-2 rounded-md "
                      onClick={() => handleLogout()}
                    >
                      {t("logout")}
                    </button>
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
                          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                        />
                      </svg>
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
                      <span className="text-xs text-slate-500">
                        {t("topNews")}
                      </span>
                      <h4 className="group-hover:underline">
                        Erken Seçim istemeyen Özel&apos;i haklı çıkaran anket -
                        Haberler.com
                      </h4>
                      <span className="text-xs text-slate-500">
                        Haberler.com - 1 sa. önce
                      </span>
                    </div>
                    <div className="p-4 flex flex-col border-b group cursor-pointer ">
                      <span className="text-xs text-slate-500">
                        {t("topNews")}
                      </span>
                      <h4 className="group-hover:underline">
                        Erken Seçim istemeyen Özel&apos;i haklı çıkaran anket -
                        Haberler.com
                      </h4>
                      <span className="text-xs text-slate-500">
                        Haberler.com - 1 sa. önce
                      </span>
                    </div>
                    <div className="p-4 flex flex-col border-b group cursor-pointer ">
                      <span className="text-xs text-slate-500">
                        {t("topNews")}
                      </span>
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
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>
                }
              >
                <div className="p-4">
                  <p>{t("changeLanguage")}</p>
                  <DropdownMenu
                    items={languages}
                    onSelect={handleSelectLanguage}
                  />
                </div>
              </ButtonWithPopup>
            </div>
          </div>
        </div>
        <main className="flex-grow max-w-screen-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}

export default appWithTranslation(RootLayout, nextI18nextConfig);

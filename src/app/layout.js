// components/RootLayout.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { jwtDecode } from "jwt-decode";
import "./globals.css";
import { metadata } from "./config/metadata"; // Metadata dosyasını import ettik

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <html lang="en" className="relative h-full">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="w-full relative bg-gray-200 h-full">
        <div className="w-full bg-gray-200 sticky top-0 z-50">
          <div className="max-w-screen-xl mx-auto h-28 flex flex-row justify-between items-center p-4">
            {/* Logo image with link to home page */}
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

            {/* Search bar */}
            <div className="flex-grow flex flex-row gap-0 max-w-screen-sm mx-4">
              <input
                type="text"
                placeholder="Search..."
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

            {/* Mini user panel */}
            <div className="flex flex-row gap-2 items-center">
              {user ? (
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-black text-sm font-medium">
                    {user.name || "User"}
                  </span>
                </div>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
        <main className="flex-grow max-w-screen-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}

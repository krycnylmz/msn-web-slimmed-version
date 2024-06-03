import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

const LogoutButton = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Token'ı çerezden kaldır
      deleteCookie('token');

      // Kullanıcıyı login sayfasına yönlendir
      router.push('/login');
    }
  }, [router]);

  return <button onClick={() => handleLogout()}>Logout</button>;
};

const handleLogout = async () => {
  // Logout endpoint'ine istek gönder (isteğe bağlı)
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default LogoutButton;

import { signIn } from 'next-auth/react';

export default function GoogleSignIn() {
  return (
    <button onClick={() => signIn('google')} className='p-2 px-4 rounded-md bg-red-700 hover:bg-red-600 transition-all text-white'>
      Google ile Giriş Yap
    </button>
  );
}

// src/app/register/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, email, password, country,city}),
    });

    if (res.status === 201) {
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required  className='text-black'/>
      <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" required className='text-black'/>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className='text-black'/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className='text-black'/>
      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required className='text-black'/>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required className='text-black'/>
      
      <button type="submit">Register</button>
    </form>
  );
}

'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();

  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const state = process.env.NEXT_PUBLIC_STATE;
  const scope = process.env.NEXT_PUBLIC_SCOPE;

  const get_token_uri =  `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;

  useEffect(() => {
    if (params.has('code') && params.has('state')) {
      (async () => {
        const response = await fetch('http://localhost:5000/auth/linkedin/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: params.get('code'),
            state: params.get('state'),
          }),
        });
        const data = await response.json();
        console.log(data);
        return;
      })();
      router.replace('/');
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to LinkedIn API</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push(get_token_uri)}
      >
        Get Token
      </button>
    </main>
  );
}

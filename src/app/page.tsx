import { redirect } from 'next/navigation';

// Proxy (middleware) handles locale redirect, but this is a fallback
export default function RootPage() {
  redirect('/ko');
}

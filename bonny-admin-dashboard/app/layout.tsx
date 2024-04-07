
/**
 * You can put any components that will be shared across the application — such as Navbar, Footer, and others — in this layout.tsx file.
 * You can also put your global fonts or even wrap the entire app with a provider if you’re using a third-party state management library such as TanStack Query.
 */
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';

export const metadata = {
  title: 'Bonny Admin Dashboard',
  description:
    'The Admin Dashboard shows all the transactions made on the Bonny Platform.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

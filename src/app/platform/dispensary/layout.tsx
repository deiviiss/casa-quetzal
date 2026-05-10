import React from 'react';

export default function DispensaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

// import type { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'CQCS | Premium Cannabis Genetics',
//   description: 'Selección artesanal de genéticas premium de cannabis. Calidad, pureza y excelencia.',
//   generator: 'v0.app',
//   icons: {
//     icon: [
//       {
//         url: '/icon-light-32x32.png',
//         media: '(prefers-color-scheme: light)',
//       },
//       {
//         url: '/icon-dark-32x32.png',
//         media: '(prefers-color-scheme: dark)',
//       },
//       {
//         url: '/icon.svg',
//         type: 'image/svg+xml',
//       },
//     ],
//     apple: '/apple-icon.png',
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" className="dar k bg-background">
//       <body className="font-sans antialiased min-h-screen bg-background">
//         {children}
//         {process.env.NODE_ENV === 'production'}
//       </body>
//     </html>
//   )
// }

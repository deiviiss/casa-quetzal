import React from 'react';

export default function DispensaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Dispensario</h1>
        <p className="text-muted-foreground">Selección Premium</p>
      </header>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

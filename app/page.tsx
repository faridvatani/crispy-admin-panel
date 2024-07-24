export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <header className="text-4xl font-bold text-gray-800">
        Welcome to Our Site!
      </header>
      <p className="mt-3 text-lg text-gray-600">
        Your one-stop destination for all your needs.
      </p>
      <div className="mt-10">
        <a
          href="/dashboard"
          className="px-6 py-2 text-white bg-primary text-primary-foreground hover:bg-primary/90 rounded"
        >
          Let&apos;s get started
        </a>
      </div>
    </main>
  );
}

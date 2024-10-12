import DigitalMatrix from "@/components/ui/digital-matrix.tsx/digital-matrix";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <DigitalMatrix />
      <div className="relative bg-white drop-shadow-xl p-10 rounded-lg flex flex-col items-center justify-around">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Our Site!
        </h1>
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
      </div>
      <p className="absolute bottom-10 text-white/70 text-center">
        The Matrix background is just for fun. It doesn&apos;t mean anything.
      </p>
    </main>
  );
}

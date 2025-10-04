export function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center text-center gap-2">
      <h1 className="text-button font-lora font-extrabold text-5xl md:text-7xl">
        404
      </h1>
      <p className="text-button font-inter font-normal text-md">
        Page Not Found
      </p>
      <p className="text-secondary-text font-inter font-normal text-sm md:max-w-md px-2 mb-4">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>

      <nav>
        <a
          className="bg-button hover:bg-hover text-white font-normal text-md px-6 py-2 rounded-md transition-colors"
          href="/"
        >
          Go Back to Homepage
        </a>
      </nav>
    </main>
  );
}

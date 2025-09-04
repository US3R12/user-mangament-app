export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 dark:bg-black text-neutral-400 dark:text-neutral-500 py-4 text-center transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} User Management App. All rights reserved.</p>
      </div>
    </footer>
  );
}

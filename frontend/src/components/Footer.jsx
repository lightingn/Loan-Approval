export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6 mt-12">
      <div className="container mx-auto text-center px-4">
        <p className="opacity-80 text-sm">© {new Date().getFullYear()} LoanScore AI. ML-powered loan prediction backend.</p>
      </div>
    </footer>
  );
}

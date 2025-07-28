import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-padre-background transition-colors duration-200">
      <section className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <header className="mb-16">
            <h1 className="font-pacifico text-5xl md:text-7xl mb-8 text-padre-primary">
              Padre Gino's
            </h1>
            <p className="text-xl md:text-2xl text-padre-muted font-light">
              Authentic Italian pizza crafted with passion
            </p>
          </header>
          
          <nav aria-label="Main menu">
            <ul className="flex flex-col md:flex-row items-center justify-center gap-4">
              <li>
                <Link 
                  to="/order" 
                  className="btn-secondary w-full md:w-auto min-w-48 inline-block text-center"
                >
                  Order Pizza
                </Link>
              </li>
              <li>
                <Link 
                  to="/past" 
                  className="btn-primary w-full md:w-auto min-w-48 inline-block text-center"
                >
                  Past Orders
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="btn-primary w-full md:w-auto min-w-48 inline-block text-center"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}

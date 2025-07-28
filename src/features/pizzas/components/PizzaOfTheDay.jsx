import { BASE_URL } from "../../../shared/config/constants";
import { usePizzaOfTheDay } from "../../../shared/hooks/usePizzaOfTheDay";
import { intl } from "../../../shared/utils";

const PizzaOfTheDay = () => {
  const { pizza, loading, error } = usePizzaOfTheDay();

  if (loading) {
    return (
      <section className="w-full bg-white rounded-lg p-8 shadow-sm border border-padre-border" aria-labelledby="potd-heading">
        <header className="text-center mb-8">
          <h2 id="potd-heading" className="font-pacifico text-3xl text-padre-primary mb-4">Pizza of the Day</h2>
          <div className="w-full h-px bg-padre-border"></div>
        </header>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8" role="status" aria-live="polite">
          <div className="text-center space-y-3">
            <div className="h-8 bg-padre-light mb-2 rounded animate-pulse w-48" aria-hidden="true"></div>
            <div className="h-6 bg-padre-light mb-2 rounded animate-pulse w-64" aria-hidden="true"></div>
            <div className="h-6 bg-padre-light mb-2 rounded animate-pulse w-32" aria-hidden="true"></div>
          </div>
          <div className="w-64 h-64 bg-padre-light rounded-lg animate-pulse" aria-hidden="true"></div>
          <span className="sr-only">Loading today's featured pizza...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white rounded-lg p-8 shadow-sm border border-padre-border" role="alert">
        <header className="text-center mb-6">
          <h2 className="font-pacifico text-3xl text-padre-primary mb-4">Pizza of the Day</h2>
          <div className="w-full h-px bg-padre-border"></div>
        </header>
        <div className="text-center">
          <p className="text-padre-muted">Error loading today's featured pizza: {error.message}</p>
        </div>
      </section>
    );
  }

  if (!pizza) {
    return (
      <section className="w-full bg-white rounded-lg p-8 shadow-sm border border-padre-border">
        <header className="text-center mb-6">
          <h2 className="font-pacifico text-3xl text-padre-primary mb-4">Pizza of the Day</h2>
          <div className="w-full h-px bg-padre-border"></div>
        </header>
        <div className="text-center">
          <p className="text-padre-muted">No featured pizza available today.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white rounded-lg p-8 shadow-sm border border-padre-border" aria-labelledby="potd-heading">
      <header className="text-center mb-8">
        <h2 id="potd-heading" className="font-pacifico text-3xl text-padre-primary mb-4">Pizza of the Day</h2>
        <div className="w-full h-px bg-padre-border"></div>
      </header>
      <article className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="text-center md:text-left space-y-4 flex-1">
          <header>
            <h3 className="font-pacifico text-2xl text-padre-secondary mb-2">{pizza.name}</h3>
          </header>
          <p className="text-padre-muted leading-relaxed max-w-md">{pizza.description}</p>
          <div className="bg-padre-light rounded-lg p-4">
            <div className="font-semibold text-padre-primary text-xl">
              <span className="sr-only">Starting price: </span>
              <span className="text-base text-padre-muted">From: </span>
              <data value={pizza.sizes.S}>{intl.format(pizza.sizes.S)}</data>
            </div>
          </div>
        </div>
        <figure>
          <img
            src={`${BASE_URL}${pizza.image}`}
            alt={`${pizza.name} pizza`}
            width="256"
            height="256"
            className="w-64 h-64 object-cover rounded-lg shadow-sm border border-padre-border block"
          />
        </figure>
      </article>
    </section>
  );
};

export default PizzaOfTheDay;

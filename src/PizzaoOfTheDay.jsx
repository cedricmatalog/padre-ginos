import { usePizzaOfTheDay } from "./usePizzaOfTheDay";
import { intl } from "./utils";

const PizzaoOfTheDay = () => {
  const { pizza, loading } = usePizzaOfTheDay();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pizza) {
    return <div>No pizza of the day available.</div>;
  }

  const {} = pizza;

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizza.name}</h3>
          <p>{pizza.description}</p>
          <p className="pizza-of-the-day-price">
            From: {intl.format(pizza.sizes.S)}
          </p>
        </div>
        <img
          className="pizza-of-the-day-image"
          src={pizza.image}
          alt={pizza.name}
        />
      </div>
    </div>
  );
};

export default PizzaoOfTheDay;

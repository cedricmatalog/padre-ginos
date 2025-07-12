const Pizza = ({ title, description }) => {
  return (
    <div className="pizza">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Pizza;

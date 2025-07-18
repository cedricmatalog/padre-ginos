import { useState } from "react";

let counter = 0;

const Pizza = ({ title, description, image, name }) => {
  counter = counter++;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="pizza">
      <h1>
        {name} {counter}
      </h1>
      <p>{description}</p>
      {!image || imgError ? (
        <p>Image not available</p>
      ) : (
        <img src={image} alt={name} onError={() => setImgError(true)} />
      )}
    </div>
  );
};

export default Pizza;

import { useState } from "react";

const Pizza = ({ title, description, image, name }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="pizza">
      <h1>{title}</h1>
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

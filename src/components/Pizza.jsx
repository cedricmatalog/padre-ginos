import { useState } from "react";

const Pizza = ({ description, image, name }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="pizza">
      <h1>{name}</h1>
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

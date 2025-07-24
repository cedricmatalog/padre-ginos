import { useState } from "react";
import { BASE_URL } from "../config";

const Pizza = ({ description, image, name }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      {!image || imgError ? (
        <p>Image not available</p>
      ) : (
        <img
          src={`${BASE_URL}${image}`}
          alt={name}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
};

export default Pizza;

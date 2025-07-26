import { useState } from "react";
import { BASE_URL } from "../lib/config";

const Pizza = ({ description, image, name }) => {
  const [imgError, setImgError] = useState(false);
  console.log({ image });

  console.log(image ? `${BASE_URL}${image}` : "https://picsum.photos/200");
  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      {imgError ? (
        <p>Image not available</p>
      ) : (
        <img
          src={image ? ` ${BASE_URL} ${image}` : "https://picsum.photos/200"}
          alt={name}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
};

export default Pizza;

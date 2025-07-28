import { useState } from "react";
import { BASE_URL } from "../../../shared/config/constants";
import type { PizzaProps } from "../../../shared/types";

const Pizza: React.FC<PizzaProps> = ({ description, image, name }) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      {imgError ? (
        <p>Image not available</p>
      ) : (
        <img
          src={image ? `${BASE_URL}${image}` : "https://picsum.photos/200"}
          alt={name}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
};

export default Pizza;

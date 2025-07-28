import { useState } from "react";
import { BASE_URL } from "../../../shared/config/constants";
import type { PizzaProps } from "../../../shared/types";

const Pizza: React.FC<PizzaProps> = ({ description, image, name }) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <article className="bg-white rounded-lg p-6 shadow-sm border border-padre-border hover:shadow-md transition-shadow duration-200">
      <figure className="mb-4">
        {imgError ? (
          <div className="w-full h-48 bg-padre-light rounded-lg flex flex-col items-center justify-center" role="img" aria-label={`${name} pizza image unavailable`}>
            <p className="text-padre-muted text-sm">Image not available</p>
          </div>
        ) : (
          <img
            src={image ? `${BASE_URL}${image}` : "https://picsum.photos/200"}
            alt={`${name} pizza`}
            width="200"
            height="200"
            className="w-full h-48 object-cover rounded-lg"
            onError={() => setImgError(true)}
          />
        )}
      </figure>
      
      <div className="text-center">
        <header className="mb-3">
          <h2 className="font-pacifico text-xl text-padre-primary">
            {name}
          </h2>
        </header>
        <p className="text-padre-muted text-sm leading-relaxed">{description}</p>
      </div>
    </article>
  );
};

export default Pizza;

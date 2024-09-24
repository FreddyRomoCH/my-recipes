import { DB_URL } from "../../utils/constant";
import { useGetCountries } from "../../hooks/useCountries.js";

export function SingleImage({ country, image, title }) {
  const { getFlag } = useGetCountries();
  const flag = getFlag({ country });

  return (
    <div className="main-image relative h-80 w-full mb-4 overflow-hidden rounded">
      <picture>
        <div className="absolute top-4 left-4 text-3xl z-10">{flag}</div>
        <img
          src={`${DB_URL}/uploads/${image}`}
          alt={`Cover ${title}`}
          className="absolute object-cover top-0 left-0 w-full h-full hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </picture>
    </div>
  );
}

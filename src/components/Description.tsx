import React, { FC } from "react";
import formatter from "@/utils/formatter";
import { IDetails } from "@/interfaces/Details";

interface IDescriptionProps {
  details: IDetails;
}

const Description: FC<IDescriptionProps> = ({ details }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Ingredients:
      </h2>
      {/* I use index as a key, because I noticed that identifiers are duplicated for some reason*/}
      <div className="space-y-2">
        {details.extendedIngredients.map((ingredient: any, index: number) => (
          <div
            key={`${ingredient.name}-${index}`}
            className="flex items-center gap-3 p-2 border-b border-gray-200 last:border-none"
          >
            <p className="text-gray-800">{ingredient.name}</p>
            <p className="text-gray-500">{ingredient.original}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-lg font-semibold text-gray-700">
          Preparation time:{" "}
          <span className="text-gray-500">
            {details.preparationMinutes} min
          </span>
        </p>
      </div>

      <div className="mt-4 text-gray-700">
        <p className="text-lg">{formatter(details.summary)}</p>
      </div>
    </div>
  );
};

export default Description;

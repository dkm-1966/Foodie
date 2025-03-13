"use client";

import React, { useState } from "react";
import Input from "./UI/Input";
import DropDownMenu from "./UI/DropDownMenu";
import Button from "./UI/Button";
import { useRouter } from "next/navigation";
import { cuisines } from "@/consts/meals";

const Form = () => {
  const [query, setQuery] = useState<string>("");
  const [preparationTime, setPreparationTime] = useState<number | undefined>();
  const [cuisine, setCuisine] = useState<string>("");
  const router = useRouter();

  const handleNext = () => {
    const queryParams = new URLSearchParams();
    if (query) queryParams.append("query", query);
    if (cuisine) queryParams.append("cuisine", cuisine);
    if (preparationTime)
      queryParams.append("maxReadyTime", preparationTime.toString());

    router.push(`/recipes?${queryParams.toString()}`);
  };

  return (
    <form
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg mt-6"
      onSubmit={(e) => e.preventDefault()}
      aria-labelledby="recipe-form"
    >
      <h2 id="recipe-form" className="text-xl font-semibold text-gray-700">
        Search for Recipes
      </h2>

      <div className="flex flex-col">
        <label htmlFor="category" className="text-gray-600 mb-2">
          Category
        </label>
        <DropDownMenu
          id="category"
          title={"Category"}
          params={cuisines}
          selector={setCuisine}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="meal-name" className="text-gray-600 mb-2">
          Meal Name
        </label>
        <Input
          id="meal-name"
          type={"text"}
          value={query}
          placeholder={"Type meal name"}
          changeHandler={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="preparation-time" className="text-gray-600 mb-2">
          Preparation Time (in minutes)
        </label>
        <Input
          id="preparation-time"
          type={"number"}
          value={preparationTime?.toString()}
          placeholder={"Preparation time"}
          changeHandler={(event) =>
            setPreparationTime(
              event.target.value ? parseInt(event.target.value) : 0
            )
          }
        />
      </div>

      <div className="h-10">
        {(query || cuisine || preparationTime) && (
          <Button type="submit" clickHandler={handleNext}>
            Next
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;

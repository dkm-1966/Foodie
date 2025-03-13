import { CACHE_TIME } from "@/consts/meals";
import { baseUrl } from "@/consts/urls";
import { Recipe } from "@/interfaces/Recipe";
import { SearchParams } from "@/interfaces/SearchParams";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function getRecipes(
  query: string,
  cuisine: string,
  maxReadyTime: string
) {
  const url = `${baseUrl}/recipes/complexSearch?${
    query ? `query=${query}&` : ""
  }${cuisine ? `cuisine=${cuisine}&` : ""}${
    maxReadyTime ? `maxReadyTime=${maxReadyTime}&` : ""
  }apiKey=${process.env.API_KEY}`;

  const response = await fetch(url, {
    next: { revalidate: CACHE_TIME },
  });

  if (!response.ok) throw new Error("Failed to fetch recipes");

  const data = await response.json();
  return data.results || [];
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query = "", cuisine = "", maxReadyTime = "" } = await searchParams;

  let recipes: Recipe[] = [];

  try {
    recipes = await getRecipes(query, cuisine, maxReadyTime);
  } catch (error) {
    return (
      <p className="text-red-500 text-center mt-4">Error fetching recipes</p>
    );
  }

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-700 text-center mb-8">
        Recipes
      </h1>

      <Suspense
        fallback={<p className="text-center text-blue-500">Loading...</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Link
                href={`/recipes/${recipe.id}`}
                key={recipe.id}
                aria-label={`View recipe: ${recipe.title}`}
              >
                <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 min-h-100">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  <h3 className="mt-4 text-xl font-semibold text-gray-700 text-center sm:text-2xl md:text-2xl">
                    {recipe.title}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No recipes found</p>
          )}
        </div>
      </Suspense>
    </main>
  );
}

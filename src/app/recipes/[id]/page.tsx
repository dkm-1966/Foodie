import Image from "next/image";
import formatter from "@/utils/formatter";
import { baseUrl } from "@/consts/urls";
import { IDetails } from "@/interfaces/Details";
import Description from "@/components/Description";
import { Suspense } from "react";

async function getDetails(id: number) {
  const response = await fetch(
    `${baseUrl}/recipes/${id}/information?apiKey=${process.env.API_KEY}`
  );

  if (!response.ok) throw new Error("Failed to fetch recipes");

  const data = await response.json();

  return data;
}

export default async function RecipeDetails({
  params,
}: {
  params: { id: number };
}) {
  let details;
  let formattedDetails: IDetails;

  try {
    details = await getDetails(params.id);

    formattedDetails = {
      title: details.title,
      image: details.image,
      extendedIngredients: details.extendedIngredients,
      preparationMinutes: details.preparationMinutes,
      summary: details.summary,
    };
  } catch {
    return (
      <p className="text-red-500 text-center mt-4">Error fetching details</p>
    );
  }

  return (
    <Suspense
      fallback={<p className="text-center text-blue-500">Loading...</p>}
    >
      <main className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-extrabold text-gray-700 text-center mb-6">
          {formattedDetails.title}
        </h1>

        <div className="flex justify-center mb-8">
          <Image
            src={formattedDetails.image}
            alt={formattedDetails.title}
            width={500}
            height={300}
            className="w-full h-60 object-cover rounded-lg shadow-lg"
          />
        </div>

        <Description details={formattedDetails} />
      </main>
    </Suspense>
  );
}

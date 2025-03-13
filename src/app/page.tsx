import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="flex w-full h-full flex-col p-6 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-700 text-center mb-8">
        Find Delicious Recipes with Foodie
      </h1>
      <Form />
    </main>
  );
}

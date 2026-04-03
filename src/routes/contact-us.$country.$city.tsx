import { getCities } from '@/lib/mock';
import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/contact-us/$country/$city')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const cities = await getCities(params.country);
    if (!cities.includes(params.city)) {
      throw notFound();
    }

    return { city: params.city };
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { city } = Route.useLoaderData();

  return (
    <div>
      Hello "/contact-us/$country/{city}"!
      <h1 className="heading">Selected city: {city}</h1>
    </div>
  );
}

import { getCities } from '@/lib/mock';
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from '@tanstack/react-router';

export const Route = createFileRoute('/contact-us/$country')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const cities = await getCities(params.country);
    if (cities.length === 0) {
      throw notFound();
    }
    return { cities };
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { cities } = Route.useLoaderData();

  return (
    <div className="space-y-3">
      <h2 className="heading">Cities:</h2>
      <div className="list">
        {cities.map((city) => (
          <Link
            key={city}
            className="card"
            activeProps={{ className: 'active-card' }}
            to="/contact-us/$country/$city"
            from="/contact-us/$country"
            params={{ city }}
          >
            <span className="city">{city}</span>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

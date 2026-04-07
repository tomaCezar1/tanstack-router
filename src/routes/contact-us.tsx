import { getCountries } from '@/lib/mock';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/contact-us')({
  component: RouteComponent,
  loader: async () => {
    const countries = await getCountries();
    return { countries };
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { countries } = Route.useLoaderData();

  return (
    <div className="space-y-3">
      <h2 className="heading">Which country are you from?</h2>
      <div className="list">
        {countries.map((country) => (
          <Link
            key={country.name}
            className="card"
            activeProps={{ className: 'active-card' }}
            to="/contact-us/$country"
            params={{ country: country.name }}
          >
            <span className="title">{country.name}</span>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

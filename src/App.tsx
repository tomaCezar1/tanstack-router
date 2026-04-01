import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useRouterContextState } from './lib/useRouterContextState';

function App() {
  const routerContextState = useRouterContextState();

  return <RouterProvider router={router} context={routerContextState} />;
}

export default App;

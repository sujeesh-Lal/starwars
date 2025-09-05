import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const RouteLoaderError: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-4 text-red-700">
        <h2 data-testid="rle-error-status" className="text-lg font-bold">
          Error {error.status} - {error.data}
        </h2>
        <p data-testid="rle-status-test">{error.statusText}</p>
      </div>
    );
  }

  return (
    <div className="p-4 text-red-700">
      <h2 data-testid="rle-unexpected-error" className="text-lg font-bold">
        Unexpected Error
      </h2>
      <p data-testid="rle-p-error">{String(error)}</p>
    </div>
  );
};
export default RouteLoaderError;

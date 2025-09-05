import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate(`/`);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-800">
        <h1 data-testid="nf-404" className="text-4xl font-bold mb-4">
          404
        </h1>
        <p data-testid="nf-page-not-foud" className="text-lg">
          Page Not Found
        </p>
        <Button data-testid="nf-btn-home" onClick={backToHome} label="Go Home" />
      </div>
    </>
  );
};
export default NotFound;

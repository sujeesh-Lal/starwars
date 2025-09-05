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
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg">Page Not Found</p>
        <Button onClick={backToHome} label="Go Home" />
      </div>
    </>
  );
};
export default NotFound;

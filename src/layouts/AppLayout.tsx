import { Outlet } from "react-router-dom";
import Footer from "@layouts/Footer";
import Header from "@layouts/Header";

export default function AppLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="pt-16 flex-1 flex flex-col">
          <div className="flex-1 bg-gray-100 p-4">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

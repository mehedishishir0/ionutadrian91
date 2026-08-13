import { Metadata } from "next";
import IncidentsPage from "./_components/IncidentsPage";

export const metadata: Metadata = {
  title: "Incident Reports",
};

export default function Page() {
  return <IncidentsPage />;
}

import { redirect } from "next/navigation";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "@/app/_styles/global.css";
import AppRoutes from "./_lib/appRoutes";

export default function Page() {
  // default redirection to /movies
  redirect(AppRoutes.Movies);
}

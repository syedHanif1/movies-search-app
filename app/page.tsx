import { redirect } from "next/navigation";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "@/app/_styles/global.css";

export default function Home() {
  // default redirection to /movies
  redirect("/movies");
}

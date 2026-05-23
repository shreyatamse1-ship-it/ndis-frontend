import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); // or "/signin" if that's your route
}
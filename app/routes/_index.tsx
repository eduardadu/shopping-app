import HomePage from "./home";
import { productsLoader } from "../utils/loaders";

export const loader = productsLoader;

export default function Index() {
  return <HomePage />;
}

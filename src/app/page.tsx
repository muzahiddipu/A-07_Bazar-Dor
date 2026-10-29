import AllProducts from "@/components/AllProducts";
import HomePage from "@/components/HomePage";
import PriceDecreased from "@/components/PriceDecreased";
import PriceIncreased from "@/components/PriceIncreased";

export default function Home() {
  return (
    <div>
      <HomePage></HomePage>
      <PriceIncreased></PriceIncreased>
      <PriceDecreased></PriceDecreased>
      <AllProducts></AllProducts>
    </div>
  );
}

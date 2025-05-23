import Container from "@/components/code/Container";
import Hero from "@/components/code/Homepage/Hero";
import HomeCategories from "@/components/code/Homepage/HomeCategories";
import LatestBlog from "@/components/code/Homepage/LatestBlog";
import ProductGrid from "@/components/code/Homepage/ProductGrid";
import ShopByBrands from "@/components/code/Homepage/ShopByBrands";
import { getCategories } from "@/sanity/queries";

const Home = async () => {
  const categories = await getCategories(6);

  return (
    <>
      <Hero />
      <Container className="">
        <div className="py-10">
          <ProductGrid />
        </div>
        <HomeCategories categories={categories} />
        <ShopByBrands />
        <LatestBlog />
      </Container>
    </>
  );
};

export default Home;

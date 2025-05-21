import Container from "@/components/code/Container";
import Hero from "@/components/code/Homepage/Hero";
import HomeCategories from "@/components/code/Homepage/HomeCategories";
import ProductGrid from "@/components/code/Homepage/ProductGrid";

const Home = () => {
  return (
    <>
      <Hero />
      <Container className="">
        <div className="py-10">
          <ProductGrid />
        </div>
        <HomeCategories />
      </Container>
    </>
  );
};

export default Home;

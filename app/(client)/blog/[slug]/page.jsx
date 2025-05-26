import React from "react";
import Container from "@/components/code/Container";

const SingleBlogPage = async ({ params }) => {
  const { slug } = await params;
  return (
    <Container>
      <div className="py-3">
        <h2 className="mt-5 tracking-wide uppercase font-bold">Blog Details</h2>
        <p className="mt-2 text-gray-600">{slug}</p>
      </div>
    </Container>
  );
};

export default SingleBlogPage;

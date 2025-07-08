import React from "react";
import Banner from "./Components/Banner";
import Newsletter from "./Components/NewsLatter";
import FAQ from "./Components/FAQ";
import StudentReview from "./Components/StudentReview";
import FeaturedClassess from "./Components/FeaturedClassess";

const Home = () => {
  return (
    <div>
      <section>
        <Banner />
      </section>
      <section>
        <FeaturedClassess />
      </section>
      <section>
        <StudentReview />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section>
        <Newsletter />
      </section>
    </div>
  );
};

export default Home;

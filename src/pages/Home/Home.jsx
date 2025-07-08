import React from "react";
import Banner from "./Components/Banner";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        <>
          <section>
            <Banner />
          </section>
        </>
      ) : (
        <LoadingSpinner/>
      )}
    </div>
  );
};

export default Home;

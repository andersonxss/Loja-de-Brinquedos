import React from "react";
import Cards from "./components/cards";
import Charts from "./components/charts";

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <Cards />
      <Charts />
    </div>
  );
};

export default Home;

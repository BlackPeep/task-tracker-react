import React from "react";

export const Section = ({ children }) => {
  return (
    <section className="w-full md:w-3/4 lg:w-1/2 mx-16 my-8">
      {children}
    </section>
  );
};

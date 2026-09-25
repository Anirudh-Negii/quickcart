function About() {
  return (
    <section className="flex min-h-[25vh] items-center bg-[#1c1c1c] px-6 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-orange-500">
          Welcome to QuickCart
        </p>

        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          Everything you need,{" "}
          <span className="text-orange-500">just a click away.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
          Discover quality products at great prices. QuickCart makes it simple
          to browse, explore, and find what you're looking for.
        </p>
      </div>
    </section>
  );
}

export default About;

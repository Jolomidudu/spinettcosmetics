import Link from "next/link";

const trustPoints = [
  {
    title: "Clean formulas",
    detail: "Thoughtful ingredients, clearly listed",
  },
  {
    title: "Vegan + cruelty-free",
    detail: "Beauty with a lighter footprint",
  },
  {
    title: "Free shipping",
    detail: "On orders over $75",
  },
  {
    title: "Easy returns",
    detail: "30 days to change your mind",
  },
];

const TrustStrip = () => {
  return (
    <section aria-label="Spinett Cosmetics promises" className="border-y border-[#E7D8D2] bg-[#FFF9F6]">
      <div className="mx-auto grid w-full max-w-[1170px] grid-cols-2 divide-x divide-y divide-[#E7D8D2] px-4 sm:px-8 md:grid-cols-4 md:divide-y-0 xl:px-0">
        {trustPoints.map((point) => (
          <Link href="/contact" key={point.title} className="group px-4 py-5 sm:px-6 sm:py-6">
            <p className="text-sm font-medium text-dark group-hover:text-blue">{point.title}</p>
            <p className="mt-1 text-xs leading-5 text-dark-3">{point.detail}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrustStrip;

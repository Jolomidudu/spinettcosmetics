import Image from "next/image";
import Link from "next/link";

const routines = [
  {
    step: "01 / Reset",
    title: "Cleanse softly",
    description: "Start with a calm, comfortable canvas that never feels stripped.",
    image: "/images/products/fair-white/so-white-exfoliating-soap.jpg",
  },
  {
    step: "02 / Treat",
    title: "Layer your glow",
    description: "Target dullness and dehydration with concentrated, skin-loving care.",
    image: "/images/products/fair-white/so-white-dark-spot-gel.png",
  },
  {
    step: "03 / Protect",
    title: "Keep it luminous",
    description: "Seal in comfort and finish every morning with daily mineral SPF.",
    image: "/images/products/fair-white/so-white-essentials-kit.png",
  },
];

const RoutineGuide = () => {
  return (
    <section className="overflow-hidden bg-[#FBF4F0] py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-[520px]">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#A47768]">
              Your everyday ritual
            </p>
            <h2 className="font-semibold text-2xl text-dark sm:text-3xl">
              Three quiet steps to a brighter-looking day.
            </h2>
            <p className="mt-4 leading-7 text-dark-3">
              Thoughtful formulas, simple layers, and a little more time for yourself.
            </p>
          </div>
          <Link
            href="/shop-without-sidebar"
            className="inline-flex w-fit border-b border-[#A47768] pb-1 text-sm font-medium text-[#8C6254] hover:text-dark"
          >
            Explore all rituals
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {routines.map((routine) => (
            <Link
              href="/shop-without-sidebar"
              key={routine.step}
              className="group grid grid-cols-[112px_1fr] items-center gap-5 border-t border-[#DCC6BC] pt-5 md:block md:border-t-0 md:pt-0"
            >
              <div className="relative aspect-square overflow-hidden bg-[#F4E6DF] md:mb-6">
                <Image
                  src={routine.image}
                  alt={routine.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 112px"
                  className="object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#A47768]">
                  {routine.step}
                </p>
                <h3 className="mt-2 font-medium text-xl text-dark group-hover:text-[#A47768]">
                  {routine.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-dark-3">{routine.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoutineGuide;

import Image from "next/image";
import Link from "next/link";
import shopData from "@/components/Shop/shopData";

const routines = [
  {
    eyebrow: "The complete ritual",
    title: "Soft morning glow",
    description: "Cleanse, replenish, and protect in three easy layers.",
    products: [2, 1, 8],
    href: "/our-store?routineStep=cleanse",
    tone: "bg-[#F8E9E4]",
  },
  {
    eyebrow: "The comfort edit",
    title: "Dry skin, cared for",
    description: "A richer, softer routine for skin asking for extra comfort.",
    products: [2, 5, 7],
    href: "/our-store?concern=Dryness",
    tone: "bg-[#F3E8D9]",
  },
];

const gifts = [
  {
    title: "The Glow Set",
    description: "Serum, mist, and SPF for a luminous daily ritual.",
    products: [1, 3, 8],
    price: "$96",
    was: "$148",
  },
  {
    title: "Softness Set",
    description: "A gentle cleanser, body butter, and overnight lip care.",
    products: [2, 5, 7],
    price: "$72",
    was: "$102",
  },
];

const concerns = [
  { title: "Dullness", detail: "Bring back the light", href: "/our-store?concern=Dullness" },
  { title: "Dehydration", detail: "Find your water layers", href: "/our-store?concern=Dehydration" },
  { title: "Sensitivity", detail: "Care for a calm barrier", href: "/our-store?concern=Sensitivity" },
  { title: "Dryness", detail: "Meet your comfort ritual", href: "/our-store?concern=Dryness" },
];

const getProducts = (ids: number[]) => ids.map((id) => shopData.find((product) => product.id === id)).filter(Boolean);

const BeautyFeatures = () => {
  return (
    <>
      <section className="overflow-hidden py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 max-w-[560px]">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#A47768]">Curated for you</p>
            <h2 className="font-semibold text-2xl text-dark sm:text-3xl">Routines that do more with less.</h2>
            <p className="mt-4 leading-7 text-dark-3">Build a complete ritual around the way your skin feels today.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {routines.map((routine) => (
              <Link href={routine.href} key={routine.title} className={`${routine.tone} group block p-6 sm:p-8`}>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8C6254]">{routine.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-medium text-dark">{routine.title}</h3>
                <p className="mt-2 max-w-[330px] text-sm leading-6 text-dark-3">{routine.description}</p>
                <div className="mt-8 flex -space-x-3">
                  {getProducts(routine.products).map((product) => (
                    <span key={product!.id} className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white transition group-hover:translate-x-1">
                      <Image src={product!.imgs!.previews[0]} alt={product!.title} fill sizes="80px" className="object-contain" />
                    </span>
                  ))}
                </div>
                <span className="mt-7 inline-block border-b border-[#A47768] pb-1 text-sm font-medium text-[#8C6254]">Shop this ritual</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#FBF4F0] py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#A47768]">Ready to wrap</p>
              <h2 className="font-semibold text-2xl text-dark sm:text-3xl">Gift sets for softer moments.</h2>
            </div>
            <Link href="/gift-sets" className="text-sm font-medium text-[#8C6254] underline underline-offset-4">Explore gifts</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {gifts.map((gift) => (
              <Link href="/gift-sets" key={gift.title} className="group flex items-center justify-between border border-[#E1CEC6] bg-white p-6 sm:p-8">
                <div>
                  <h3 className="text-xl font-medium text-dark">{gift.title}</h3>
                  <p className="mt-2 max-w-[230px] text-sm leading-6 text-dark-3">{gift.description}</p>
                  <p className="mt-5 text-lg font-medium text-[#A65F6B]">{gift.price} <span className="ml-2 text-sm text-dark-4 line-through">{gift.was}</span></p>
                </div>
                <div className="flex -space-x-5">
                  {getProducts(gift.products).map((product) => (
                    <span key={product!.id} className="relative h-24 w-16 overflow-hidden rounded-full border-4 border-white bg-[#F8EEE9]">
                      <Image src={product!.imgs!.previews[0]} alt={product!.title} fill sizes="64px" className="object-contain" />
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#A47768]">Ingredient spotlight</p>
              <h2 className="font-semibold text-2xl text-dark sm:text-3xl">Rosehip oil, made for the glow.</h2>
              <p className="mt-5 leading-7 text-dark-3">A naturally nourishing oil with a lightweight feel, chosen to help skin look brighter, smoother, and deeply cared for.</p>
              <Link href="/our-store?ingredient=Rosehip%20oil" className="mt-7 inline-flex border-b border-[#A47768] pb-1 text-sm font-medium text-[#8C6254]">Shop rosehip formulas</Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["Brightening", "Nourishing", "Lightweight", "Plant-powered"].map((label, index) => (
                <div key={label} className="flex aspect-square items-center justify-center bg-[#F8E9E4] p-4 text-center text-sm font-medium text-[#8C6254] sm:p-6">
                  <span><span className="mb-2 block text-2xl text-[#B86F78]">0{index + 1}</span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#352725] py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-10 max-w-[560px]">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#D8ADA7]">Shop by concern</p>
            <h2 className="font-semibold text-2xl text-white sm:text-3xl">Meet your skin where it is.</h2>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[#80605A] sm:grid-cols-4">
            {concerns.map((concern) => (
              <Link href={concern.href} key={concern.title} className="group bg-[#352725] p-5 transition hover:bg-[#493633] sm:p-7">
                <h3 className="text-lg font-medium text-white">{concern.title}</h3>
                <p className="mt-2 text-sm text-[#D8C2BC]">{concern.detail}</p>
                <span className="mt-8 block text-sm text-[#D8ADA7] group-hover:text-white">Shop concern</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BeautyFeatures;

import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import shopData from "../Shop/shopData";
import Image from "next/image";

const sets = [
  { title: "The Glow Set", description: "Serum, mist, and daily mineral SPF for a luminous ritual.", ids: [1, 3, 8], price: "$96", was: "$148" },
  { title: "Softness Set", description: "Cleanser, body butter, and overnight lip care for comfort everywhere.", ids: [2, 5, 7], price: "$72", was: "$102" },
];

const GiftSets = () => (
  <>
    <Breadcrumb title="Gift Sets" pages={["gift sets"]} />
    <main className="bg-[#FBF4F0] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="max-w-[620px]">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#A47768]">Ready to wrap</p>
          <h1 className="text-3xl font-semibold text-dark sm:text-5xl">Gifts that feel personal.</h1>
          <p className="mt-6 text-lg leading-8 text-dark-3">Curated rituals for birthdays, thank-yous, and the people who deserve a softer moment.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {sets.map((set) => (
            <article key={set.title} className="border border-[#E3D2CB] bg-white p-6 sm:p-8">
              <div className="flex min-h-[180px] items-center justify-center gap-[-12px] bg-[#F9EEE9]">
                {set.ids.map((id) => { const product = shopData.find((item) => item.id === id); return product ? <Image key={id} src={product.imgs!.previews[0]} alt={product.title} width={150} height={150} className="h-36 w-28 object-contain" /> : null; })}
              </div>
              <h2 className="mt-7 text-2xl font-medium text-dark">{set.title}</h2>
              <p className="mt-2 leading-7 text-dark-3">{set.description}</p>
              <p className="mt-5 text-lg font-medium text-[#A65F6B]">{set.price} <span className="ml-2 text-sm text-dark-4 line-through">{set.was}</span></p>
              <Link href="/our-store?category=Gift%20Sets" className="mt-6 inline-flex bg-blue px-6 py-3 text-sm font-medium text-white hover:bg-blue-dark">Shop this set</Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  </>
);

export default GiftSets;

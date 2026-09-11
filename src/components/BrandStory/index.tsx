import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";

const BrandStory = () => (
  <>
    <Breadcrumb title="Our Story" pages={["our story"]} />
    <main className="bg-[#FBF4F0] py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1170px] gap-12 px-4 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] xl:px-0">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#A47768]">Beauty, made more human</p>
          <h1 className="max-w-[650px] text-3xl font-semibold leading-tight text-dark sm:text-5xl">A quieter way to care for your skin.</h1>
          <p className="mt-7 max-w-[620px] text-lg leading-8 text-dark-3">Spinett Cosmetics began with a simple belief: the products we use every day should make space for comfort, confidence, and a little more time for ourselves.</p>
          <p className="mt-5 max-w-[620px] leading-7 text-dark-3">We make uncomplicated formulas with considered ingredients, sensorial textures, and honest guidance. No crowded routines. No pressure to be perfect. Just beautiful essentials that earn their place on your shelf.</p>
          <Link href="/shop-with-sidebar" className="mt-8 inline-flex bg-blue px-7 py-3 font-medium text-white hover:bg-blue-dark">Shop the collection</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 self-start pt-4">
          {[["01", "Skin first"], ["02", "Small rituals"], ["03", "Clear labels"], ["04", "Thoughtful care"]].map(([number, label]) => (
            <div key={number} className="aspect-square bg-white p-5 shadow-1 sm:p-7"><span className="text-3xl text-[#B86F78]">{number}</span><p className="mt-8 font-medium text-dark">{label}</p></div>
          ))}
        </div>
      </div>
    </main>
  </>
);

export default BrandStory;

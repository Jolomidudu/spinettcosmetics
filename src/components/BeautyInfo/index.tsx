import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";

type BeautyInfoProps = { kind: "ingredients" | "shipping" | "faq" };

const content = {
  ingredients: {
    title: "Ingredient Notes",
    eyebrow: "What is inside",
    intro: "Every formula starts with a clear purpose and a short list of ingredients chosen for how they feel and perform.",
    items: [
      ["Rosehip oil", "A lightweight botanical oil that helps skin look brighter and feel nourished."],
      ["Hyaluronic acid", "A hydration-binding ingredient that leaves skin feeling plump and comfortable."],
      ["Niacinamide", "A versatile skin-supporting ingredient for a smoother, more even-looking complexion."],
      ["Squalane", "A silky emollient that helps soften skin without a heavy finish."],
    ],
  },
  shipping: {
    title: "Shipping & Returns",
    eyebrow: "Care beyond the bottle",
    intro: "We want your order to arrive beautifully and give you enough time to decide if it belongs in your ritual.",
    items: [
      ["Shipping", "Orders over $75 ship free. Orders are prepared within 1 to 2 business days, then sent with tracking."],
      ["Returns", "Unopened items can be returned within 30 days. Contact care@spinettcosmetics.com and we will guide you through the next step."],
      ["Damaged orders", "Please contact us within 48 hours with a photo of the package so we can make it right."],
      ["Samples", "When available, samples are added thoughtfully to qualifying orders so you can discover your next favorite."],
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    eyebrow: "A little clarity",
    intro: "Answers for building a routine that feels simple, considered, and right for you.",
    items: [
      ["How do I build a routine?", "Start with cleanse, treat, hydrate, and protect. Add one new product at a time so you can notice what your skin enjoys."],
      ["Are your products vegan and cruelty-free?", "Most of the collection is vegan and cruelty-free. Each product page shows its current formulation labels."],
      ["Can I use active ingredients every day?", "Follow the product guidance and begin slowly. Patch test new formulas, especially when your skin is sensitive."],
      ["How can I contact the team?", "Write to care@spinettcosmetics.com or visit our contact page. We are happy to help you choose a ritual."],
    ],
  },
};

const BeautyInfo = ({ kind }: BeautyInfoProps) => {
  const page = content[kind];
  return (
    <>
      <Breadcrumb title={page.title} pages={[page.title.toLowerCase()]} />
      <main className="bg-[#FBF4F0] py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[900px] px-4 sm:px-8 xl:px-0">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#A47768]">{page.eyebrow}</p>
          <h1 className="text-3xl font-semibold text-dark sm:text-5xl">{page.title}</h1>
          <p className="mt-6 max-w-[680px] text-lg leading-8 text-dark-3">{page.intro}</p>
          <div className="mt-12 grid gap-4">
            {page.items.map(([title, description]) => (
              <details key={title} className="group border border-[#E3D2CB] bg-white px-5 py-5 sm:px-7">
                <summary className="cursor-pointer list-none font-medium text-dark group-open:text-blue">{title}</summary>
                <p className="mt-3 max-w-[720px] leading-7 text-dark-3">{description}</p>
              </details>
            ))}
          </div>
          <Link href="/shop-with-sidebar" className="mt-10 inline-flex border-b border-[#A47768] pb-1 font-medium text-[#8C6254]">Continue shopping</Link>
        </div>
      </main>
    </>
  );
};

export default BeautyInfo;

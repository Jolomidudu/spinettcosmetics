"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper's pagination stylesheet is resolved at runtime, but may not expose
// TypeScript declarations in some Swiper versions.
// @ts-expect-error -- stylesheet side-effect import has no type declarations.
import "swiper/css/pagination";
// @ts-expect-error -- stylesheet side-effect import has no type declarations.
import "swiper/css";

import Image from "next/image";

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-pink-500">
                30%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Glow
                <br />
                Ritual
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">Skin-first essentials for a brighter, calmer glow.</a>
            </h1>

            <p>
              Build a soft, healthy routine with hydrating serums, barrier-friendly cleansers, and radiant finishing care.
            </p>

            <a
              href="/shop-without-sidebar"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-[#C66B8C] py-3 px-9 ease-out duration-200 hover:bg-[#b95d7f] mt-10"
            >
              Shop Bestsellers
            </a>
          </div>

          <div>
            <Image
              src="/images/hero/faw.webp"
              alt="beauty product"
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-[#C66B8C]">
                New
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Beauty
                <br />
                Edit
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">Hydration, color, and self-care in one ritual.</a>
            </h1>

            <p>
              Discover luminous textures, clean formulas, and everyday favorites designed to elevate your routine.
            </p>

            <a
              href="/shop-without-sidebar"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-[#C66B8C] mt-10"
            >
              Explore Collection
            </a>
          </div>

          <div>
            <Image
              src="/images/hero/swg.webp"
              alt="beauty collection"
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;

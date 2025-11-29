"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { IconArrowRight } from "@tabler/icons-react"

interface WelcomeStep1Props {
  userName: string
  onNext: () => void
}

export default function WelcomeStep1({ userName, onNext }: WelcomeStep1Props) {
  const testimonials = [
    {
      name: "Aarohi",
      duration: "2 MONTHS",
      tags: ["pigmentation", "fine lines"],
      beforeImage: "https://formial.in/cdn/shop/files/1_Acne_before.png?v=1760417252&width=300",
      afterImage: "https://formial.in/cdn/shop/files/1_Acne_after.jpg?v=1760417179&width=300"
    },
    {
      name: "Meera",
      duration: "3 MONTHS",
      tags: ["dullness", "texture"],
      beforeImage: "https://formial.in/cdn/shop/files/2_acne_before.jpg?v=1760442136&width=300",
      afterImage: "https://formial.in/cdn/shop/files/2_acne_after.jpg?v=1760442165&width=300"
    },
    {
      name: "Arjun",
      duration: "2 MONTHS",
      tags: ["pimples"],
      beforeImage: "https://formial.in/cdn/shop/files/Franklin_before.jpg?v=1760441978&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Franklin_after.jpg?v=1760417775&width=300"
    },
    {
      name: "Rahul",
      duration: "3 MONTHS",
      tags: ["acne", "pimples", "texture"],
      beforeImage: "https://formial.in/cdn/shop/files/Sparsh_before_1.jpg?v=1760417955&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Sparsh_after_1.jpg?v=1760417776&width=300"
    },
    {
      name: "Tanvi",
      duration: "2 MONTHS",
      tags: ["scarring"],
      beforeImage: "https://formial.in/cdn/shop/files/Myla_before.jpg?v=1760418164&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Myla_after.jpg?v=1760442197&width=300"
    },
    {
      name: "Vikaram",
      duration: "3 Months",
      tags: ["skin glow"],
      beforeImage: "https://formial.in/cdn/shop/files/Vish_before.jpg?v=1760418713&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Vish_after.jpg?v=1760418750&width=300"
    },
    {
      name: "Ritika",
      duration: " 2 MONTHS",
      tags: ["Skin Glow"],
      beforeImage: "https://formial.in/cdn/shop/files/Glow_before.jpg?v=1760442260&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Glow_after.jpg?v=1760442227&width=300"
    },
    {
      name: "Ravi",
      duration: "2 MONTHS",
      tags: ["anti-aging"],
      beforeImage: "https://formial.in/cdn/shop/files/0f9c4b1732486cb4d030166e57e10aa61a1963e3.jpg?v=1760441871&width=300",
      afterImage: "https://formial.in/cdn/shop/files/06d6109bf1e44c41dd7360e39d4ed29eb0d9707b.jpg?v=1760441899&width=300"
    }
  ]

  const tagColors: { [key: string]: string } = {
    pigmentation: "bg-yellow-200 text-yellow-900 border-yellow-300",
    "fine lines": "bg-green-200 text-green-900 border-green-300",
    dullness: "bg-blue-200 text-blue-900 border-blue-300",
    pimples: "bg-red-200 text-red-900 border-red-300",
    acne: "bg-red-200 text-red-900 border-red-300",
    texture: "bg-yellow-200 text-yellow-900 border-yellow-300",
    "acne scars": "bg-indigo-200 text-indigo-900 border-indigo-300",
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="md:flex md:flex-row flex-col md:max-w-5xl w-full justify-between items-center h-fit md:items-center md:justify-center overflow-x-hidden md:overflow-y-auto my-auto mx-auto mt-12 md:mt-0"
      style={{ overflowY: "auto" }}
    >
      {/* Left Column - Content */}
      <div
        className="
          flex-1
          flex
          flex-col
          items-center
          justify-center
          md:px-16
          mx-auto
          mt-8
          w-full
          max-w-full
          md:max-w-none
          md:h-auto
        "
        style={{ minHeight: "fit-content", overflow: "visible" }}
      >
        <div
          className="
            w-full
            flex
            flex-col
            items-center
            justify-center
            mx-auto
            max-w-xs
            md:max-w-none
            overflow-visible
            gap-4
          "
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 10,
              ease: "easeInOut"
            }}
            className="text-3xl md:text-4xl font-medium tracking-tight text-center"
            style={{ color: '#1E3F2B' }}
          >
            <p className=" text-center text-4xl mb-6">
              <span className="">Hello{" "}</span>
              {((userName ?? "Pawan") + "!").split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.2,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 500,
                    damping: 50,
                    mass: 10,
                    ease: "easeInOut",
                  }}
                  className={
                    "italic font-instrument-serif" +
                    (char === "!" ? " ml-1" : "")
                  }
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </p>
            <p className="text-center mt-0 mb-2">Welcome to Formial</p>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:text-lg text-md text-gray-600 text-center mx-auto w-full max-w-xs md:max-w-full tracking-tight"
            style={{ margin: "0.3rem 0" }}
          >
            Get ready to see real results.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex w-full justify-center"
            style={{ margin: "0.3rem 0" }}
          >
            <button
              onClick={onNext}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                px-6
                py-3
                bg-[#1E3F2B]
                text-white
                rounded-full
                font-semibold
                text-lg
                hover:bg-[#1a3528]
                transition-all
                duration-200
                shadow-lg
                hover:shadow-xl
                group
                max-w-xs
              "
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Get Started
              <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Legal Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-gray-500 w-full text-center mx-auto text-xs md:text-left md:w-full max-w-xs"
            style={{ margin: "0.3rem 0 0 0" }}
          >
            By clicking above you agree to our{" "}
            <a href="#" className="underline hover:text-[#1E3F2B] text-xs">Terms & Conditions</a> and{" "}
            <a href="#" className="underline hover:text-[#1E3F2B] text-xs">Privacy Policy</a>.
          </motion.p>
        </div>
      </div>

      {/* Right Column - Testimonials Carousel */}
      <div className="md:flex md:flex-1 px-8 h-fit w-full md:w-full mask-l-from-40% md:mask-l-from-100% mask-r-from-40% md:mask-r-from-100% md:mask-t-from-50% md:mask-b-from-50% mt-0 md:mt-0 overflow-visible">
        {/* Desktop Vertical Carousel */}
        <div className="hidden md:block w-full max-h-screen max-w-xl mx-auto relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F2F0E0] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F2F0E0] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <motion.div
            animate={{
              y: [0, -1450],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="space-y-6"
          >
            {/* Render testimonials twice for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div
                key={`${idx}-${testimonial.name}`}
                className="border-1 border-[#1] rounded-xl p-4 shadow-md bg-white/40"
              >
                {/* Name and Duration */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-medium text-black">{testimonial.name}</span>
                  <span className="text-xs font-semibold bg-[#1E3F2B] text-white px-3 py-1 rounded-full">
                    {testimonial.duration}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {testimonial.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                        tagColors[tag] || "bg-gray-200 text-gray-900 border-gray-300"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Before and After Images */}
                <div className="flex gap-2">
                  <div className="flex-1 relative h-32 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={testimonial.beforeImage}
                      alt={`${testimonial.name} before`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 relative h-32 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={testimonial.afterImage}
                      alt={`${testimonial.name} after`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Horizontal Carousel */}
        <div className="flex lg:hidden mx-auto relative py-4 w-full overflow-x-hidden items-center justify-center mt-12">
          {/* Scrolling Container */}
          <motion.div
            animate={{
              x: [0, -1800],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-3 items-center"
            style={{ width: "max-content", minWidth: "100%", overflow: "visible" }}
          >
            {/* Render testimonials twice for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div
                key={`mobile-${idx}-${testimonial.name}`}
                className="min-w-[200px] max-w-[200px] min-h-fit border-1 border-[#1] rounded-xl p-3 shadow-md bg-white/40 flex-shrink-0 mx-auto "
                style={{ boxSizing: "border-box" }}
              >
                {/* Name and Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-medium text-black">{testimonial.name}</span>
                  <span className="text-xs font-semibold bg-[#1E3F2B] text-white px-2 py-0.5 rounded-full">
                    {testimonial.duration}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {testimonial.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`px-1 py-0.5 rounded-full text-xs font-semibold border ${
                        tagColors[tag] || "bg-gray-200 text-gray-900 border-gray-300"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Before and After Images */}
                <div className="flex gap-1">
                  <div className="flex-1 relative h-20 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={testimonial.beforeImage}
                      alt={`${testimonial.name} before`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 relative h-20 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={testimonial.afterImage}
                      alt={`${testimonial.name} after`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
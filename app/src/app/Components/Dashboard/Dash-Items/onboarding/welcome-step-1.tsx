/* eslint-disable react/no-unescaped-entities */
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
// import { IconArrowRight } from "@tabler/icons-react"

interface WelcomeStep1Props {
  userName: string
  onNext: () => void
}

export default function WelcomeStep1({ onNext }: WelcomeStep1Props) {
  const testimonials = [
    {
      name: "Aarohi",
      duration: "2 MONTHS",
      tags: ["pigmentation", "fine lines"],
      beforeImage: "https://formial.in/cdn/shop/files/1_Acne_before.png?v=1760417252&width=300",
      afterImage: "https://formial.in/cdn/shop/files/1_Acne_after.jpg?v=1760417179&width=300",
    },
    {
      name: "Meera",
      duration: "3 MONTHS",
      tags: ["dullness", "texture"],
      beforeImage: "https://formial.in/cdn/shop/files/2_acne_before.jpg?v=1760442136&width=300",
      afterImage: "https://formial.in/cdn/shop/files/2_acne_after.jpg?v=1760442165&width=300",
    },
    {
      name: "Arjun",
      duration: "2 MONTHS",
      tags: ["pimples"],
      beforeImage: "https://formial.in/cdn/shop/files/Franklin_before.jpg?v=1760441978&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Franklin_after.jpg?v=1760417775&width=300",
    },
    {
      name: "Rahul",
      duration: "3 MONTHS",
      tags: ["acne", "pimples", "texture"],
      beforeImage: "https://formial.in/cdn/shop/files/Sparsh_before_1.jpg?v=1760417955&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Sparsh_after_1.jpg?v=1760417776&width=300",
    },
    {
      name: "Tanvi",
      duration: "2 MONTHS",
      tags: ["scarring"],
      beforeImage: "https://formial.in/cdn/shop/files/Myla_before.jpg?v=1760418164&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Myla_after.jpg?v=1760442197&width=300",
    },
    {
      name: "Vikaram",
      duration: "3 Months",
      tags: ["skin glow"],
      beforeImage: "https://formial.in/cdn/shop/files/Vish_before.jpg?v=1760418713&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Vish_after.jpg?v=1760418750&width=300",
    },
    {
      name: "Ritika",
      duration: " 2 MONTHS",
      tags: ["Skin Glow"],
      beforeImage: "https://formial.in/cdn/shop/files/Glow_before.jpg?v=1760442260&width=300",
      afterImage: "https://formial.in/cdn/shop/files/Glow_after.jpg?v=1760442227&width=300",
    },
    {
      name: "Ravi",
      duration: "2 MONTHS",
      tags: ["anti-aging"],
      beforeImage: "https://formial.in/cdn/shop/files/0f9c4b1732486cb4d030166e57e10aa61a1963e3.jpg?v=1760441871&width=300",
      afterImage: "https://formial.in/cdn/shop/files/06d6109bf1e44c41dd7360e39d4ed29eb0d9707b.jpg?v=1760441899&width=300",
    },
  ];

  const tagColors: { [key: string]: string } = {
    pigmentation: "bg-yellow-200 text-yellow-900 border-yellow-300",
    "fine lines": "bg-green-200 text-green-900 border-green-300",
    dullness: "bg-blue-200 text-blue-900 border-blue-300",
    pimples: "bg-red-200 text-red-900 border-red-300",
    acne: "bg-red-200 text-red-900 border-red-300",
    texture: "bg-yellow-200 text-yellow-900 border-yellow-300",
    "acne scars": "bg-indigo-200 text-indigo-900 border-indigo-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="w-full flex flex-col md:min-h-screen min-h-fit justify-start items-center md:pt-30 pt-16 pb-10 mx-auto overflow-x-hidden"
    >
      {/* Content (Top) */}
      <div className="flex flex-col items-center justify-start w-full px-4 sm:px-6 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 100, damping: 10, ease: "easeInOut" }}
          className="text-3xl md:text-4xl font-medium tracking-tight text-center"
          style={{ color: '#1E3F2B' }}
        >
        
          <p className=" tracking-tight md:text-5xl text-4xl  -mb-4">
            Hello {"Pawan!".split("").map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.5, type: "spring", stiffness: 500, damping: 5, mass: 10, ease: "easeInOut" }}
                className="font-instrument-serif italic"
              >
                {word}
              </motion.span>
            ))}
          </p>
          <br />
          <p>Welcome to Formial Labs</p>
        
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="md:text-lg text-md text-gray-600 mb-8 text-center mx-auto tracking-tight w-full mt-6"
        >
         Get ready to see real results.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button
            onClick={onNext}
            className="w-fit mx-auto flex items-center justify-center gap-3 px-4 py-3 md:py-2 bg-[#1E3F2B] text-white rounded-full font-semibold text-base md:text-lg cursor-pointer hover:bg-[#1a3528] transition-all duration-200 hover:shadow-xl group shadow-inner shadow-white/70"
          >
            GET STARTED
            {/* <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> */}
          </button>
        </motion.div>

        {/* Legal Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-gray-500 text-wrap text-center mx-auto text-xs mt-8"
        >
          By clicking above you agree to our{" "}
          <a href="#" className="underline hover:text-[#1E3F2B] text-xs">Terms & Conditions</a> and{" "}
          <a href="#" className="underline hover:text-[#1E3F2B] text-xs">Privacy Policy</a>.
        </motion.p>
      </div>

      {/* Carousel (below content) */}
      <div className="w-full flex max-w-5xl mx-auto flex-col items-center justify-center md:mt-24 mt-12 relative overflow-hidden mask-x-from-95%">
        {/* Horizontally scrolling carousel */}
        <div className="w-full overflow-hidden py-2">
          <motion.div
            className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-center"
            style={{
              willChange: "transform",
            }}
            animate={{
              x: [0, "-50%"],
            }}
            transition={{
              duration: testimonials.length * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div
                key={`carousel-horizontal-${idx}-${testimonial.name}`}
                className="w-[180px] sm:w-[180px] md:w-[200px] lg:w-[240px] flex-shrink-0 min-h-fit border rounded-xl p-2 sm:p-3 md:p-4 shadow-md bg-white/40 flex flex-col items-center justify-center"
              >
                {/* Name and Duration */}
                <div className="flex items-center justify-between mb-1.5 sm:mb-2 w-full gap-1">
                  <span className="text-sm sm:text-base md:text-lg font-medium text-black truncate flex-1">{testimonial.name}</span>
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold bg-[#1E3F2B] text-white px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                    {testimonial.duration}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2 sm:mb-3 w-full">
                  {testimonial.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`px-1 sm:px-1.5 md:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-semibold border ${
                        tagColors[tag] || "bg-gray-200 text-gray-900 border-gray-300"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Before and After Images */}
                <div className="flex gap-1.5 sm:gap-2 w-full">
                  <div className="flex-1 relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={testimonial.beforeImage}
                      alt={`${testimonial.name} before`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden border border-gray-200">
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
      </div>
    </motion.div>
  );
}
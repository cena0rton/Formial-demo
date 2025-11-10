"use client"

import React from "react"
import { motion } from "framer-motion"
import { IconCamera, IconUserCheck, IconFlask } from "@tabler/icons-react"

interface WelcomeStep2Props {
  onNext: () => void
}

const stepIcons = [
  <IconCamera size={32} strokeWidth={2} className="text-[#1E3F2B]" key="icon1" />,
  <IconUserCheck size={32} strokeWidth={2} className="text-[#1E3F2B]" key="icon2" />,
  <IconFlask size={32} strokeWidth={2} className="text-[#1E3F2B]" key="icon3" />,
]

const steps = [
  { id: 1, label: "Upload Photos", description: "Upload your photos to get started" },
  { id: 2, label: "Consultation", description: "Doctor reviews your photos" },
  { id: 3, label: "Formulation", description: "Get your personalized skincare plan" },
]

export default function WelcomeStep2({ onNext }: WelcomeStep2Props) {
  const text = "We will guide you through the simple steps below to unlock your best skin!"

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="md:mt-0 mt-0 px-4 md:px-8 m-auto max-w-4xl bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col items-center justify-center my-auto h-full"
      >
        <h2 className="md:text-3xl text-2xl font-medium tracking-tight text-[#1E3F2B] mb-8 md:mb-12 text-center pt-6 md:pt-10">
          {text.split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03, duration: 0.18 }}
            >
              {char}
            </motion.span>
          ))}
        </h2>

        {/* Zigzag Flow Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          className="relative w-full max-w-3xl mb-8 md:mb-12"
        >
          {/* Step 1 - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 120 }}
            className="relative md:w-[45%] w-fit mb-16 md:mb-16"
          >
            <div className="bg-[#F2F0E0] rounded-[13px] p-6 flex flex-col items-start gap-4 ">
              <div className="flex items-center gap-3">
                <div className="rounded-full border-2 border-[#1E3F2B] bg-transparent p-3 flex items-center justify-center w-12 h-12">
                  {stepIcons[0]}
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">1.{steps[0].label}</span>
              </div>
              {/* <h3 className="text-lg md:text-xl font-bold text-[#1E3F2B]">{steps[0].label}</h3> */}
              <p className="text-sm md:text-base text-gray-600">{steps[0].description}</p>
            </div>
            {/* Arrow 1 - From Step 1 to Step 2 (down-right) - Squiggly */}
            <motion.svg
               initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
               animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
              className="absolute right-[20%] translate-x-1/2 md:top-[100%] mt-2 w-[15%] md:w-[15%] h-auto z-10 stroke-1 "
              viewBox="0 0 47 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(45deg) scale(1.0)' }}
            >
              <motion.path
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{delay: 1.8, duration: 8, ease: "easeOut"}}
                d="M7.52107 23.9852C1.73464 19.8689 -0.973881 11.6785 2.61752 5.23628C2.79176 4.84618 3.1626 4.2594 3.63327 3.64276C4.1145 3.01231 4.71231 2.33427 5.33536 1.78214C5.95122 1.23637 6.62184 0.786808 7.24807 0.658013C7.56754 0.592388 7.88798 0.608106 8.18211 0.749482C8.47645 0.890982 8.717 1.14511 8.90019 1.50634L8.91248 1.53047L8.91893 1.55572C9.01851 1.93357 8.87811 2.24241 8.68942 2.47637C8.51019 2.69848 8.25788 2.88776 8.09079 3.02665L8.08981 3.02668C7.75731 3.31454 7.444 3.63082 7.13766 3.95642L7.13668 3.95644C5.77665 5.4766 4.84215 7.36362 4.40579 9.35868L4.40677 9.35866C3.09737 15.4502 7.17735 21.9586 13.0778 23.7976L13.0768 23.7986C15.4139 24.5092 17.9539 24.7357 20.233 23.8803C19.5077 21.7093 19.3471 18.9467 20.8794 17.0196L21.0381 16.8293L21.0391 16.8293C21.747 16.0291 22.748 15.7091 23.7354 15.7542C24.7204 15.7994 25.7111 16.2072 26.4247 16.887L26.4327 16.8946L26.4318 16.8956C27.7235 18.2349 27.6978 19.9607 27.067 21.5041C26.4702 22.9643 25.3186 24.3064 24.1369 25.1126C25.528 27.8518 27.6062 30.1819 29.9616 32.1649C32.255 33.9113 34.9327 35.1278 37.6593 36.1051L38.1708 36.2543C39.3695 36.5881 40.5998 36.8122 41.8378 36.9208L41.8466 36.9215C42.0148 36.9425 42.1932 36.9473 42.3835 36.948C42.569 36.9487 42.7724 36.9456 42.9697 36.9548C43.3678 36.9735 43.7958 37.0418 44.1739 37.3184L44.1729 37.3194C44.5192 37.5516 44.7264 37.9176 44.7516 38.2973C44.7774 38.6861 44.6114 39.0798 44.2328 39.3351L44.1722 39.3756L44.1702 39.3757C43.9052 39.5555 43.6042 39.6212 43.3198 39.6417C43.0164 39.6636 42.6927 39.6361 42.4403 39.6271L42.4373 39.6272C40.1585 39.5197 37.8798 39.072 35.739 38.2805L35.7341 38.2787C32.5419 37.0235 29.3257 35.514 26.754 33.1386L26.753 33.1386C24.654 31.1878 22.7358 28.9948 21.3962 26.4192C16.7444 27.9799 11.4391 26.7605 7.52109 23.9861L7.52107 23.9852ZM23.0325 19.6985C22.8721 20.5005 22.8684 21.3366 23.0116 22.1449C23.7577 21.3068 24.3245 20.2669 24.2681 19.1948L24.2582 19.0622C24.2348 18.758 24.0591 18.514 23.8062 18.4476C23.7514 18.434 23.6963 18.4436 23.6228 18.5008C23.5416 18.5639 23.4566 18.6735 23.3734 18.8221C23.2118 19.111 23.097 19.4743 23.0325 19.6985Z"
                fill="#1E3F2B"
                stroke="#1E3F2B"
                strokeWidth="0.5"
              />
              <motion.path
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{delay: 1.8, duration: 0.8, ease: "easeOut"}}
                d="M38.2781 33.4385C38.1682 33.0659 38.2108 32.7314 38.3754 32.4603C38.5364 32.1954 38.798 32.0174 39.0816 31.9163C39.6379 31.7183 40.3695 31.7852 40.8481 32.1847L40.8571 32.1923L40.8651 32.1999C41.1618 32.499 41.4397 32.8211 41.7114 33.1355C41.9852 33.4522 42.2538 33.7621 42.5397 34.049L42.5476 34.0566C42.9823 34.5331 43.4133 35.0087 43.8526 35.4747L44.2952 35.9372C44.6779 36.3321 45.301 36.9067 45.6528 37.5172C45.8316 37.8275 45.9582 38.1734 45.9355 38.5343C45.9229 38.735 45.8626 38.9283 45.7556 39.1138L45.8386 39.1119L45.5255 39.423C45.5008 39.4492 45.4742 39.4743 45.4472 39.5001L45.3928 39.5541C44.1385 40.7992 42.9106 42.1086 41.4339 43.1554L41.4329 43.1555C41.0178 43.4774 40.4391 43.5426 39.9578 43.4C39.4657 43.2541 39.0214 42.872 38.9738 42.2606L38.9733 42.2401C38.9754 41.8853 39.1408 41.6022 39.3292 41.377C39.5094 41.1617 39.7503 40.9574 39.9078 40.8038L39.9154 40.7967L40.273 40.466C41.04 39.74 41.7489 38.965 42.5018 38.1955C41.6675 37.3218 40.8231 36.446 40.0085 35.5431L40.0034 35.5374C39.7293 35.2123 39.4267 34.9223 39.1128 34.5843C38.8081 34.2564 38.5093 33.8992 38.2957 33.482L38.2855 33.4608L38.2781 33.4385Z"
                fill="#1E3F2B"
                stroke="#1E3F2B"
                strokeWidth="0.5"
              />
            </motion.svg>
          </motion.div>

          {/* Step 2 - Middle Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5, type: "spring", stiffness: 120 }}
            className="relative w-fit md:w-[45%] ml-auto mb-16 md:mb-16"
          >
            <div className="bg-[#F2F0E0]  rounded-[13px] p-6 flex flex-col items-start gap-4 ">
              <div className="flex items-center gap-3">
                <div className="rounded-full border-2 border-[#1E3F2B] bg-transparent p-3 flex items-center justify-center w-12 h-12">
                  {stepIcons[1]}
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">2.{steps[1].label}</span>
              </div>
              <p className="text-sm md:text-base text-gray-600">{steps[1].description}</p>
            </div>
            {/* Arrow 2 - From Step 2 to Step 3 (down-left) - Squiggly */}
            <motion.svg
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 180 }}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
              className="absolute right-[85%] mt-2 -translate-x-1/2 md:right-[20%] md:top-[100%] w-[18%] md:w-[16%] h-auto z-10"
              viewBox="0 0 47 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(-45deg) scaleY(-1) scale(1.3)' }}
            >
              <motion.path
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{delay: 1.8, duration: 0.8, ease: "easeOut"}}
                d="M7.52107 23.9852C1.73464 19.8689 -0.973881 11.6785 2.61752 5.23628C2.79176 4.84618 3.1626 4.2594 3.63327 3.64276C4.1145 3.01231 4.71231 2.33427 5.33536 1.78214C5.95122 1.23637 6.62184 0.786808 7.24807 0.658013C7.56754 0.592388 7.88798 0.608106 8.18211 0.749482C8.47645 0.890982 8.717 1.14511 8.90019 1.50634L8.91248 1.53047L8.91893 1.55572C9.01851 1.93357 8.87811 2.24241 8.68942 2.47637C8.51019 2.69848 8.25788 2.88776 8.09079 3.02665L8.08981 3.02668C7.75731 3.31454 7.444 3.63082 7.13766 3.95642L7.13668 3.95644C5.77665 5.4766 4.84215 7.36362 4.40579 9.35868L4.40677 9.35866C3.09737 15.4502 7.17735 21.9586 13.0778 23.7976L13.0768 23.7986C15.4139 24.5092 17.9539 24.7357 20.233 23.8803C19.5077 21.7093 19.3471 18.9467 20.8794 17.0196L21.0381 16.8293L21.0391 16.8293C21.747 16.0291 22.748 15.7091 23.7354 15.7542C24.7204 15.7994 25.7111 16.2072 26.4247 16.887L26.4327 16.8946L26.4318 16.8956C27.7235 18.2349 27.6978 19.9607 27.067 21.5041C26.4702 22.9643 25.3186 24.3064 24.1369 25.1126C25.528 27.8518 27.6062 30.1819 29.9616 32.1649C32.255 33.9113 34.9327 35.1278 37.6593 36.1051L38.1708 36.2543C39.3695 36.5881 40.5998 36.8122 41.8378 36.9208L41.8466 36.9215C42.0148 36.9425 42.1932 36.9473 42.3835 36.948C42.569 36.9487 42.7724 36.9456 42.9697 36.9548C43.3678 36.9735 43.7958 37.0418 44.1739 37.3184L44.1729 37.3194C44.5192 37.5516 44.7264 37.9176 44.7516 38.2973C44.7774 38.6861 44.6114 39.0798 44.2328 39.3351L44.1722 39.3756L44.1702 39.3757C43.9052 39.5555 43.6042 39.6212 43.3198 39.6417C43.0164 39.6636 42.6927 39.6361 42.4403 39.6271L42.4373 39.6272C40.1585 39.5197 37.8798 39.072 35.739 38.2805L35.7341 38.2787C32.5419 37.0235 29.3257 35.514 26.754 33.1386L26.753 33.1386C24.654 31.1878 22.7358 28.9948 21.3962 26.4192C16.7444 27.9799 11.4391 26.7605 7.52109 23.9861L7.52107 23.9852ZM23.0325 19.6985C22.8721 20.5005 22.8684 21.3366 23.0116 22.1449C23.7577 21.3068 24.3245 20.2669 24.2681 19.1948L24.2582 19.0622C24.2348 18.758 24.0591 18.514 23.8062 18.4476C23.7514 18.434 23.6963 18.4436 23.6228 18.5008C23.5416 18.5639 23.4566 18.6735 23.3734 18.8221C23.2118 19.111 23.097 19.4743 23.0325 19.6985Z"
                fill="#1E3F2B"
                stroke="#1E3F2B"
                strokeWidth="0.5"
              />
              <motion.path
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
                d="M38.2781 33.4385C38.1682 33.0659 38.2108 32.7314 38.3754 32.4603C38.5364 32.1954 38.798 32.0174 39.0816 31.9163C39.6379 31.7183 40.3695 31.7852 40.8481 32.1847L40.8571 32.1923L40.8651 32.1999C41.1618 32.499 41.4397 32.8211 41.7114 33.1355C41.9852 33.4522 42.2538 33.7621 42.5397 34.049L42.5476 34.0566C42.9823 34.5331 43.4133 35.0087 43.8526 35.4747L44.2952 35.9372C44.6779 36.3321 45.301 36.9067 45.6528 37.5172C45.8316 37.8275 45.9582 38.1734 45.9355 38.5343C45.9229 38.735 45.8626 38.9283 45.7556 39.1138L45.8386 39.1119L45.5255 39.423C45.5008 39.4492 45.4742 39.4743 45.4472 39.5001L45.3928 39.5541C44.1385 40.7992 42.9106 42.1086 41.4339 43.1554L41.4329 43.1555C41.0178 43.4774 40.4391 43.5426 39.9578 43.4C39.4657 43.2541 39.0214 42.872 38.9738 42.2606L38.9733 42.2401C38.9754 41.8853 39.1408 41.6022 39.3292 41.377C39.5094 41.1617 39.7503 40.9574 39.9078 40.8038L39.9154 40.7967L40.273 40.466C41.04 39.74 41.7489 38.965 42.5018 38.1955C41.6675 37.3218 40.8231 36.446 40.0085 35.5431L40.0034 35.5374C39.7293 35.2123 39.4267 34.9223 39.1128 34.5843C38.8081 34.2564 38.5093 33.8992 38.2957 33.482L38.2855 33.4608L38.2781 33.4385Z"
                fill="#1E3F2B"
                stroke="#1E3F2B"
                strokeWidth="0.5"
              />
            </motion.svg>
          </motion.div>

          {/* Step 3 - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.5, type: "spring", stiffness: 120 }}
            className="relative w-fit md:w-[45%]"
          >
            <div className="bg-[#F2F0E0] rounded-[13px] p-6 flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full border-2 border-[#1E3F2B] bg-transparent p-3 flex items-center justify-center w-12 h-12">
                  {stepIcons[2]}
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">3.{steps[2].label}</span>
              </div>
              <p className="text-sm md:text-base text-gray-600">{steps[2].description}</p>
            </div>
          </motion.div>

          {/* Mobile arrows - simplified vertical flow */}
         
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.4 }}
        className="flex justify-center mt-4 md:mt-8 pb-8 md:pb-12"
      >
        <button
          onClick={onNext}
          className="px-12 py-4 w-full md:w-fit rounded-full font-medium text-white transition-all duration-200 bg-[#1E3F2B] hover:bg-[#163021] shadow-md hover:shadow-lg text-lg tracking-tight cursor-pointer"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  )
}

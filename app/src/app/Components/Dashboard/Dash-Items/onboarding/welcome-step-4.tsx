"use client"

import React from "react"
import { motion } from "framer-motion"

interface WelcomeStep4Props {
  onNext: () => void
  onBack: () => void
}

const Camera = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color="currentColor"
        fill="none"
      >
        <path
          d="M8.31253 4.7812L7.6885 4.36517V4.36517L8.31253 4.7812ZM7.5 6V6.75C7.75076 6.75 7.98494 6.62467 8.12404 6.41603L7.5 6ZM2.17224 8.83886L1.45453 8.62115L2.17224 8.83886ZM4.83886 6.17224L4.62115 5.45453H4.62115L4.83886 6.17224ZM3.46243 20.092L3.93822 19.5123L3.93822 19.5123L3.46243 20.092ZM2.90796 19.5376L3.48772 19.0618L3.48772 19.0618L2.90796 19.5376ZM21.092 19.5376L20.5123 19.0618L20.5123 19.0618L21.092 19.5376ZM20.5376 20.092L20.0618 19.5123L20.0618 19.5123L20.5376 20.092ZM14.0195 3.89791C14.3847 4.09336 14.8392 3.95575 15.0346 3.59054C15.2301 3.22534 15.0924 2.77084 14.7272 2.57539L14.0195 3.89791ZM22.5455 8.62115C22.4252 8.22477 22.0064 8.00092 21.61 8.12116C21.2137 8.2414 20.9898 8.6602 21.1101 9.05658L22.5455 8.62115ZM21.25 11.5V13.5H22.75V11.5H21.25ZM14.5 20.25H9.5V21.75H14.5V20.25ZM2.75 13.5V11.5H1.25V13.5H2.75ZM12.3593 2.25H11.6407V3.75H12.3593V2.25ZM7.6885 4.36517L6.87596 5.58397L8.12404 6.41603L8.93657 5.19722L7.6885 4.36517ZM11.6407 2.25C11.1305 2.25 10.6969 2.24925 10.3369 2.28282C9.96142 2.31783 9.61234 2.39366 9.27276 2.57539L9.98055 3.89791C10.0831 3.84299 10.2171 3.80049 10.4762 3.77634C10.7506 3.75075 11.1031 3.75 11.6407 3.75V2.25ZM8.93657 5.19722C9.23482 4.74985 9.43093 4.45704 9.60448 4.24286C9.76825 4.04074 9.87794 3.95282 9.98055 3.89791L9.27276 2.57539C8.93318 2.75713 8.67645 3.00553 8.43904 3.29853C8.2114 3.57947 7.97154 3.94062 7.6885 4.36517L8.93657 5.19722ZM2.75 11.5C2.75 10.0499 2.75814 9.49107 2.88994 9.05657L1.45453 8.62115C1.24186 9.32224 1.25 10.159 1.25 11.5H2.75ZM7.5 5.25C6.159 5.25 5.32224 5.24186 4.62115 5.45453L5.05657 6.88994C5.49107 6.75814 6.04987 6.75 7.5 6.75V5.25ZM2.88994 9.05657C3.20503 8.01787 4.01787 7.20503 5.05657 6.88994L4.62115 5.45453C3.10304 5.91505 1.91505 7.10304 1.45453 8.62115L2.88994 9.05657ZM9.5 20.25C7.83789 20.25 6.65724 20.2488 5.75133 20.1417C4.86197 20.0366 4.33563 19.8384 3.93822 19.5123L2.98663 20.6718C3.69558 21.2536 4.54428 21.5095 5.57525 21.6313C6.58966 21.7512 7.87463 21.75 9.5 21.75V20.25ZM1.25 13.5C1.25 15.1254 1.24877 16.4103 1.36868 17.4248C1.49054 18.4557 1.74638 19.3044 2.3282 20.0134L3.48772 19.0618C3.16158 18.6644 2.96343 18.138 2.85831 17.2487C2.75123 16.3428 2.75 15.1621 2.75 13.5H1.25ZM3.93822 19.5123C3.77366 19.3772 3.62277 19.2263 3.48772 19.0618L2.3282 20.0134C2.52558 20.2539 2.74612 20.4744 2.98663 20.6718L3.93822 19.5123ZM21.25 13.5C21.25 15.1621 21.2488 16.3428 21.1417 17.2487C21.0366 18.138 20.8384 18.6644 20.5123 19.0618L21.6718 20.0134C22.2536 19.3044 22.5095 18.4557 22.6313 17.4248C22.7512 16.4103 22.75 15.1254 22.75 13.5H21.25ZM14.5 21.75C16.1254 21.75 17.4103 21.7512 18.4248 21.6313C19.4557 21.5095 20.3044 21.2536 21.0134 20.6718L20.0618 19.5123C19.6644 19.8384 19.138 20.0366 18.2487 20.1417C17.3428 20.2488 16.1621 20.25 14.5 20.25V21.75ZM20.5123 19.0618C20.3772 19.2263 20.2263 19.3772 20.0618 19.5123L21.0134 20.6718C21.2539 20.4744 21.4744 20.2539 21.6718 20.0134L20.5123 19.0618ZM12.3593 3.75C12.8969 3.75 13.2494 3.75075 13.5238 3.77634C13.7829 3.80049 13.9169 3.84299 14.0195 3.89791L14.7272 2.57539C14.3877 2.39366 14.0386 2.31783 13.6631 2.28282C13.3031 2.24925 12.8695 2.25 12.3593 2.25V3.75ZM22.75 11.5C22.75 10.159 22.7581 9.32224 22.5455 8.62115L21.1101 9.05658C21.2419 9.49107 21.25 10.0499 21.25 11.5H22.75Z"
          fill="#141B34"
        />
        <path
          d="M16 13C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13C8 10.7909 9.79086 9 12 9C14.2091 9 16 10.7909 16 13Z"
          stroke="#141B34"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.9737 3.02148C17.9795 2.99284 18.0205 2.99284 18.0263 3.02148C18.3302 4.50808 19.4919 5.66984 20.9785 5.97368C21.0072 5.97954 21.0072 6.02046 20.9785 6.02632C19.4919 6.33016 18.3302 7.49192 18.0263 8.97852C18.0205 9.00716 17.9795 9.00716 17.9737 8.97852C17.6698 7.49192 16.5081 6.33016 15.0215 6.02632C14.9928 6.02046 14.9928 5.97954 15.0215 5.97368C16.5081 5.66984 17.6698 4.50808 17.9737 3.02148Z"
          stroke="#141B34"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const Doctor = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        color="currentColor"
        fill="none"
      >
        <path
          d="M20 22V19C20 16.1716 20 14.7574 19.1213 13.8787C18.2426 13 16.8284 13 14 13L12 15L10 13C7.17157 13 5.75736 13 4.87868 13.8787C4 14.7574 4 16.1716 4 19V22"
          stroke="#141B34"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 13V18.5"
          stroke="#141B34"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 13V17M8.5 17C9.60457 17 10.5 17.8954 10.5 19V20M8.5 17C7.39543 17 6.5 17.8954 6.5 19V20"
          stroke="#141B34"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 6.5V5.5C15.5 3.567 13.933 2 12 2C10.067 2 8.5 3.567 8.5 5.5V6.5C8.5 8.433 10.067 10 12 10C13.933 10 15.5 8.433 15.5 6.5Z"
          stroke="#141B34"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.75 19.25C16.75 19.6642 16.4142 20 16 20C15.5858 20 15.25 19.6642 15.25 19.25C15.25 18.8358 15.5858 18.5 16 18.5C16.4142 18.5 16.75 18.8358 16.75 19.25Z"
          stroke="#141B34"
          strokeWidth={1.5}
        />
      </svg>
    </div>
  );
};

const AiChemistry02Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"currentColor"} fill={"none"} {...props}>
      <path d="M14.9999 22H6.40749C5.0778 22 3.99988 20.9221 3.99988 19.5924C3.99988 19.2033 4.09419 18.8199 4.27475 18.4752L9.49988 8.5V2H14.4999V8.5L16.4999 12.3181" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.99994 2H15.9999" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.99994 11.5H15.9999" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.4999 15L18.242 15.697C17.9038 16.611 17.7347 17.068 17.4013 17.4014C17.068 17.7348 16.611 17.9039 15.697 18.2421L14.9999 18.5L15.697 18.7579C16.611 19.0961 17.068 19.2652 17.4013 19.5986C17.7347 19.932 17.9038 20.389 18.242 21.303L18.4999 22L18.7579 21.303C19.0961 20.389 19.2652 19.932 19.5985 19.5986C19.9319 19.2652 20.3889 19.0961 21.3029 18.7579L21.9999 18.5L21.3029 18.2421C20.3889 17.9039 19.9319 17.7348 19.5985 17.4014C19.2652 17.068 19.0961 16.611 18.7579 15.697L18.4999 15Z" stroke="#141B34" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );


const stepIcons = [
  <Camera className="text-[#1E3F2B]" key="icon1" />,
  <Doctor className="text-[#1E3F2B]" key="icon2" />,
  <AiChemistry02Icon className="text-[#1E3F2B]" key="icon3" />,
]

const steps = [
  { id: 1, label: "Upload Photos", description: "Upload your photos to get started" },
  { id: 2, label: "Consultation", description: "Doctor reviews your photos" },
  { id: 3, label: "Formulation", description: "Get your personalized skincare plan" },
]

export default function WelcomeStep4({ onNext, onBack }: WelcomeStep4Props) {
  const text = "We will guide you through the simple steps below to unlock your best skin!"

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="md:mt-0 mt-0 px-4 md:px-8 m-auto max-w-6xl bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col items-center justify-center my-auto h-full"
      >
        <h2 className="md:text-2xl text-xl text-left font-medium tracking-tight md:w-xl w-full text-[#1E3F2B] mb-2 pt-6 md:pt-10">
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
          className="relative w-full max-w-3xl mb-0 rounded-xl border-[#1E3F2B]/10"
        >
            <div className="w-full md:w-xl mx-auto">
          {/* Step 1 - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 120 }}
            className="relative md:w-[45%] w-fit mb-8 md:mb-16"
          >
            <div className="bg-[#F2F0E0] rounded-[13px] p-6 flex flex-col items-start gap-2 ">
              <div className="flex items-center gap-3">
                <div className="rounded-full border-0 border-[#1E3F2B] bg-transparent p-3 flex items-center justify-center w-12 h-12">
                  {stepIcons[0]}
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">1.{steps[0].label}</span>
              </div>
              <p className="text-sm md:text-base text-gray-600">{steps[0].description}</p>
            </div>
            {/* Arrow 1 - From Step 1 to Step 2 (down-right) - Squiggly */}
            
          </motion.div>

          {/* Step 2 - Middle Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5, type: "spring", stiffness: 120 }}
            className="relative w-fit md:w-[45%] ml-auto mb-8 md:mb-16"
          >
            <div className="bg-[#F2F0E0]  rounded-[13px] p-6 flex flex-col items-start gap-2 ">
              <div className="flex items-center gap-3">
                <div className="rounded-full border-0 border-[#1E3F2B] bg-transparent p-3 flex items-center justify-center w-12 h-12">
                  {stepIcons[1]}
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">2.{steps[1].label}</span>
              </div>
              <p className="text-sm md:text-base text-gray-600">{steps[1].description}</p>
            </div>
            {/* Arrow 2 - From Step 2 to Step 3 (down-left) - Squiggly */}

            <motion.svg
               initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
               animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
              className="absolute -left-[10%] translate-x-1/2 -top-[30%] md:-top-[50%] mt-2 w-[15%] h-auto z-10 stroke-1 "
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



            <motion.svg
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 180 }}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
              className="absolute -left-[10%] mt-2 translate-x-1/2 md:right-[80%] md:top-[100%] w-[18%] md:w-[16%] h-auto z-10"
              viewBox="0 0 47 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              
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
            className="relative w-fit md:w-[45%] mr-auto"
          >
            <div className="bg-[#F2F0E0] rounded-[13px] p-6 flex flex-col items-start gap-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full border-0 border-[#1E3F2B] bg-transparent p-3 flex items-center justify-center w-12 h-12">
                  {stepIcons[2]}
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">3.{steps[2].label}</span>
              </div>
              <p className="text-sm md:text-base text-gray-600">{steps[2].description}</p>
            </div>
          </motion.div>

          </div>
          {/* Mobile arrows - simplified vertical flow */}
         
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.4 }}
        className="flex justify-between mt-4 pb-8 md:pb-12"
      >
        <button
          type="button"
          onClick={onBack}
          className="w-fit md:w-auto rounded-full border border-[#1E3F2B]/30 text-[#1E3F2B] px-6 py-3 font-medium hover:bg-[#1E3F2B]/10 transition-all mr-4"
        >
          Go back
        </button>
        <button
          onClick={onNext}
          className="w-fit md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3F2B] px-9 py-3 font-semibold text-white cursor-pointer hover:bg-[#163021] transition-all disabled:bg-[#1E3F2B]/30 disabled:shadow-none disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  )
}


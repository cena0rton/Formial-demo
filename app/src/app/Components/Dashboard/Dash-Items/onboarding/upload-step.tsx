"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  IconUpload,
  IconX,
  IconArrowLeft,
  IconChevronDown,
} from "@tabler/icons-react";

interface UploadStepProps {
  uploadedPhotos: File[];
  setUploadedPhotos: (photos: File[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const UPLOADS = [
  {
    label: "Upload Front View",
    refImg: "/FormialFront1.png",
    refAlt: "Front Reference",
    uploadAlt: "User uploaded front view",
  },
  {
    label: "Upload Left View",
    refImg: "/FormialLeft1.png",
    refAlt: "Left Reference",
    uploadAlt: "User uploaded left view",
  },
  {
    label: "Upload Right View",
    refImg: "/FormialRight1.png",
    refAlt: "Right Reference",
    uploadAlt: "User uploaded right view",
  },
];

const uploadStepVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),
  animate: {
    x: "0%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.48, ease: [0.44, 0.12, 0, 1] as [number, number, number, number] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.45, ease: [0.44, 0.12, 0.12, 1] as [number, number, number, number] },
  }),
};

export default function UploadStep({
  uploadedPhotos,
  setUploadedPhotos,
  onNext,
  onBack,
}: UploadStepProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(0);
  const [direction, setDirection] = React.useState(0);

  React.useEffect(() => {
    if (uploadedPhotos.length < 3) {
      setUploadedPhotos([
        uploadedPhotos[0] ?? null,
        uploadedPhotos[1] ?? null,
        uploadedPhotos[2] ?? null,
      ] as File[]);
    }
    // eslint-disable-next-line
  }, []);

  const handleDeletePhoto = (index: number) => {
    const newPhotos = [...uploadedPhotos];
    newPhotos[index] = undefined as unknown as File;
    setUploadedPhotos(newPhotos.filter((photo): photo is File => photo !== undefined));
  };

  const handlePhotoChange = (idx: number, file?: File) => {
    if (!file) return;
    const newPhotos = [...uploadedPhotos];
    newPhotos[idx] = file;
    setUploadedPhotos(newPhotos);
  };

  const handleNextLocal = () => {
    if (step < UPLOADS.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      onNext();
    }
  };

  const handleBackLocal = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  function stepLabel(n: number) {
    return (
      "Step " +
      (n + 1).toString() +
      " of " +
      UPLOADS.length.toString() +
      ": " +
      UPLOADS[n]?.label
    );
  }

  return (
    <div className="h-full pb-20 max-w-7xl -mt-16 md:-mt-10 flex flex-col items-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="text-left w-full max-w-7xl"
      >
        {/* Title */}
        <h2 className="md:text-3xl text-2xl font-medium tracking-tight text-[#1E3F2B] mb-4">
          {"Upload Your Photos".split("").map((char, idx) => (
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

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.43 }}
          className="md:text-lg text-sm text-gray-600 font-normal max-w-2xl mb-4 tracking-tight"
        >
          You are few steps away from getting your personalized skincare plan!
        </motion.p>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.32, duration: 0.13 }}
            exit={{ opacity: 0 }}
            className="w-full border border-green-900/10 rounded-lg py-2 px-2"
          >
            <motion.button
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex text-sm items-center justify-between gap-2 w-full"
              onClick={() => setOpen((o) => !o)}
              type="button"
              aria-expanded={open}
            >
              <p>Guidelines for Uploading Photos</p>
              <IconChevronDown size={20} className="text-gray-600" />
            </motion.button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  key="guidelines"
                  initial={{ opacity: 0, height: "0" }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    marginTop: open ? "10px" : "0px",
                  }}
                  transition={{ delay: 0.2, duration: 0.36 }}
                  exit={{
                    opacity: 0,
                    height: "0",
                    marginTop: "0px",
                  }}
                  className="list-disc list-inside text-[#1E3F2B] space-y-2 text-xs font-medium tracking-tight"
                >
                <li>No filters. No Makeup.</li>
                <li>Use natural light</li>
                <li>Face fully visible</li>
                <li>Avoid glasses or hair obstruction</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Photo Upload Carousel/Stepper */}
        <div className="relative w-full flex flex-col items-center mt-10 min-h-[390px] mb-7 max-w-7xl mx-auto">
          {/* Progress dots */}
          <div className="flex gap-2 mb-7">
            {UPLOADS.map((_, idx) => (
              <motion.div
                key={idx}
                className={`w-5 h-2.5 rounded-full transition-all ${
                  idx === step
                    ? "bg-[#1E3F2B] shadow-md"
                    : "bg-gray-300"
                }`}
                animate={{
                  scale: idx === step ? 1.14 : 1,
                  opacity: idx <= step + 1 ? 1 : 0.6,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                aria-label={
                  idx === step
                    ? `${stepLabel(idx)} — current`
                    : stepLabel(idx)
                }
              />
            ))}
          </div>
          <div className="w-full h-[364px] relative flex items-center justify-center rounded-2xl max-w-4xl mx-auto">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={step}
                variants={uploadStepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center"
                style={{ willChange: "transform,opacity" }}
              >
                <motion.div
                  className="rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center gap-6 justify-between py-8 px-4 transition-all relative w-[97vw] max-w-xl mx-auto"
                  
                  transition={{ duration: 0.38, ease: [0.45, 0, 0.25, 1] }}
                  aria-label={stepLabel(step)}
                >
                  <div className="font-Medium text-base mb-2 text-[#1E3F2B] tracking-tight">
                    {UPLOADS[step].label}
                  </div>
                  <div className="flex flex-row items-center justify-center w-full gap-7">
                    {/* Reference image (left) */}
                    <div className="w-40 h-40 relative rounded-lg overflow-hidden border-1 border-gray-300 flex items-center justify-center shadow-sm bg-[#F9F0E1]">
                      <Image
                        src={UPLOADS[step].refImg}
                        alt={UPLOADS[step].refAlt}
                        height={200}
                        width={200}
                        className="object-fit opacity-50 aspect-square"
                        priority
                      />
                    </div>
                    {/* Uploaded image (right) */}
                    <div className="w-40 h-40 relative rounded-lg overflow-hidden border-1 border-gray-300 flex items-center justify-center shadow-[0_4px_24px_0_rgba(7,16,11,0.12)] bg-[#FEF8E6]/50">
                      {uploadedPhotos[step] ? (
                        <>
                          <Image
                            src={URL.createObjectURL(uploadedPhotos[step])}
                            alt={UPLOADS[step].uploadAlt}
                            fill
                            className="object-cover"
                          />
                          <button
                            className="absolute top-2 right-2 w-7 h-7 bg-red-200 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition"
                            onClick={() => handleDeletePhoto(step)}
                            type="button"
                            aria-label="Remove uploaded photo"
                          >
                            <IconX
                              size={16}
                              className="text-white"
                              strokeWidth={3}
                            />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full rounded-lg bg-transparent flex items-center justify-center text-xs text-gray-500 border-1 border-dashed border-[#1E3F2B]/30">
                          Click on upload photo
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Upload Button */}
                  <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] transition-colors cursor-pointer mt-5 shadow-lg active:scale-[.98] text-sm">
                    <IconUpload size={18} />
                    {uploadedPhotos[step] ? "Replace Photo" : "Upload Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handlePhotoChange(step, e.target.files[0]);
                        }
                      }}
                      disabled={!!uploadedPhotos[step]}
                    />
                  </label>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.36 }}
          className="flex gap-3 justify-between items-center mt-1 w-full max-w-7xl"
        >
          <button
            onClick={handleBackLocal}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={step === 0 ? "Back" : "Previous Photo"}
          >
            <IconArrowLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={handleNextLocal}
            disabled={!uploadedPhotos[step]}
            className={`px-10 py-3 rounded-full bg-[#1E3F2B] text-white font-medium hover:bg-[#1a3528] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all tracking-tight ml-auto`}
            aria-label={
              step < UPLOADS.length - 1
                ? "Next Photo"
                : "Done and continue"
            }
          >
            {step < UPLOADS.length - 1 ? "Next" : "Continue"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

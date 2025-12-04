"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  IconUpload,
  IconX,
  IconUser,
  IconCamera,
  IconRocket,
} from "@tabler/icons-react";

interface UploadStepProps {
  uploadedPhotos: File[];
  setUploadedPhotos: (photos: File[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  isUploading?: boolean;
  uploadError?: string | null;
  hideTimeline?: boolean; // Hide timeline section when used in ProgressTimeline
}

const UPLOADS = [
  {
    label: "Upload front facing picture",
    refImg: "/FormialFront1.png",
    refAlt: "Front Reference",
    uploadAlt: "User uploaded front view",
  },
  {
    label: "Upload left facing picture",
    refImg: "/FormialLeft1.png",
    refAlt: "Left Reference",
    uploadAlt: "User uploaded left view",
  },
  {
    label: "Upload right facing picture",
    refImg: "/FormialRight1.png",
    refAlt: "Right Reference",
    uploadAlt: "User uploaded right view",
  },
];

const timeline = [
  {
    title: "Verify your details",
    subtitle: "Verify your WhatsApp number",
    icon: <IconUser size={20} stroke={1.8} />,
  },
  {
    title: "Upload your pictures",
    subtitle: "Ensure quality for higher accuracy",
    icon: <IconCamera size={20} stroke={1.8} />,
  },
  {
    title: "Welcome to Formial",
    subtitle: "Here's your personalised dashboard",
    icon: <IconRocket size={20} stroke={1.8} className="text-[#937272]" />,
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
  isUploading = false,
  uploadError = null,
  hideTimeline = false,
}: UploadStepProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col w-full max-w-6xl mx-auto text-[#3D2D1F]"
      style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
    >
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center px-0 py-0 md:py-30">
      {/* Left Panel - Timeline */}
      {!hideTimeline && (
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="w-full lg:max-w-sm h-full"
        >
          <div className="relative lg:bg-[#7CB58D] bg-transparent text-[#1E3F2B] rounded-[32px] px-6 py-2 lg:px-8 lg:py-10 lg:border border-[#325A3C] lg:shadow-[0_10px_30px_rgba(50,90,60,0.25)]">
            <div className="absolute left-12 top-16 bottom-16 w-[2px] bg-[#1E3F2B]/50 hidden md:block" />
            <div className="flex lg:flex-col flex-row lg:gap-8 gap-2 justify-center items-center lg:justify-start lg:items-start">
              {timeline.map((stepItem, idx) => (
                <div key={stepItem.title} className="relative flex lg:items-start gap-4">
                  <div
                    className={`
                      hidden lg:flex relative z-10 mt-1 h-10 w-10 items-center justify-center rounded-2xl text-[#1E3F2B] shadow-md border border-black/60
                      ${idx === 1 ? "bg-white" : idx < 1 ? "bg-white" : "bg-gray-300"}
                    `}
                  >
                    {stepItem.icon}
                  </div>
                  <div>
                    <p className="hidden lg:block font-medium text-lg tracking-tight">
                      {stepItem.title}
                    </p>
                    <p className="hidden lg:block text-sm text-[#1E3F2B]/80">{stepItem.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Right Panel - Upload Area */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="relative flex-1 rounded-[32px] md:px-12"
      >
        <div className="rounded-4xl border border-black overflow-hidden bg-white px-6 md:px-12 py-10 md:py-12 z-20">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={step}
                variants={uploadStepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
              className="w-full overflow-hidden relative z-10"
                style={{ willChange: "transform,opacity" }}
            >
              {/* Title */}
              <h2
                className="text-xl md:text-2xl text-[#5B4331] tracking-tight font-medium leading-tight mb-3"
                style={{ fontFamily: "Inter, var(--font-geist-sans), sans-serif" }}
              >
                {UPLOADS[step].label}
              </h2>

              {/* Instructions */}
              <p className="text-sm md:text-base text-[#6F5B4C] mb-6">
                Make sure your face is clearly visible without any obstructions
              </p>

              {/* Upload Frames */}
              <div className="flex flex-row items-center justify-center gap-4 mb-6">
                {/* Left Frame - Reference Image */}
                <div className="w-full sm:w-[200px] h-[200px] relative rounded-xl overflow-hidden border border-black flex items-center justify-center bg-white">
                      <Image
                        src={UPLOADS[step].refImg}
                        alt={UPLOADS[step].refAlt}
                    fill
                    className="object-cover"
                        priority
                      />
                    </div>

                {/* Right Frame - Upload Area */}
                <div className="w-full sm:w-[200px] h-[200px] relative rounded-xl overflow-hidden border border-dashed border-black flex items-center justify-between bg-white">
                      {uploadedPhotos[step] ? (
                        <>
                          <Image
                            src={URL.createObjectURL(uploadedPhotos[step])}
                            alt={UPLOADS[step].uploadAlt}
                            fill
                            className="object-cover"
                          />
                          <button
                        className="absolute top-2 right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition z-10"
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
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <IconUpload size={32} className="text-gray-600" />
                        </div>
                      <span className="text-sm text-black font-medium text-center">Click to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handlePhotoChange(step, e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                  )}
          </div>
        </div>

        {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4 mt-8">
          <button
            onClick={handleBackLocal}
                  className="rounded-full border border-[#5B4331]/30 px-6 py-3 text-sm font-semibold text-[#5B4331] hover:bg-[#5B4331]/5 transition-colors"
                  type="button"
            aria-label={step === 0 ? "Back" : "Previous Photo"}
          >
                  Go back
          </button>
          <button
            onClick={handleNextLocal}
            disabled={!uploadedPhotos[step] || isUploading}
                  className="box-border px-6 py-3 bg-[#1E3F2B] border-[0.767442px] border-[#1F3F2A]  rounded-full font-medium text-white flex items-center justify-center transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  type="button"
            aria-label={
              step < UPLOADS.length - 1
                ? "Next Photo"
                : isUploading ? "Uploading photos..." : "Done and continue"
            }
          >
            {isUploading 
              ? "Uploading..." 
              : step < UPLOADS.length - 1 
              ? "Next" 
              : "Continue"}
          </button>
              </div>
        </motion.div>
          </AnimatePresence>
          
          {/* Upload Error Message */}
          {uploadError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{uploadError}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
    </motion.div>
  );
}

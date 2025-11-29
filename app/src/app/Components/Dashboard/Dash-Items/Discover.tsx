'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const Discover = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      id: '2',
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
  ]

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <motion.div
          key="discover"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* FAQs Section */}
          <div className="space-y-6">
            {/* FAQs Button */}
            <div className="flex items-center justify-center">
              <div className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold uppercase"
                style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
              >
                FAQs
              </div>
            </div>

            {/* FAQ Accordion Items */}
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="space-y-0">
                  {/* Question - Green Background */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full rounded-xl bg-white border border-[#1E3F2B] px-4 py-3 flex items-center justify-between text-left"
                  >
                    <span className="text-sm font-medium text-[#1E3F2B] pr-4">
                      {faq.question}
                    </span>
                    {openFAQ === faq.id ? (
                      <IconChevronUp className="h-5 w-5 text-[#1E3F2B] flex-shrink-0" />
                    ) : (
                      <IconChevronDown className="h-5 w-5 text-[#1E3F2B] flex-shrink-0" />
                    )}
                  </button>

                  {/* Answer - White Background */}
                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl bg-[#7CB58D] border border-[#1E3F2B] px-4 py-3 mt-2">
                          <p className="text-sm text-white]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Media Section */}
          <div className="space-y-6">
            {/* Media Button */}
            <div className="flex items-center justify-center">
              <div className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold uppercase"
                style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
              >
                Media
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Discover


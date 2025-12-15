'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconChevronDown, IconChevronUp, IconWorld } from '@tabler/icons-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const Discover = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const [showAllFAQs, setShowAllFAQs] = useState(false)
  const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(new Set())

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Who will be supervising my treatment?',
      answer: 'Your treatment will be supervised by licensed dermatologists.\n\nThey will create a personalized combination and dosage of medical ingredients for you and support you in better understanding your skin.\n\nThe medical team is available to you at any time during your treatment for questions and advice. You can access them via the support tab.',
    },
    {
      id: '2',
      question: 'Formial has a short expiry, what happens when my current Formial pump is near expiry?',
      answer: 'Formial formulations are freshly made and have a short shelf life of about 35 days. To make sure your treatment continues without any gaps, we plan your next pump before your current one expires.\n\nWe\'ll send you a quick follow-up message to check in and see how your skin is doing. This is your chance to tell us about any side effects, concerns, or changes (like a new delivery address).\n\nIf we don\'t hear back from you, or if you let us know everything is going well, we\'ll go ahead and send your next pump as planned—usually with a slightly higher strength to support your skin\'s progress.\n\nIf you\'re already subscribed for your next pump, please remember to get back to us about 7 days before your current pump expires if you\'ve had any side effects, concerns, or updates. This helps us keep your treatment safe, effective, and personalised for you.\n\n**What if I miss responding to the follow-up message?**\n\nIf we don\'t hear back from you within the required time, we\'ll assume everything is going well and proceed with your next pump as planned. This helps ensure there\'s no break in your treatment.\n\nIf you do have any concerns, side effects, or changes you\'d like us to consider, please make sure to let us know before your current pump expires.\n\nRest assured, every formulation is reviewed with safety in mind, and your treatment progression is carefully planned. If you realise later that you missed responding, don\'t worry—you can always reach out to us, and our team will be happy to help.',
    },
    {
      id: '3',
      question: 'What is the diagnostic process?',
      answer: 'To gain a comprehensive understanding of your skin, the medical team analyzes your answers to your medical history questionnaire and carefully evaluates the images.\n\nNaturally, your data and images are subject to medical confidentiality and are accessible only to the medical team.\n\nBased on your skin issues and skin type, the medical team will develop an individualized treatment plan that includes skincare, cleansing, and a medical formula.',
    },
    {
      id: '4',
      question: 'Do you use AI to diagnose and manage me?',
      answer: 'At Formial Labs, personal care is our top priority. Our team of doctors and support staff are real people who individually address every message and diagnosis.\n\nYou can be sure: Every response you receive has been written by an experienced professional – with extensive expertise and genuine care. 💙\n\nWhile we do use an AI chatbot that can help with some questions and guide users, if you don\'t get the answer you need your query does get escalated to a human.\n\nYou\'ll always be assisted by our support team – competent, personal, and 100% human.\n\nIn short: At Formial you are in the best hands with real experts – and not with a machine!\n\nBut please note we are not an emergency service and the human service takes time - that\'s what humans do!',
    },
    {
      id: '5',
      question: 'How does Formial differ from other products?',
      answer: 'Our products combine prescription and over-the-counter active ingredients to target your skin imperfections more effectively.\n\nOur doctors adhere strictly to evidence-based guidelines (meaning: making the best possible decisions in pharmaceutical matters) and combine the ingredients to be individually tailored to you and your skin.',
    },
    {
      id: '6',
      question: 'Why does Formial have such a short expiry date? Can I use the product after the expiry date?',
      answer: 'Formial formulations are freshly compounded, made-to-order, and designed without heavy preservatives—so they naturally have a shorter, safety-focused expiry period.\n\nThis ensures the actives remain potent and the product stays microbiologically stable.\n\nWe don\'t recommend using your formulation past its expiry date. For best results and safety, please refill with a fresh batch.',
    },
    {
      id: '7',
      question: 'What are my payment options?',
      answer: 'If you are not a new user of Formial you can purchase Formial directly through the product page on our website if you wish to purchase the product on an ad hoc basis.\n\nHowever, skin issues are chronic conditions and skincare should be ongoing hence to reward consistency we have a very convenient autopay system which works out much cheaper and better for you.\n\nYou can pause or cancel your subscription anytime but please do give us feedback on what we can do to improve our service.',
    },
    {
      id: '8',
      question: 'How do I apply my treatment?',
      answer: 'Use treatment once a day, at night. Do not use it during the day.\n\n• Wash your face with a mild cleanser and dry your face.\n• Use 1-2 pumps. Spread it thinly across your whole face (forehead, cheeks and chin) with your fingertip.\n• Wash hands immediately after application.\n\nTry to avoid applying the treatment close to your eyelids, mouth, lips, or the angles of your nose because these areas are sensitive.\n\nIf you experience side effects, apply a moisturiser 10 minutes before and after applying your treatment. This will help to buffer the strength of the treatment.\n\n**Storage Instructions**\n\nStore this medication in a cool, dry place, below 25°C. In summer climates and hot areas the formula can be stored in the fridge (never freeze it). Keep out of reach of children.\n\n**Patch Testing**\n\nPlease note: Conducting a patch test can help predict if you may have a negative initial reaction to a new product.\n\nTherefore, we recommended you perform a patch test before incorporating this new product into your routine by following the instructions below:\n\nApply the product as directed to a small area once a day for three days to test if you are sensitive to this product.\n\nIf you develop severe irritation, hives, swelling of the eyes and mouth, blistering, or difficulty breathing, rinse off, cease use and consult a physician right away.',
    },
    {
      id: '9',
      question: 'Acne treatment during pregnancy and breastfeeding?',
      answer: 'There\'s nothing wrong with acne treatment during pregnancy, even while breastfeeding. However, not all active ingredients can be used during this time.\n\nThere are no studies in which pregnant women were or are given pharmaceuticals. What we do know comes from women who underwent acne treatment during pregnancy.\n\nMany dermatologists believe that the safest options for acne treatment during pregnancy are creams containing either benzoyl peroxide, azelaic acid, or anti-inflammatory agents.\n\n**Important:** At Formial we do not advise using retinoids, spironolactone and antibiotics during pregnancy.\n\nAbove all, we recommend discussing everything with your gynecologist and general practitioner and following their advice.',
    },
    {
      id: '10',
      question: 'Where is Formial manufactured?',
      answer: 'Your formulation is made in our accredited pharmaceutical lab in Bangalore.',
    },
    {
      id: '11',
      question: 'Can I combine this formula with other skin treatments?',
      answer: 'In the initial stages of treatment with Formial we do not recommend that you use Formial with other actives or cosmetic procedures.\n\nOnce your skin adjusts you may be able to cycle other actives although in most cases this is not necessary.\n\nIf your formulation contains tretinoin this is a useful blog about using it when considering procedures:\n\nhttps://formial.in/blogs/skindeep/can-you-combine-tretinoin-with-cosmetic-procedures-heres-what-you-should-know',
    },
    {
      id: '12',
      question: 'I am not seeing progress. What do I do?',
      answer: 'Please note that using customised skincare is a journey and there can be ups and downs.\n\nMost people start seeing changes in their skin by 3 - 4 weeks of regular use. As we start on a low dose to allow your skin to adjust this can take slightly longer in some people.\n\nBut 8 - 12 weeks of regular usage is a good time to judge whether any progress has been made.\n\nIn case you have concerns please reach out to us in the support tab and we will be happy to help.',
    },
    {
      id: '13',
      question: 'What can I do about hyperpigmentation and redness?',
      answer: 'Hyperpigmentation and redness are often remnants of old acne breakouts, which can take several months to heal completely.\n\nSome ingredients, such as azelaic acid, can support and accelerate this healing process.\n\n**Sun Protection is Key**\n\nSince the sun promotes hyperpigmentation, you should always apply sunscreen (at least SPF 30, ideally SPF 50).\n\nEven on cloudy days, UV rays still penetrate the cloud cover. Therefore, we recommend using sunscreen even in bad weather and during the winter.\n\nStill have questions? Please message us in the support tab.',
    },
  ]

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const toggleAnswerExpansion = (id: string) => {
    setExpandedAnswers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Helper function to check if answer is long (more than ~200 characters as a proxy for 3 lines)
  const isLongAnswer = (answer: string) => {
    return answer.length > 200
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
              {(showAllFAQs ? faqs : faqs.slice(0, 5)).map((faq) => (
                <div key={faq.id} className="space-y-0">
                  {/* Question - Green Background */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full rounded-3xl bg-white border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] px-5 py-3 flex items-center justify-between text-left transition-all"
                  >
                    <span className="text-sm font-bold text-[#1E3F2B] pr-4">
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
                        <div className="rounded-3xl bg-[#faf9ef] border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] px-5 py-4 mt-2">
                          <div className={`text-sm text-[#1E3F2B] leading-relaxed ${isLongAnswer(faq.answer) && !expandedAnswers.has(faq.id) ? 'overflow-hidden' : ''}`}>
                            <div className={`space-y-3 ${isLongAnswer(faq.answer) && !expandedAnswers.has(faq.id) ? 'line-clamp-3' : ''}`}>
                              {faq.answer.split('\n\n').map((paragraph, idx) => {
                                // Handle bullet points
                                if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('**')) {
                                  // Check if it's a markdown-style bold header
                                  if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                                    return (
                                      <h4 key={idx} className="font-bold text-[#1E3F2B] mt-4 mb-2">
                                        {paragraph.replace(/\*\*/g, '')}
                                      </h4>
                                    )
                                  }
                                  // Handle bullet list
                                  const lines = paragraph.split('\n')
                                  return (
                                    <ul key={idx} className="list-none space-y-2 pl-0">
                                      {lines.map((line, lineIdx) => {
                                        const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim()
                                        if (!cleanLine) return null
                                        return (
                                          <li key={lineIdx} className="flex items-center gap-2">
                                            <span className="text-[#1E3F2B] flex-shrink-0">•</span>
                                            <span className="flex-1">{cleanLine}</span>
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  )
                                }
                                // Regular paragraph
                                return (
                                  <p key={idx} className="text-[#1E3F2B]">
                                    {paragraph.trim()}
                                  </p>
                                )
                              })}
                            </div>
                          </div>
                          {isLongAnswer(faq.answer) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleAnswerExpansion(faq.id)
                              }}
                              className="mt-3 text-sm text-[#6F5B4C] hover:text-[#1E3F2B] font-medium underline decoration-[#7CB58D] underline-offset-2 transition-colors"
                            >
                              {expandedAnswers.has(faq.id) ? 'Show less' : 'Show more'}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Show More / Show Less Button */}
            {faqs.length > 5 && (
              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={() => setShowAllFAQs(!showAllFAQs)}
                  className="text-sm text-[#6F5B4C] hover:text-[#1E3F2B] font-medium underline decoration-[#7CB58D] underline-offset-2 transition-colors"
                >
                  {showAllFAQs ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
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

            {/* Instagram Reels Video Embeds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Reel - Left */}
              <div className="w-full rounded-xl overflow-hidden bg-white border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] relative h-120 md:h-120" style={{ aspectRatio: '9/16' }}>
                <iframe
                  src="https://www.instagram.com/reel/DIBlv5HP8bF/embed"
                  className="w-full h-full absolute top-0 left-0"
                  style={{
                    border: 'none',
                    overflow: 'hidden'
                  }}
                  scrolling="no"
                  allow="encrypted-media"
                  title="Instagram Reel 1"
                />
              </div>

              {/* Second Reel - Center */}
              <div className="w-full rounded-xl overflow-hidden bg-white border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] relative h-120 md:h-120" style={{ aspectRatio: '9/16' }}>
                <iframe
                  src="https://www.instagram.com/reel/DK_XXGbP32M/embed"
                  className="w-full h-full absolute top-0 left-0"
                  style={{
                    border: 'none',
                    overflow: 'hidden'
                  }}
                  scrolling="no"
                  allow="encrypted-media"
                  title="Instagram Reel 2"
                />
              </div>

              {/* Third Reel */}
              <div className="w-full rounded-xl overflow-hidden bg-white border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] relative h-120 md:h-120" style={{ aspectRatio: '9/16' }}>
                <iframe
                  src="https://www.instagram.com/reel/DI_UKZXvUno/embed"
                  className="w-full h-full absolute top-0 left-0"
                  style={{
                    border: 'none',
                    overflow: 'hidden'
                  }}
                  scrolling="no"
                  allow="encrypted-media"
                  title="Instagram Reel 3"
                />
              </div>

              {/* Fourth Reel */}
              <div className="w-full rounded-xl overflow-hidden bg-white border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] relative h-120 md:h-120" style={{ aspectRatio: '9/16' }}>
                <iframe
                  src="https://www.instagram.com/reel/DNkwwKrv6Jj/embed"
                  className="w-full h-full absolute top-0 left-0"
                  style={{
                    border: 'none',
                    overflow: 'hidden'
                  }}
                  scrolling="no"
                  allow="encrypted-media"
                  title="Instagram Reel 4"
                />
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-center">
              <div className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold uppercase"
                style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
              >
                Connect With Us
              </div>
            </div>

            {/* Premium Connect Section */}
            <div className="relative">
              {/* Elegant background with subtle gradient */}
              <div className="absolute inset-0  rounded-3xl"></div>
              
              {/* Main container */}
              <div className="relative bg-[#F8F6EE] backdrop-blur-xl rounded-3xl border border-[#644B34] border-dashed shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden ">
                {/* Subtle accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7CB58D]/20 to-transparent"></div>
                
                <div className="px-8 md:px-12 py-8 md:py-8">
                  <div className="max-w-4xl mx-auto">
                    {/* Premium Header */}
                    <div className="text-left mb-16 space-y-5">
                      <h2 className="text-2xl md:text-2xl font-medium text-[#644B34] tracking-[-0.02em] leading-tight">
                        Connect With Us
                      </h2>
                      <p className="text-base md:text-base text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed font-light">
                        Join our community for expert skincare insights, product updates, and personalized guidance on your skin health journey.
                      </p>
                    </div>

                    {/* Social Links - Premium Grid */}
                    <div className="grid grid-cols-4 md:grid-cols-4 gap-3 -mb-6 -mt-16">
                      {/* WhatsApp */}
                      <motion.a
                        href="https://wa.me/918217816693"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl   transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                        aria-label="Contact us on WhatsApp"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#644B34]/5 rounded-full transition-colors duration-300 blur-sm"></div>
                          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#644B34]/10 to-[#7CB58D]/5 flex items-center justify-center transition-transform duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                          </div>
                        </div>
                        <span className="text-[13px] font-medium text-[#1A1A1A] tracking-tight">WhatsApp</span>
                      </motion.a>

                      {/* Instagram */}
                      <motion.a
                        href="https://www.instagram.com/formiallabs?igsh=cnJxb3kyODZiNWQz"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl   transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                        aria-label="Follow us on Instagram"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#644B34]/5 rounded-full transition-colors duration-300 blur-sm"></div>
                          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#644B34]/10 to-[#7CB58D]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </div>
                        </div>
                        <span className="text-[13px] font-medium text-[#1A1A1A] tracking-tight">Instagram</span>
                      </motion.a>

                      {/* LinkedIn */}
                      <motion.a
                        href="https://www.linkedin.com/company/formiallabs/posts/?feedView=all"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl   transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                        aria-label="Follow us on LinkedIn"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#644B34]/5 rounded-full transition-colors duration-300 blur-sm"></div>
                          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#644B34]/10 to-[#7CB58D]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </div>
                        </div>
                        <span className="text-[13px] font-medium text-[#1A1A1A] tracking-tight">LinkedIn</span>
                      </motion.a>

                      {/* Website */}
                      <motion.a
                        href="https://formial.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl   transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                        aria-label="Visit our website"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#644B34]/5 rounded-full transition-colors duration-300 blur-sm"></div>
                          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#644B34]/10 to-[#7CB58D]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IconWorld className="h-6 w-6 text-[#1E3F2B]" strokeWidth={2} />
                          </div>
                        </div>
                        <span className="text-[13px] font-medium text-[#1A1A1A] tracking-tight">Website</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Discover


'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconChevronDown, IconChevronUp, IconBrandInstagram, IconBrandLinkedin, IconWorld, IconBrandWhatsapp } from '@tabler/icons-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const Discover = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const [showAllFAQs, setShowAllFAQs] = useState(false)

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Who will be supervising my treatment?',
      answer: 'Your treatment will be supervised by licensed dermatologists. They will create a personalized combination and dosage of medical ingredients for you and support you in better understanding your skin. The medical team is available to you at any time during your treatment for questions and advice. You can access them via the support tab.',
    },
    {
      id: '2',
      question: 'What is the diagnostic process?',
      answer: 'To gain a comprehensive understanding of your skin, the medical team analyzes your answers to your medical history questionnaire and carefully evaluates the images. Naturally, your data and images are subject to medical confidentiality and are accessible only to the medical team. Based on your skin issues and skin type, the medical team will develop an individualized treatment plan that includes skincare, cleansing, and a medical formula.',
    },
    {
      id: '3',
      question: 'Do you use AI to diagnose and manage me?',
      answer: 'At Formial Labs, personal care is our top priority. Our team of doctors and support staff are real people who individually address every message and diagnosis. You can be sure: Every response you receive has been written by an experienced professional – with extensive expertise and genuine care. 💙 While we do use an AI chatbot that can help with some questions and guide users, if you don\'t get the answer you need your query does get escalated to a human. You\'ll always be assisted by our support team – competent, personal, and 100% human. In short: At Formial you are in the best hands with real experts – and not with a machine! But please note we are not an emergency service and the human service takes time - that\'s what humans do!',
    },
    {
      id: '4',
      question: 'How does Formial differ from other products?',
      answer: 'Our products combine prescription and over-the-counter active ingredients to target your skin imperfections more effectively. Our doctors adhere strictly to evidence-based guidelines (meaning: making the best possible decisions in pharmaceutical matters) and combine the ingredients to be individually tailored to you and your skin.',
    },
    {
      id: '5',
      question: 'Why does Formial have such a short expiry date? Can I use the product after the expiry date?',
      answer: 'Formial formulations are freshly compounded, made-to-order, and designed without heavy preservatives—so they naturally have a shorter, safety-focused expiry period. This ensures the actives remain potent and the product stays microbiologically stable. We don\'t recommend using your formulation past its expiry date. For best results and safety, please refill with a fresh batch.',
    },
    {
      id: '6',
      question: 'What are my payment options?',
      answer: 'If you are not a new user of Formial you can purchase Formial directly through the product page on our website if you wish to purchase the product on an ad hoc basis. However, skin issues are chronic conditions and skincare should be ongoing hence to reward consistency we have a very convenient autopay system which works out much cheaper and better for you. You can pause or cancel your subscription anytime but please do give us feedback on what we can do to improve our service.',
    },
    {
      id: '7',
      question: 'How do I apply my treatment?',
      answer: 'Use treatment once a day, at night. Do not use it during the day.\n\n• Wash your face with a mild cleanser and dry your face.\n• Use 1-2 pumps. Spread it thinly across your whole face (forehead, cheeks and chin) with your fingertip.\n• Wash hands immediately after application.\n\nTry to avoid applying the treatment close to your eyelids, mouth, lips, or the angles of your nose because these areas are sensitive.\n\nIf you experience side effects, apply a moisturiser 10 minutes before and after applying your treatment. This will help to buffer the strength of the treatment.\n\nStore this medication in a cool, dry place, below 25°C. In summer climates and hot areas the formula can be stored in the fridge (never freeze it). Keep out of reach of children.\n\n**Patch Testing**\n\nPlease note: Conducting a patch test can help predict if you may have a negative initial reaction to a new product. Therefore, we recommended you perform a patch test before incorporating this new product into your routine by following the instructions below:\n\nApply the product as directed to a small area once a day for three days to test if you are sensitive to this product. If you develop severe irritation, hives, swelling of the eyes and mouth, blistering, or difficulty breathing, rinse off, cease use and consult a physician right away.',
    },
    {
      id: '8',
      question: 'Acne treatment during pregnancy and breastfeeding?',
      answer: 'There\'s nothing wrong with acne treatment during pregnancy, even while breastfeeding. However, not all active ingredients can be used during this time. There are no studies in which pregnant women were or are given pharmaceuticals. What we do know comes from women who underwent acne treatment during pregnancy. Many dermatologists believe that the safest options for acne treatment during pregnancy are creams containing either benzoyl peroxide, azelaic acid, or anti-inflammatory agents. At Formial we do not advise using retinoids, spironolactone and antibiotics during pregnancy. Above all, we recommend discussing everything with your gynecologist and general practitioner and following their advice.',
    },
    {
      id: '9',
      question: 'Where is Formial manufactured?',
      answer: 'Your formulation is made in our accredited pharmaceutical lab in Bangalore.',
    },
    {
      id: '10',
      question: 'Can I combine this formula with other skin treatments?',
      answer: 'In the initial stages of treatment with Formial we do not recommend that you use Formial with other actives or cosmetic procedures. Once your skin adjusts you may be able to cycle other actives although in most cases this is not necessary. If your formulation contains tretinoin this is a useful blog about using it when considering procedures: https://formial.in/blogs/skindeep/can-you-combine-tretinoin-with-cosmetic-procedures-heres-what-you-should-know',
    },
    {
      id: '11',
      question: 'I am not seeing progress. What do I do?',
      answer: 'Please note that using customised skincare is a journey and there can be ups and downs. Most people start seeing changes in their skin by 3 - 4 weeks of regular use. As we start on a low dose to allow your skin to adjust this can take slightly longer in some people. But 8 - 12 weeks of regular usage is a good time to judge whether any progress has been made. In case you have concerns please reach out to us in the support tab and we will be happy to help.',
    },
    {
      id: '12',
      question: 'What can I do about hyperpigmentation and redness?',
      answer: 'Hyperpigmentation and redness are often remnants of old acne breakouts, which can take several months to heal completely. Some ingredients, such as azelaic acid, can support and accelerate this healing process. Since the sun promotes hyperpigmentation, you should always apply sunscreen (at least SPF 30, ideally SPF 50). Even on cloudy days, UV rays still penetrate the cloud cover. Therefore, we recommend using sunscreen even in bad weather and during the winter. Still have questions? Please message us in the support tab.',
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
                          <div className="text-sm text-[#1E3F2B] leading-relaxed space-y-3">
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
            {/* Social Media Button */}
            <div className="flex items-center justify-center">
              <div className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold uppercase"
                style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
              >
                Connect With Us
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center justify-center gap-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/918217816693"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent border-0 border-[#3D2D1F] text-[#3D2D1F] hover:bg-[#3D2D1F]/10 hover:scale-110 transition-all shadow-sm"
                aria-label="Contact us on WhatsApp"
              >
                <IconBrandWhatsapp className="h-6 w-6 stroke-[#3D2D1F]" strokeWidth={1.5} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/formiallabs?igsh=cnJxb3kyODZiNWQz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent border-0 border-[#3D2D1F] text-[#3D2D1F] hover:bg-[#3D2D1F]/10 hover:scale-110 transition-all shadow-sm"
                aria-label="Follow us on Instagram"
              >
                <IconBrandInstagram className="h-6 w-6 stroke-[#3D2D1F]" strokeWidth={1.5} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/formiallabs/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent border-0 border-[#3D2D1F] text-[#3D2D1F] hover:bg-[#3D2D1F]/10 hover:scale-110 transition-all shadow-sm"
                aria-label="Follow us on LinkedIn"
              >
                <IconBrandLinkedin className="h-6 w-6 stroke-[#3D2D1F]" strokeWidth={1.5} />
              </a>

              {/* Website */}
              <a
                href="https://formial.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent border-0 border-[#3D2D1F] text-[#3D2D1F] hover:bg-[#3D2D1F]/10 hover:scale-110 transition-all shadow-sm"
                aria-label="Visit our website"
              >
                <IconWorld className="h-6 w-6 stroke-[#3D2D1F]" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Discover


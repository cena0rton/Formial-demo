'use client'
import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconX } from '@tabler/icons-react'
import TreatmentPlan from './TreatmentPlan'
import ProgressTimeline from './ProgressTimeline'
import ReferAndEarn from './ReferAndEarn'
import { FormialPrescription, FormialUser, FormialOrder, getOrders } from '../../../utils/formialApi'

type SectionType = 'treatment' | 'progress' | 'refer'

interface DashHomeProps {
  activeSection?: SectionType
  user?: FormialUser | null
  prescriptions?: FormialPrescription[]
  isLoading?: boolean
  onRefetch?: () => void
}

const DashHome = ({
  activeSection = 'treatment',
  user,
  prescriptions = [],
  isLoading,
  onRefetch,
}: DashHomeProps) => {
  const [showPharmacyNotes, setShowPharmacyNotes] = useState(false)
  const [orders, setOrders] = useState<FormialOrder[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true)
        const ordersResponse = await getOrders()
        setOrders(ordersResponse.orders || [])
      } catch (err) {
        // If orders endpoint fails, just set empty array (graceful degradation)
        console.warn('Failed to fetch orders for TreatmentPlan:', err)
        setOrders([])
      } finally {
        setOrdersLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // Get the latest prescription (most recent by createdAt)
  const latestPrescription = useMemo(() => {
    if (!prescriptions || prescriptions.length === 0) return null
    const sorted = [...prescriptions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return sorted[0]
  }, [prescriptions])

  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        {/* Show Treatment Plan and Progress Timeline together on home */}
        {activeSection === 'treatment' && (
          <>
            <TreatmentPlan
              user={user}
              latestPrescription={latestPrescription}
              orders={orders}
              isLoading={isLoading || ordersLoading}
            />
            {/* Consultancy and Pharmacy Notes */}
            <div className="w-full space-y-4 my-6 mb-8 tracking-tight">
              {/* Pharmacy Notes Card */}
              <div className="bg-[#F8F6EE] rounded-2xl border border-[#644a34] border-dashed p-5 flex items-center gap-4 transition-shadow duration-200">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-[#3D2D1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#3D2D1F] mb-1">CLINICAL NOTES</h3>
                  <p className="md:text-sm text-xs text-[#3D2D1F]">
                    Access your prescription details, formulation information, and pharmacy instructions.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => setShowPharmacyNotes(true)}
                    className="px-5 py-2 cursor-pointer bg-[#644a34] text-white text-sm font-medium rounded-full hover:bg-[#1E3F2B] transition-colors duration-200"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
            <ProgressTimeline 
              prescriptions={prescriptions} 
              isLoading={isLoading}
              contact={user?.contact || null}
              onRefetch={onRefetch}
            />
          </>
        )}
        {activeSection === 'progress' && (
          <ProgressTimeline 
            prescriptions={prescriptions} 
            isLoading={isLoading}
            contact={user?.contact || null}
          />
        )}
        {activeSection === 'refer' && <ReferAndEarn contact={user?.contact || null} />}
      </div>

      {/* Pharmacy Notes Modal */}
      <AnimatePresence>
        {showPharmacyNotes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPharmacyNotes(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-[#644a34] px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white tracking-tight">CLINICAL NOTES</h2>
                <button
                  onClick={() => setShowPharmacyNotes(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <IconX className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="overflow-y-auto max-h-[calc(85vh-64px)] p-6 space-y-6 text-[#3D2D1F] tracking-tight [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* About Your Prescription */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">About your prescription</h3>
                  <p className="text-sm mb-3">You've been prescribed a personalised formula.</p>
                  <p className="text-sm mb-3">This treatment is used only at night unless otherwise advised.</p>
                  <p className="text-sm">Your formulation is potent and very effective, but your skin needs time to get used to it. Starting slowly is the key to good results.</p>
                </section>

                {/* How to use your Formial formula */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">How to use your Formial formula</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">At night only</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Wash your face with a gentle cleanser</li>
                        <li>Pat dry and until your skin is completely dry</li>
                        <li>Apply pea-sized amount / 1–2 pumps to full face</li>
                        <li>Follow with a gentle moisturiser</li>
                      </ul>
                      <p className="text-sm mt-2 ml-2 font-medium">Avoid the areas around the eyes, nose folds, and mouth.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Initiation Schedule (Low &amp; Slow Principle)</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li><strong>Week 1:</strong> 2× per week</li>
                        <li><strong>Week 2:</strong> 3× per week (if tolerated)</li>
                        <li><strong>Week 3:</strong> 4× per week (if tolerated)</li>
                        <li><strong>Week 4 onward:</strong> Maximum 5× per week</li>
                      </ul>
                      <p className="text-xs text-[#6B6B6B] mt-1 ml-2">(Daily use is not mandatory and often unnecessary)</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">When first starting on Formial we recommend the sandwich technique</h4>
                      <h5 className="font-medium text-[#3D2D1F] mb-1 mt-2">Sandwich Method (Optional)</h5>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Moisturiser → wait 5 min</li>
                        <li>Formulation</li>
                        <li>Moisturiser again after 5 min</li>
                      </ul>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm mb-2">There is a risk of experiencing increased pigmentation when first initiating tretinoin treatment (particularly for darker skin types). This is due to a dermatitis or inflammation reaction when first using the treatment that in turn leads to a temporary increase in pigmentation. This process is normal and it will resolve with ongoing treatment once the initial dermatitis or inflammation settles down.</p>
                      <p className="text-sm mb-2">It is important that you carefully follow the instructions for using and increasing your treatment and listen to your skin, with reduced use if you experience any irritation. Once your skin adjusts to treatment, with continued use of tretinoin your pigmentation will continue to lighten including any original pigmentation that was present before starting treatment.</p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-[#644B34] mb-2">Recommended Products</h4>
                      <p className="text-sm font-medium mb-1">Make sure you use a simple cleanser such as:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>CeraVe hydrating or foaming cleanser</li>
                        <li>Cetaphil gentle cleanser</li>
                      </ul>
                      <p className="text-sm font-medium mb-1 mt-3">For moisturisers we would recommend:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>CeraVe cream</li>
                        <li>Cerave lotion for something lighter</li>
                        <li>Bioderma atoderm</li>
                        <li>Anything that is gentle on sensitive skin is key</li>
                      </ul>
                      <p className="text-sm font-medium mb-1 mt-3">For lightweight sunscreens, SPF 50+++ of your choice - this is compulsory:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>AcneUV gel / BanRay Sunscreen / Photostable Acne Sunscreen</li>
                      </ul>
                      <p className="text-sm font-medium mb-1 mt-3">For tinted sunscreen:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Eclipse Solaire Tinted Sunscreen / Rivela Lite Tinted Sunscreen / Solasafe Tinted Sunscreen</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Managing side effects */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Managing side effects</h3>
                  <p className="text-sm mb-3">Sometimes side effects are often unavoidable, but there are a few things you can do to lessen them…</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🥪</span>
                      <p className="text-sm"><strong>The Sandwich Method:</strong> apply a moisturiser 5-10 minutes before and 5-10 minutes after applying your Software formula.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">⏱</span>
                      <p className="text-sm"><strong>Take a break:</strong> leave 3-4 days between applying your formula, this will help your skin recover and slowly adapt to the formula.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🧼</span>
                      <p className="text-sm"><strong>Physical exfoliation:</strong> use a face cloth to gently scrub off any dead or peeling skin.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">👃</span>
                      <p className="text-sm"><strong>Avoid the orifices:</strong> avoid the areas around your nose, eyes and mouth - cream can get stuck in the crevices causing severe peeling.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">📈</span>
                      <p className="text-sm"><strong>Start small:</strong> start with a small amount (1-2 pumps)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🧖</span>
                      <p className="text-sm"><strong>Apply for a short time:</strong> apply the cream at night for a few hours and then wash it off, this will help your skin adjust to the prescription-strength ingredients.</p>
                    </div>
                  </div>
                  
                  <p className="text-sm mt-4">Most of all, listen to your skin. If you find that your skin is really irritated, take a few days off from using your treatment and just cleanse, moisturise, and use your SPF instead. If you're uncertain about the side effects you're experiencing, drop us a line at <a href="mailto:care@formial.in" className="text-[#7CB58D] hover:underline">care@formial.in</a> or reach out to us via your support window or whatsapp - we are always happy to help!</p>
                </section>

                {/* Purging */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Purging</h3>
                  <p className="text-sm mb-3">Please be aware that on starting this treatment cream you may experience a purging reaction which occurs in some people with acne prone skin when using tretinoin for the first time.</p>
                  <p className="text-sm mb-3">Purging occurs when the skin starts getting rid of all the pimples that were forming underneath the top layer - pimples that might've taken weeks to emerge, but then appear at a rapid rate.</p>
                  <p className="text-sm">Purging is common, and it usually subsides within 6 weeks. It is a positive sign as it means that your treatment is working.</p>
                </section>

                {/* Other considerations */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Other considerations</h3>
                  <p className="text-sm mb-3">During the first treatment cycle, we would advise you to stop any other 'active' treatment whilst your skin gets used to the new formula and to protect your skin barrier.</p>
                  <p className="text-sm mb-3">In addition, if considering any further skin treatments such as laser, microblading, waxing etc we advise you to request a review with us or disclose that you are using potent actives like tretinoin to the provider. There is a significant risk of skin damage and you may need to pause your formulation before and after the procedure.</p>
                  <p className="text-sm mb-3">Please don't hesitate to reach out to us if you have any concerns or if you feel you are not tolerating this strength well, as we have the option to increase the strength of Tretinoin or change your formulation as needed. There are plenty of options to make sure we get results, our aim is to start slow to prevent irritation and allow your skin to adjust...patience is key!</p>
                  <p className="text-sm">The whole team at Formial looks forward to following your progress! Trust us when we say that nothing makes us happier than seeing you get results 😊</p>
                </section>

                {/* Follow up */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Follow up</h3>
                  <p className="text-sm mb-3">You'll receive regular WhatsApp messages checking in on your progress.</p>
                  <p className="text-sm">If you'd like a review consultation at any time, you can reach us via the Consult / Support tab or on WhatsApp.</p>
                </section>

                {/* Your Formial pump & refills */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Your Formial pump &amp; refills</h3>
                  <p className="text-sm mb-3">Formial formulations are freshly made and have a short shelf life of around 35 days.</p>
                  <p className="text-sm mb-3">To avoid any gaps in your treatment, we plan your next pump before your current one expires.</p>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold text-[#644B34] mb-2">Our check-in message</h4>
                    <p className="text-sm mb-2">Before your next pump, we'll send you a quick message to see how your skin is doing.</p>
                    <p className="text-sm mb-2">This is your chance to tell us about:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                      <li>Side effects or irritation</li>
                      <li>Any concerns</li>
                      <li>Changes like a new delivery address</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-[#644B34] mb-2">What happens next?</h4>
                    <p className="text-sm">If everything is going well—or if we don't hear back—we'll send your next pump as planned. This is usually at a slightly higher strength, to support your skin's progress.</p>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-[#644B34] mb-2">If you're already subscribed</h4>
                    <p className="text-sm">If you've had any side effects, concerns, or updates, please reply at least 7 days before your current pump expires.</p>
                    <p className="text-sm mt-2">This helps us keep your treatment safe, effective, and personalised.</p>
                  </div>
                </section>

                {/* Side effects */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Side effects</h3>
                  <p className="text-sm mb-3">Remember it is normal to experience redness, peeling and a stinging sensation for a short period of time when initially using the treatment. This is an indication that the treatment is working. If the side effects continue then we can reduce the strength of your treatment for you - just get in touch.</p>
                  <p className="text-sm mb-3">You will receive further instructions with your treatment but let us know if you have any other questions.</p>
                  <p className="text-sm">We'll be in touch towards the end of your prescription to arrange a follow-up consultation. Please feel free to contact us if you have any questions by sending me a message below.</p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DashHome

'use client'
import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconX } from '@tabler/icons-react'
import TreatmentPlan from './TreatmentPlan'
import ProgressTimeline from './ProgressTimeline'
import ReferAndEarn from './ReferAndEarn'
import { FormialPrescription, FormialUser } from '../../../utils/formialApi'

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
              isLoading={isLoading}
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
                  <h3 className="text-base font-bold text-[#3D2D1F] mb-1">Clinical Notes</h3>
                  <p className="text-sm text-[#3D2D1F]">
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
                <h2 className="text-lg font-bold text-white tracking-tight">Clinical Notes</h2>
                <button
                  onClick={() => setShowPharmacyNotes(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <IconX className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="overflow-y-auto max-h-[calc(85vh-64px)] p-6 space-y-6 text-[#3D2D1F] tracking-tight [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Indication */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Indication</h3>
                  <p className="text-sm mb-2">Topical retinoid-based therapy for:</p>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                    <li>Acne vulgaris</li>
                    <li>Post-inflammatory hyperpigmentation (PIH)</li>
                    <li>Dyschromia</li>
                    <li>Texture irregularities</li>
                    <li>Early photoageing</li>
                  </ul>
                </section>

                {/* Core Actives */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Core Actives (Formulation-Independent Knowledge)</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Tretinoin</h4>
                      <p className="text-sm font-medium mb-1">Mechanism:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2 mb-2">
                        <li>Increases epidermal cell turnover</li>
                        <li>Normalises follicular keratinisation</li>
                        <li>Stimulates collagen synthesis</li>
                        <li>Improves pigmentation, fine lines, and texture</li>
                      </ul>
                      <p className="text-sm font-medium mb-1">Clinical characteristics:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Highly effective but irritant-prone during initiation</li>
                        <li>Requires gradual introduction</li>
                        <li>Results typically visible after 8–12 weeks</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Niacinamide (Adjunctive)</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Barrier-supportive and anti-inflammatory</li>
                        <li>Reduces erythema, irritation, sebum production</li>
                        <li>Enhances tolerability of retinoids</li>
                        <li>Improves pigmentation and blotchiness</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Hydrating/Base Components (e.g., HA)</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Improve tolerability</li>
                        <li>Do not alter tretinoin pharmacodynamics</li>
                        <li>Do not negate irritation risk</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Application Protocol */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Application Protocol (Standardised)</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Timing</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Night-time use only</li>
                        <li>Morning application increases phototoxic irritation risk</li>
                      </ul>
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
                      <h4 className="font-semibold text-[#644B34] mb-2">Application Method</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Cleanse with mild, soap-free cleanser</li>
                        <li>Pat dry</li>
                        <li>Wait 20–30 minutes before application (critical for irritation reduction)</li>
                        <li>Apply pea-sized amount / 1–2 pumps to full face</li>
                      </ul>
                      <p className="text-sm font-medium mt-2 mb-1">Avoid:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Periocular region</li>
                        <li>Nasolabial folds</li>
                        <li>Corners of mouth</li>
                        <li>Nasal creases</li>
                      </ul>
                      <p className="text-sm mt-2 ml-2">Wash hands post-application</p>
                    </div>
                  </div>
                </section>

                {/* Barrier Protection */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Barrier Protection &amp; Tolerability Strategies</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Moisturiser Use</h4>
                      <p className="text-sm mb-1">Non-comedogenic, fragrance-free. Can be used:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Before tretinoin (buffering)</li>
                        <li>After tretinoin</li>
                        <li>Both (sandwich method)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Sandwich Method (Optional)</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Moisturiser → wait ~20 min</li>
                        <li>Tretinoin</li>
                        <li>Moisturiser again after ~20 min</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Short-Contact Therapy (If Highly Sensitive)</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Apply tretinoin for 1–3 hours initially</li>
                        <li>Wash off</li>
                        <li>Progress to overnight use once tolerated</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Expected Reactions */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Expected Reactions (Normal vs Concerning)</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Common &amp; Expected (Early Phase)</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Erythema</li>
                        <li>Dryness</li>
                        <li>Peeling</li>
                        <li>Tightness</li>
                        <li>Mild stinging</li>
                      </ul>
                      <p className="text-xs text-[#644B34] mt-1 ml-2 font-medium">These indicate retinoid activity, not allergy.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Purging</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Transient acne flare due to accelerated comedone extrusion</li>
                        <li>Typically resolves within 4–6 weeks</li>
                        <li>More common in acne-prone patients</li>
                        <li>Not a reason to discontinue unless severe</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#644B34] mb-2">Pigmentation Considerations</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Initial inflammatory response may temporarily worsen pigmentation, especially in darker skin types</li>
                        <li>Mechanism: irritant dermatitis → post-inflammatory hyperpigmentation</li>
                        <li>With correct usage and barrier protection: pigmentation improves long-term</li>
                        <li>Overuse increases PIH risk</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Sun Protection */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Sun Protection (Non-Negotiable)</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                    <li>Broad-spectrum SPF 50+ daily</li>
                    <li>Reapply every 2 hours with sun exposure</li>
                    <li>UV exposure significantly worsens irritation and PIH while on retinoids</li>
                  </ul>
                </section>

                {/* Contraindications */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Contraindications (Universal)</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-red-700 mb-2">Do NOT use if:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2 text-red-700">
                        <li>Pregnant, breastfeeding, or planning pregnancy</li>
                        <li>Concurrent oral retinoid therapy</li>
                        <li>Active dermatitis, open wounds</li>
                        <li>Known retinoid hypersensitivity</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">Avoid concurrent use with:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Benzoyl peroxide</li>
                        <li>Salicylic acid</li>
                        <li>Physical/chemical exfoliants</li>
                        <li>Alcohol-based products</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Procedural Precautions */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Procedural Precautions</h3>
                  <p className="text-sm mb-2">Avoid during:</p>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                    <li>Chemical peels</li>
                    <li>Laser therapies</li>
                    <li>Waxing</li>
                    <li>Microblading</li>
                  </ul>
                  <p className="text-xs text-[#6B6B6B] mt-2 ml-2">Increased epidermal fragility → higher injury risk</p>
                </section>

                {/* Management of Excess Irritation */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Management of Excess Irritation</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                    <li>Reduce frequency</li>
                    <li>Pause treatment for several days</li>
                    <li>Focus on: Gentle cleansing, Moisturising, Sunscreen</li>
                    <li>Resume at lower frequency once settled</li>
                  </ul>
                </section>

                {/* Serious Adverse Reactions */}
                <section>
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3 pb-2 border-b border-[#CBBEAD]">Serious Adverse Reactions (Rare)</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-red-700 mb-2">Require immediate cessation and medical review:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-2 text-red-700">
                      <li>Severe burning</li>
                      <li>Weeping or erosions</li>
                      <li>Facial swelling</li>
                      <li>Systemic allergic symptoms</li>
                    </ul>
                  </div>
                </section>

                {/* Clinical Principle Summary */}
                <section className="bg-[#644a34]/10 border border-[#644a34]/30 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-[#3D2D1F] mb-3">Clinical Principle Summary</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                    <li>Tretinoin is dose-independent but frequency-dependent</li>
                    <li>Barrier preservation determines long-term success</li>
                    <li>Faster is not better</li>
                    <li><strong>Consistency &gt; intensity</strong></li>
                    <li>Patient education is critical to adherence</li>
                  </ul>
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

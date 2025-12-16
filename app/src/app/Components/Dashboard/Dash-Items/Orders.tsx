'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  getOrders, 
  FormialOrder,
  getSubscription,
  startSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription
} from '../../../utils/formialApi'
import { getAuthToken } from '../../../utils/authToken'
import { 
  IconShoppingBag, 
  IconCalendar, 
  IconCurrencyRupee, 
  IconMapPin, 
  IconMail, 
  IconPhone, 
  IconExternalLink,
  IconPlayerPlay,
  IconPlayerPause,
  IconX,
  IconRefresh
} from '@tabler/icons-react'

const Orders = () => {
  const [orders, setOrders] = useState<FormialOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null)
  const [subscriptionDetails, setSubscriptionDetails] = useState<{
    subscription_id?: string
    start_date?: string
    final_end_date?: string
    next_billing?: string | number
    plan_ends?: number
    valid_until?: string
  } | null>(null)
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false)
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [showManageSubscription, setShowManageSubscription] = useState(false)
  const [isActiveToggle, setIsActiveToggle] = useState(true) // Toggle state for testing

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Fetch orders
        try {
          const ordersResponse = await getOrders()
          setOrders(ordersResponse.orders || [])
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders'
          // Check if it's a 404 or route not found error - handle gracefully
          if (errorMessage.includes('Cannot GET') || errorMessage.includes('404') || errorMessage.includes('not found') || errorMessage.includes('Request failed with status 404')) {
            setOrders([])
            setError(null)
            console.warn('Orders endpoint not available:', errorMessage)
          } else {
            setError(errorMessage)
            console.error('Error fetching orders:', err)
          }
        }

        // Fetch subscription status
        try {
          const subscriptionResponse = await getSubscription()
          if (subscriptionResponse.success && subscriptionResponse.subscription) {
            const sub = subscriptionResponse.subscription
            setSubscriptionStatus(sub.status || null)
            setSubscriptionDetails({
              subscription_id: sub.subscription_id,
              start_date: sub.start_date,
              final_end_date: sub.final_end_date,
              next_billing: sub.next_billing,
              plan_ends: sub.plan_ends,
              valid_until: sub.valid_until,
            })
          } else {
            // No subscription found
            setSubscriptionStatus(null)
            setSubscriptionDetails(null)
          }
        } catch (err) {
          // Subscription endpoint might not exist or user has no subscription
          // This is okay - just means no subscription exists
          setSubscriptionStatus(null)
          setSubscriptionDetails(null)
          console.log('No subscription found or endpoint not available')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const formatPrice = (price?: string) => {
    if (!price) return 'N/A'
    return `₹${parseFloat(price).toLocaleString('en-IN')}`
  }

  const formatTimestamp = (timestamp: number) => {
    try {
      const date = new Date(timestamp * 1000)
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return 'N/A'
    }
  }

  const fetchSubscriptionStatus = async () => {
    try {
      const subscriptionResponse = await getSubscription()
      if (subscriptionResponse.success && subscriptionResponse.subscription) {
        const sub = subscriptionResponse.subscription
        setSubscriptionStatus(sub.status || null)
        setSubscriptionDetails({
          subscription_id: sub.subscription_id,
          start_date: sub.start_date,
          final_end_date: sub.final_end_date,
          next_billing: sub.next_billing,
          plan_ends: sub.plan_ends,
          valid_until: sub.valid_until,
        })
      } else {
        // No subscription found
        setSubscriptionStatus(null)
        setSubscriptionDetails(null)
      }
    } catch (err) {
      // Subscription endpoint might not exist or user has no subscription
      setSubscriptionStatus(null)
      setSubscriptionDetails(null)
    }
  }

  const handleStartSubscription = async () => {
    try {
      setIsSubscriptionLoading(true)
      setSubscriptionError(null)
      
      // Check if token exists
      const token = getAuthToken()
      if (!token) {
        setSubscriptionError('No authentication token found. Please log out and log in again.')
        return
      }

      const response = await startSubscription()
      
      // Check if API call was successful
      if (response.success) {
        if (response.payment_link) {
          // Open payment link in new tab/window
          const paymentWindow = window.open(response.payment_link, '_blank', 'noopener,noreferrer')
          
          // Check if popup was blocked and provide fallback
          if (!paymentWindow || paymentWindow.closed || typeof paymentWindow.closed === 'undefined') {
            // Popup blocked - redirect current window as fallback
            const shouldRedirect = window.confirm(
              'Please allow popups for this site, or click OK to be redirected to the payment page.'
            )
            if (shouldRedirect) {
              window.location.href = response.payment_link
              return // Don't continue with state updates since we're redirecting
            }
          } else {
            // Successfully opened - focus the new window
            paymentWindow.focus()
          }
        }
        // Store subscription details - status is 'created' when payment is pending
        setSubscriptionStatus('created')
        setSubscriptionDetails({
          subscription_id: response.subscription_id,
          start_date: response.start_date,
          final_end_date: response.final_end_date,
        })
        // Refresh subscription status after a delay to check if payment was completed
        setTimeout(() => {
          fetchSubscriptionStatus()
        }, 2000)
      } else {
        throw new Error(response.message || 'Failed to start subscription')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start subscription'
      setSubscriptionError(errorMessage)
      console.error('Subscription start error:', err)
    } finally {
      setIsSubscriptionLoading(false)
    }
  }

  const handlePauseSubscription = async () => {
    try {
      setIsSubscriptionLoading(true)
      setSubscriptionError(null)
      const response = await pauseSubscription()
      
      if (response.success) {
        setSubscriptionStatus(response.status)
        setSubscriptionDetails(prev => ({
          ...prev,
          next_billing: response.next_billing,
        }))
        // Refresh subscription status to ensure UI is in sync
        await fetchSubscriptionStatus()
      } else {
        throw new Error(response.message || 'Failed to pause subscription')
      }
    } catch (err) {
      setSubscriptionError(err instanceof Error ? err.message : 'Failed to pause subscription')
    } finally {
      setIsSubscriptionLoading(false)
    }
  }

  const handleResumeSubscription = async () => {
    try {
      setIsSubscriptionLoading(true)
      setSubscriptionError(null)
      const response = await resumeSubscription()
      
      if (response.success) {
        setSubscriptionStatus(response.status)
        setSubscriptionDetails(prev => ({
          ...prev,
          next_billing: response.next_billing,
          plan_ends: response.plan_ends,
        }))
        // Refresh subscription status to ensure UI is in sync
        await fetchSubscriptionStatus()
      } else {
        throw new Error(response.message || 'Failed to resume subscription')
      }
    } catch (err) {
      setSubscriptionError(err instanceof Error ? err.message : 'Failed to resume subscription')
    } finally {
      setIsSubscriptionLoading(false)
    }
  }

  const handleCancelSubscription = async (cancelAtCycleEnd: boolean) => {
    try {
      setIsSubscriptionLoading(true)
      setSubscriptionError(null)
      const response = await cancelSubscription(cancelAtCycleEnd)
      
      if (response.success) {
        setSubscriptionStatus(response.status)
        setSubscriptionDetails(prev => ({
          ...prev,
          valid_until: response.valid_until,
        }))
        setShowCancelConfirm(false)
        // Refresh subscription status to ensure UI is in sync
        await fetchSubscriptionStatus()
      } else {
        throw new Error(response.message || 'Failed to cancel subscription')
      }
    } catch (err) {
      setSubscriptionError(err instanceof Error ? err.message : 'Failed to cancel subscription')
    } finally {
      setIsSubscriptionLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#F2F0E0]">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        <motion.div
          key="orders"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header Button */}
          <div className="flex items-center justify-center mb-6">
            <div className="px-6 py-3 rounded-full bg-[#7CB58D] border border-[#1E3F2B] text-[#1E3F2B] text-sm tracking-tighter font-bold"
              style={{ fontFamily: "var(--font-lexend-exa), sans-serif" }}
            >
              Orders & Subscriptions
            </div>
          </div>

          {/* Subscription Section */}
          <div className="mb-8 flex flex-col items-center justify-center">
            <h2 className="md:text-xl text-lg font-Medium tracking-tight text-[#3D2D1F] mb-6">Subscription</h2>
           
            {subscriptionError && (
              <div className="mb-4 p-3 bg-red-50/80 border border-red-200/60 rounded-lg text-red-700 text-xs">
                {subscriptionError}
              </div>
            )}

            {/* Subscription Buttons */}
           

            {/* Manage Subscription Section */}
           
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >

                {/* Card */}
                <div className="bg-white rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] px-6 py-6 mt-0">
                  {/* Top Row: Current Plan with Status */}
                  <div className="flex items-center justify-between mb-4 tracking-tight">
                    <p className="text-sm font-semibold text-[#3D2D1F]">Current Plan</p>
                    {!subscriptionStatus || subscriptionStatus === 'inactive' ? (
                      <button
                        onClick={() => setIsActiveToggle(!isActiveToggle)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border capitalize transition-all duration-200 ${
                          isActiveToggle
                            ? 'bg-green-100 text-green-600 border-green-400'
                            : 'bg-slate-200 text-slate-700 border-slate-400'
                        }`}
                      >
                        {isActiveToggle ? 'active' : 'inactive'}
                      </button>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${
                        subscriptionStatus === 'active' 
                          ? 'bg-green-100 text-green-600 border-green-400'
                          : subscriptionStatus === 'paused'
                          ? 'bg-yellow-100 text-yellow-700 border-yellow-400'
                          : subscriptionStatus === 'created'
                          ? 'bg-orange-100 text-orange-600 border-orange-400'
                          : subscriptionStatus === 'cancelled'
                          ? 'bg-red-100 text-red-600 border-red-400'
                          : 'bg-slate-200 text-slate-700 border-slate-400'
                      }`}>
                        {subscriptionStatus}
                      </span>
                    )}
                  </div>

                  {/* Plan Description */}
                  <div className="mb-6">
                    <p className="text-sm text-[#3D2D1F]">
                      Personalized skincare treatment with prescription-strength ingredients, delivered monthly for 6 months.
                    </p>
                  </div>

                  {/* Subscription Details - Four Field Layout */}
                  <div className="flex flex-wrap gap-8 mb-6">
                    {/* Plan Started on */}
                    <div className="flex flex-col">
                      <p className="text-sm text-[#3D2D1F] mb-1">Plan Started:</p>
                      <p className="text-sm font-semibold text-[#3D2D1F]">
                        {subscriptionDetails?.start_date ? formatDate(subscriptionDetails.start_date) : 'TBD'}
                      </p>
                    </div>

                    {/* Plan Ends on */}
                    <div className="flex flex-col">
                      <p className="text-sm text-[#3D2D1F] mb-1">Plan Ends:</p>
                      <p className="text-sm font-semibold text-[#3D2D1F]">
                        {subscriptionDetails?.final_end_date 
                          ? formatDate(subscriptionDetails.final_end_date) 
                          : subscriptionDetails?.plan_ends
                            ? formatTimestamp(subscriptionDetails.plan_ends)
                            : 'TBD'}
                      </p>
                    </div>

                    {/* Next Delivery */}
                    <div className="flex flex-col">
                      <p className="text-sm text-[#3D2D1F] mb-1">Next Delivery:</p>
                      <p className="text-sm font-semibold text-[#3D2D1F]">
                        {subscriptionDetails?.next_billing
                          ? (typeof subscriptionDetails.next_billing === 'number'
                              ? formatTimestamp(subscriptionDetails.next_billing)
                              : formatDate(subscriptionDetails.next_billing))
                          : 'TBD'}
                      </p>
                    </div>

                    {/* Subscription ID */}
                    <div className="flex flex-col">
                      <p className="text-sm text-[#3D2D1F] mb-1">Subscription ID:</p>
                      <p className="text-sm font-semibold text-[#3D2D1F]">
                        {subscriptionDetails?.subscription_id 
                          ? `#${subscriptionDetails.subscription_id}` 
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {!showCancelConfirm ? (
                    (!subscriptionStatus || subscriptionStatus === 'inactive') && !isActiveToggle ? (
                      <div className="pt-4 border-t border-[#CBBEAD]/40">
                        <button
                          onClick={handleStartSubscription}
                          disabled={isSubscriptionLoading}
                          className="w-full px-4 py-2.5 text-sm font-semibold text-[#1E3F2B] bg-[#7CB58D]/20 border border-[#1E3F2B] rounded-full hover:bg-[#7CB58D]/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Start your Subscription now
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#CBBEAD]/40">
                        {subscriptionStatus === 'paused' ? (
                          <button
                            onClick={handleResumeSubscription}
                            disabled={isSubscriptionLoading}
                            className="px-4 py-2.5 text-sm font-semibold text-[#1E3F2B] bg-[#7CB58D]/20 border border-[#1E3F2B] rounded-full hover:bg-[#7CB58D]/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Resume Subscription
                          </button>
                        ) : (
                          <button
                            onClick={handlePauseSubscription}
                            disabled={isSubscriptionLoading}
                            className="px-4 py-2.5 text-sm font-semibold text-[#1E3F2B] bg-[#7CB58D]/20 border border-[#1E3F2B] rounded-full hover:bg-[#7CB58D]/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Pause Plan
                          </button>
                        )}
                        <button
                          onClick={() => setShowCancelConfirm(true)}
                          disabled={isSubscriptionLoading}
                          className="px-4 py-2.5 text-sm font-semibold text-[#1E3F2B] bg-[#f01010]/20 border border-[#1E3F2B] rounded-full hover:bg-[#7CB58D]/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Stop Plan
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="pt-4 border-t border-[#CBBEAD]/40">
                      <p className="text-sm text-[#3D2D1F] mb-4">How would you like to stop your plan?</p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <button
                          onClick={() => handleCancelSubscription(true)}
                          disabled={isSubscriptionLoading}
                          className="px-4 py-2.5 text-sm font-semibold text-[#1E3F2B] bg-[#7CB58D]/20 border border-[#1E3F2B] rounded-full hover:bg-[#7CB58D]/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          End of Cycle
                        </button>
                        <button
                          onClick={() => handleCancelSubscription(false)}
                          disabled={isSubscriptionLoading}
                          className="px-4 py-2.5 text-sm font-semibold text-[#1E3F2B] bg-[#7CB58D]/20 border border-[#1E3F2B] rounded-full hover:bg-[#7CB58D]/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Stop Now
                        </button>
                      </div>
                      <button
                        onClick={() => setShowCancelConfirm(false)}
                        className="text-xs text-[#777] hover:text-[#3D2D1F] transition-colors"
                      >
                        ← Back
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            
          </div>

          {/* Orders Section */}
          <div className="mt-6">
            {/* Section Header */}
            <div className="flex items-center justify-center mb-6">
            <h2 className="md:text-xl text-lg font-Medium tracking-tight text-[#3D2D1F]">Orders</h2>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4 animate-pulse">
                {[1, 2].map((item) => (
                  <div key={item} className="h-48 bg-white rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD]" />
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="bg-white rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] px-6 py-8 text-center">
                <div className="text-red-600 text-sm tracking-tight">{error}</div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && orders.length === 0 && (
              <div className="bg-white rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] px-6 py-16 text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#E8E6DD] flex items-center justify-center">
                  <IconShoppingBag className="h-6 w-6 text-[#6B6B6B]" />
                </div>
                <p className="text-[#3D2D1F] text-base font-medium tracking-tight mb-2">No orders found</p>
                <p className="text-[#6B6B6B]/80 text-sm tracking-tight leading-relaxed max-w-[240px] mx-auto">Your orders will appear here once you make a purchase.</p>
              </div>
            )}

            {/* Orders List */}
            {!isLoading && !error && orders.length > 0 && (
              <div className="space-y-4">
                {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-3xl border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="px-6 py-5 border-[#CBBEAD]/20">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7CB58D]/10 to-[#7CB58D]/5 flex items-center justify-center flex-shrink-0">
                          <IconShoppingBag className="h-6 w-6 text-[#1E3F2B]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm md:text-base font-medium text-[#1E3F2B] mb-1 tracking-tight">
                            Order ID : {order.name || `Order #${order.shopify_order_id || order._id.slice(-6)}`}
                          </h3>
                          <div className="flex items-center justify-start gap-2 text-xs text-[#6B6B6B] tracking-tight">
                            <IconCalendar className="size-3 flex-shrink-0" />
                            <span>Placed on : {formatDate(order.order_date || order.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="px-6 py-5 space-y-4 -mt-4">
                
                   <span className="text-sm font-medium text-[#3D2D1F] mb-2">Delivering To:</span>
                    {/* Billing Address */}
                    {order.billing_address && (
                      <div className="pt-3 border-t border-[#CBBEAD]/20">
                        <div className="flex items-start gap-3">
                          <IconMapPin className="h-4 w-4 text-[#6B6B6B] mt-0.5 flex-shrink-0" />
                          <div className="text-xs text-[#6B6B6B] space-y-1 flex-1 tracking-tight">
                            <div className="font-Medium text-[#3D2D1F] text-sm mb-1">
                              {order.billing_address.first_name} {order.billing_address.last_name}
                            </div>
                            <div className="leading-relaxed">
                              {order.billing_address.address1}
                              {order.billing_address.address2 && `, ${order.billing_address.address2}`}
                              <br />
                              {order.billing_address.city}
                              {order.billing_address.province && `, ${order.billing_address.province}`}
                              {order.billing_address.zip && ` - ${order.billing_address.zip}`}
                              {order.billing_address.country && (
                                <>
                                  <br />
                                  {order.billing_address.country}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Order Status Link */}
                    {order.order_status_url && (
                      <div className="pt-2">
                        <a
                          href={order.order_status_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#7CB58D] hover:text-[#1E3F2B] font-medium transition-colors group tracking-tight"
                        >
                          <span>View Order Status</span>
                          <IconExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Orders


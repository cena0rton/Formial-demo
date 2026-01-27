'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { IconMapPin, IconLoader2, IconEdit } from '@tabler/icons-react'

export interface AddressComponents {
  flatFloor: string
  address1: string
  address2: string
  city: string
  state: string
  pincode: string
}

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onAddressSelect: (address: AddressComponents) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

interface GeoapifyFeature {
  properties: {
    formatted?: string
    address_line1?: string
    address_line2?: string
    street?: string
    housenumber?: string
    suburb?: string
    district?: string
    city?: string
    town?: string
    state?: string
    region?: string
    postcode?: string
    postal_code?: string
  }
}

const parseAddressComponents = (feature: GeoapifyFeature): AddressComponents => {
  const result: AddressComponents = {
    flatFloor: '', // User fills this manually
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  }

  if (!feature || !feature.properties) return result

  const props = feature.properties
  
  // Build address1 from street and house number
  const street = props.street || ''
  const housenumber = props.housenumber || ''
  
  if (housenumber && street) {
    result.address1 = `${housenumber} ${street}`.trim()
  } else if (street) {
    result.address1 = street
  } else if (props.address_line1) {
    result.address1 = props.address_line1
  } else if (props.formatted) {
    const parts = props.formatted.split(',')
    result.address1 = parts[0]?.trim() || ''
  }

  // Address2
  result.address2 = props.suburb || props.district || props.town || ''

  // City
  result.city = props.city || props.town || props.district || ''

  // State
  result.state = props.state || props.region || ''

  // Pincode
  result.pincode = props.postcode || props.postal_code || ''

  return result
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onAddressSelect,
  placeholder = 'Start typing your address...',
  disabled = false,
}) => {
  const [suggestions, setSuggestions] = useState<GeoapifyFeature[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY || ''

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch suggestions from Geoapify API
  const fetchSuggestions = useCallback(async (query: string) => {
    if (!apiKey) {
      setError('API key not configured')
      return
    }

    if (query.length < 3) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const encodedQuery = encodeURIComponent(query)
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedQuery}&filter=countrycode:in&limit=5&lang=en&apiKey=${apiKey}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }

      const data = await response.json()
      
      if (data.features && data.features.length > 0) {
        setSuggestions(data.features)
        setShowDropdown(true)
      } else {
        setSuggestions([])
        setShowDropdown(false)
      }
    } catch (err) {
      console.error('Error fetching address suggestions:', err)
      setError('Failed to fetch suggestions')
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [apiKey])

  // Handle input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Debounce API call (300ms)
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(newValue)
    }, 300)
  }

  // Handle suggestion selection
  const handleSelectSuggestion = (feature: GeoapifyFeature) => {
    const addressComponents = parseAddressComponents(feature)
    onAddressSelect(addressComponents)
    
    // Update input with address1 value
    onChange(addressComponents.address1 || feature.properties.formatted || '')
    
    setSuggestions([])
    setShowDropdown(false)
  }

  // Handle input focus
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowDropdown(true)
    }
  }

  if (!apiKey) {
    return (
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white pl-11 pr-5 py-3 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all"
            autoComplete="off"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 mt-1 flex items-center justify-center pointer-events-none">
            <IconMapPin className="h-5 w-5 text-[#6F5B4C]" />
          </div>
        </div>
        <p className="text-xs text-[#6B6B6B] mt-1 ml-2">
          Manual address entry (autocomplete unavailable)
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full rounded-3xl mt-2 border border-b-2 border-b-[#CBBEAD] border-[#CBBEAD] bg-white pl-11 pr-10 py-3 text-base text-[#3D2D1F] focus:outline-none focus:ring-2 focus:ring-[#7CB58D] transition-all disabled:opacity-60"
          autoComplete="off"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 mt-1 flex items-center justify-center pointer-events-none">
          <IconMapPin className="h-5 w-5 text-[#6F5B4C]" />
        </div>
        {/* Edit icon / Loading spinner on the right */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 flex items-center justify-center h-5 w-5 text-[#6F5B4C]">
          {isLoading ? (
            <IconLoader2 className="h-5 w-5 animate-spin" />
          ) : (
            <IconEdit className="h-5 w-5 hover:opacity-70 transition-opacity cursor-pointer" strokeWidth={2} onClick={() => inputRef.current?.focus()} />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 mt-1 bg-white border border-[#CBBEAD] rounded-xl shadow-lg overflow-hidden"
          style={{ zIndex: 9999 }}
        >
          {suggestions.map((feature, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSuggestion(feature)}
              className="w-full px-4 py-3 text-left text-sm text-[#3D2D1F] hover:bg-[#F8F6EE] border-b border-[#f3f4f6] last:border-b-0 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <IconMapPin className="h-4 w-4 text-[#7CB58D] mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{feature.properties.formatted}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600 mt-1 ml-2">{error}</p>
      )}

      <p className="text-xs text-[#6B6B6B] mt-1 ml-2">
        Start typing to search for your address
      </p>
    </div>
  )
}

export default AddressAutocomplete

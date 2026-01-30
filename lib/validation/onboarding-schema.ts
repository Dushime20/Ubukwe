// International phone number patterns
const PHONE_PATTERNS: Record<string, RegExp> = {
  rwanda: /^(\+250|0)[1-9]\d{8}$/,
  uganda: /^(\+256|0)[1-9]\d{8}$/,
  kenya: /^(\+254|0)[1-9]\d{8}$/,
  tanzania: /^(\+255|0)[1-9]\d{8}$/,
}

// Email validation (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Business name validation (alphanumeric, spaces, hyphens, apostrophes)
const BUSINESS_NAME_REGEX = /^[a-zA-Z0-9\s\-'&.]{2,100}$/

// City/Address validation
const LOCATION_REGEX = /^[a-zA-Z0-9\s\-',./]{2,100}$/

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export const validateBusinessName = (name: string): ValidationError | null => {
  if (!name || name.trim().length === 0) {
    return { field: "businessName", message: "Business name is required" }
  }
  if (name.trim().length < 2) {
    return { field: "businessName", message: "Business name must be at least 2 characters" }
  }
  if (name.trim().length > 100) {
    return { field: "businessName", message: "Business name must not exceed 100 characters" }
  }
  if (!BUSINESS_NAME_REGEX.test(name)) {
    return { field: "businessName", message: "Business name contains invalid characters" }
  }
  return null
}

export const validateBusinessType = (type: string): ValidationError | null => {
  const validTypes = ["sole-proprietor", "partnership", "llc", "corporation", "individual"]
  if (!type || type.trim().length === 0) {
    return { field: "businessType", message: "Business type is required" }
  }
  if (!validTypes.includes(type)) {
    return { field: "businessType", message: "Invalid business type selected" }
  }
  return null
}

export const validateYearsExperience = (years: string): ValidationError | null => {
  const validOptions = ["0-1", "2-5", "6-10", "11+"]
  if (!years || years.trim().length === 0) {
    return { field: "yearsExperience", message: "Years of experience is required" }
  }
  if (!validOptions.includes(years)) {
    return { field: "yearsExperience", message: "Invalid experience level selected" }
  }
  return null
}

export const validateServiceCategories = (categories: string[]): ValidationError | null => {
  if (!categories || categories.length === 0) {
    return { field: "serviceCategories", message: "Select at least one service category" }
  }
  if (categories.length > 10) {
    return { field: "serviceCategories", message: "Maximum 10 service categories allowed" }
  }

  const validCategories = ["Photography", "Venue", "Catering", "Music", "Decoration", "Transportation", "MC Services", "Dance", "Other"]
  for (const cat of categories) {
    if (cat.length > 50) {
      return { field: "serviceCategories", message: `Category "${cat}" is too long (max 50 characters)` }
    }
    if (!/^[a-zA-Z0-9\s\-&.]{1,50}$/.test(cat)) {
      return { field: "serviceCategories", message: `Category "${cat}" contains invalid characters` }
    }
  }
  return null
}

export const validateDescription = (description: string): ValidationError | null => {
  if (!description || description.trim().length === 0) {
    return { field: "description", message: "Business description is required" }
  }
  if (description.trim().length < 20) {
    return { field: "description", message: "Description must be at least 20 characters" }
  }
  if (description.length > 500) {
    return { field: "description", message: "Description must not exceed 500 characters" }
  }
  return null
}

export const validateEmail = (email: string): ValidationError | null => {
  if (!email || email.trim().length === 0) {
    return { field: "email", message: "Email address is required" }
  }
  if (!EMAIL_REGEX.test(email)) {
    return { field: "email", message: "Please enter a valid email address" }
  }
  if (email.length > 254) {
    return { field: "email", message: "Email address is too long" }
  }
  return null
}

export const validatePhone = (phone: string, country: string): ValidationError | null => {
  if (!phone || phone.trim().length === 0) {
    return { field: "phone", message: "Phone number is required" }
  }

  const pattern = PHONE_PATTERNS[country]
  if (!pattern) {
    return { field: "phone", message: "Country not supported for phone validation" }
  }

  const cleanPhone = phone.replace(/\s/g, "")
  if (!pattern.test(cleanPhone)) {
    return { field: "phone", message: `Invalid phone number for ${country}. Expected format: +250 XXX XXX XXX` }
  }
  return null
}

export const validateAddress = (address: string): ValidationError | null => {
  if (!address || address.trim().length === 0) {
    return { field: "address", message: "Street address is required" }
  }
  if (address.trim().length < 5) {
    return { field: "address", message: "Address must be at least 5 characters" }
  }
  if (address.length > 100) {
    return { field: "address", message: "Address must not exceed 100 characters" }
  }
  if (!LOCATION_REGEX.test(address)) {
    return { field: "address", message: "Address contains invalid characters" }
  }
  return null
}

export const validateCity = (city: string): ValidationError | null => {
  if (!city || city.trim().length === 0) {
    return { field: "city", message: "City is required" }
  }
  if (city.trim().length < 2) {
    return { field: "city", message: "City must be at least 2 characters" }
  }
  if (city.length > 50) {
    return { field: "city", message: "City must not exceed 50 characters" }
  }
  if (!LOCATION_REGEX.test(city)) {
    return { field: "city", message: "City contains invalid characters" }
  }
  return null
}

export const validateCountry = (country: string): ValidationError | null => {
  const validCountries = ["rwanda", "uganda", "kenya", "tanzania"]
  if (!country || country.trim().length === 0) {
    return { field: "country", message: "Country is required" }
  }
  if (!validCountries.includes(country)) {
    return { field: "country", message: "Invalid country selected" }
  }
  return null
}

export const validateFile = (
  file: File | null,
  fieldName: string,
  maxSizeMB: number = 5,
  allowedTypes: string[] = ["image/jpeg", "image/png", "application/pdf"]
): ValidationError | null => {
  if (!file) {
    return { field: fieldName, message: `${fieldName} is required` }
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return { field: fieldName, message: `File size must not exceed ${maxSizeMB}MB` }
  }

  if (!allowedTypes.includes(file.type)) {
    return { field: fieldName, message: `Invalid file type. Allowed: ${allowedTypes.join(", ")}` }
  }

  return null
}

export const validatePortfolio = (files: File[]): ValidationError | null => {
  if (!files || files.length === 0) {
    return { field: "portfolio", message: "Portfolio is required" }
  }
  if (files.length < 3) {
    return { field: "portfolio", message: "Upload at least 3 portfolio items" }
  }
  if (files.length > 10) {
    return { field: "portfolio", message: "Maximum 10 portfolio items allowed" }
  }

  for (const file of files) {
    const error = validateFile(file, "portfolio", 5, ["image/jpeg", "image/png", "application/pdf"])
    if (error) return error
  }

  return null
}

export const validateStep1 = (data: {
  businessName: string
  businessType: string
  yearsExperience: string
}): ValidationResult => {
  const errors: ValidationError[] = []

  const nameError = validateBusinessName(data.businessName)
  if (nameError) errors.push(nameError)

  const typeError = validateBusinessType(data.businessType)
  if (typeError) errors.push(typeError)

  const experienceError = validateYearsExperience(data.yearsExperience)
  if (experienceError) errors.push(experienceError)

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateStep2 = (data: {
  serviceCategories: string[]
  description: string
}): ValidationResult => {
  const errors: ValidationError[] = []

  const categoriesError = validateServiceCategories(data.serviceCategories)
  if (categoriesError) errors.push(categoriesError)

  const descriptionError = validateDescription(data.description)
  if (descriptionError) errors.push(descriptionError)

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateStep3 = (data: {
  phone: string
  email: string
  address: string
  city: string
  country: string
}): ValidationResult => {
  const errors: ValidationError[] = []

  const emailError = validateEmail(data.email)
  if (emailError) errors.push(emailError)

  const phoneError = validatePhone(data.phone, data.country)
  if (phoneError) errors.push(phoneError)

  const addressError = validateAddress(data.address)
  if (addressError) errors.push(addressError)

  const cityError = validateCity(data.city)
  if (cityError) errors.push(cityError)

  const countryError = validateCountry(data.country)
  if (countryError) errors.push(countryError)

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateStep4 = (documents: {
  idDocument: File | null
  selfiePhoto: File | null
}): ValidationResult => {
  const errors: ValidationError[] = []

  const idError = validateFile(documents.idDocument, "National ID", 5, ["image/jpeg", "image/png"])
  if (idError) errors.push(idError)

  const selfieError = validateFile(documents.selfiePhoto, "Selfie Photo", 5, ["image/jpeg", "image/png"])
  if (selfieError) errors.push(selfieError)

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateStep5 = (documents: {
  businessLicense: File | null
  portfolio: File[]
}): ValidationResult => {
  const errors: ValidationError[] = []

  const licenseError = validateFile(documents.businessLicense, "Business License", 5, ["image/jpeg", "image/png", "application/pdf"])
  if (licenseError) errors.push(licenseError)

  // Portfolio is now optional or removed from this step

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export interface IVisaCountry {
  id?: number
  isActive?: boolean
  organization?: string
  createdAt?: string
  updatedAt?: string
  title?: string
  code?: string
  slug?: string
  flag?: string
  continent?: string
  visaMethod?: string
  orderPriority?: number
  isFeatured?: boolean
  isPageActive?: boolean
  createdById?: number | null
  updatedById?: number
}

export interface IVisaCategory {
  id?: number
  isActive?: boolean
  organization?: string
  createdAt?: Date
  updatedAt?: Date
  title?: string
  slug?: string
  code?: string
  icon?: null
  totalValidity?: string
  periodOfStay?: string
  embassyProcessingTime?: null | string
  createdById?: null
  updatedById?: number
}

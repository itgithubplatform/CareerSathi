export type JobType = {
  id: string
  title: string
  redirect_url: string
  adref: string
  description: string
  contract_time?: string
  contract_type?: string
  salary_min?: number
  salary_max?: number
  salary_is_predicted?: string
  created: string
  __CLASS__?: string
  location?: Record<string, any>
  category?: Record<string, any>
  company?: Record<string, any>
  latitude?: number
  longitude?: number
}

export type JobArray = JobType[]
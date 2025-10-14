export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cities: {
        Row: {
          id: string
          name: string
          slug: string
          zones: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          zones?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          zones?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          trade: string
          name: string
          slug: string
          description: string | null
          unit: string
          base_price: number
          rules_json: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trade: string
          name: string
          slug: string
          description?: string | null
          unit: string
          base_price: number
          rules_json?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trade?: string
          name?: string
          slug?: string
          description?: string | null
          unit?: string
          base_price?: number
          rules_json?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      city_prices: {
        Row: {
          id: string
          city_id: string
          service_id: string
          overrides_json: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          city_id: string
          service_id: string
          overrides_json?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          city_id?: string
          service_id?: string
          overrides_json?: Json
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          role: 'client' | 'pro' | 'admin'
          full_name: string
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'client' | 'pro' | 'admin'
          full_name: string
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'client' | 'pro' | 'admin'
          full_name?: string
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pros: {
        Row: {
          id: string
          user_id: string
          trades: string[]
          zones: string[]
          city_ids: string[]
          kyc_status: 'pending' | 'approved' | 'rejected'
          kyc_notes: string | null
          rating: number
          review_count: number
          completion_rate: number
          bio: string | null
          certifications: Json
          portfolio_photos: string[]
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          trades?: string[]
          zones?: string[]
          city_ids?: string[]
          kyc_status?: 'pending' | 'approved' | 'rejected'
          kyc_notes?: string | null
          rating?: number
          review_count?: number
          completion_rate?: number
          bio?: string | null
          certifications?: Json
          portfolio_photos?: string[]
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          trades?: string[]
          zones?: string[]
          city_ids?: string[]
          kyc_status?: 'pending' | 'approved' | 'rejected'
          kyc_notes?: string | null
          rating?: number
          review_count?: number
          completion_rate?: number
          bio?: string | null
          certifications?: Json
          portfolio_photos?: string[]
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          user_id: string
          city_id: string
          service_id: string
          scope_text: string
          inputs_json: Json
          photos: string[]
          address: string
          zone: string
          status: 'draft' | 'pending_quotes' | 'quoted' | 'booked' | 'in_progress' | 'completed' | 'cancelled'
          preferred_date: string | null
          urgency: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          city_id: string
          service_id: string
          scope_text: string
          inputs_json?: Json
          photos?: string[]
          address: string
          zone: string
          status?: 'draft' | 'pending_quotes' | 'quoted' | 'booked' | 'in_progress' | 'completed' | 'cancelled'
          preferred_date?: string | null
          urgency?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          city_id?: string
          service_id?: string
          scope_text?: string
          inputs_json?: Json
          photos?: string[]
          address?: string
          zone?: string
          status?: 'draft' | 'pending_quotes' | 'quoted' | 'booked' | 'in_progress' | 'completed' | 'cancelled'
          preferred_date?: string | null
          urgency?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          job_id: string
          pro_id: string
          amount: number
          breakdown_json: Json
          notes: string | null
          expires_at: string
          accepted_at: string | null
          rejected_at: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          pro_id: string
          amount: number
          breakdown_json?: Json
          notes?: string | null
          expires_at: string
          accepted_at?: string | null
          rejected_at?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          pro_id?: string
          amount?: number
          breakdown_json?: Json
          notes?: string | null
          expires_at?: string
          accepted_at?: string | null
          rejected_at?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          quote_id: string
          scheduled_at: string
          escrow_amount: number
          total_amount: number
          payment_status: 'pending' | 'paid' | 'refunded' | 'failed'
          release_status: 'held' | 'released' | 'disputed'
          payment_id: string | null
          payment_method: string | null
          before_photos: string[]
          after_photos: string[]
          completed_at: string | null
          checklist_json: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          quote_id: string
          scheduled_at: string
          escrow_amount: number
          total_amount: number
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed'
          release_status?: 'held' | 'released' | 'disputed'
          payment_id?: string | null
          payment_method?: string | null
          before_photos?: string[]
          after_photos?: string[]
          completed_at?: string | null
          checklist_json?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quote_id?: string
          scheduled_at?: string
          escrow_amount?: number
          total_amount?: number
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed'
          release_status?: 'held' | 'released' | 'disputed'
          payment_id?: string | null
          payment_method?: string | null
          before_photos?: string[]
          after_photos?: string[]
          completed_at?: string | null
          checklist_json?: Json
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          rating: number
          comment: string | null
          photos: string[]
          response: string | null
          responded_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          rating: number
          comment?: string | null
          photos?: string[]
          response?: string | null
          responded_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          rating?: number
          comment?: string | null
          photos?: string[]
          response?: string | null
          responded_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          resource_type: string
          resource_id: string | null
          details: Json
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          resource_type: string
          resource_id?: string | null
          details?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          resource_type?: string
          resource_id?: string | null
          details?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          data: Json
          read_at: string | null
          sent_whatsapp: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          message: string
          data?: Json
          read_at?: string | null
          sent_whatsapp?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          message?: string
          data?: Json
          read_at?: string | null
          sent_whatsapp?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'client' | 'pro' | 'admin'
      kyc_status: 'pending' | 'approved' | 'rejected'
      job_status: 'draft' | 'pending_quotes' | 'quoted' | 'booked' | 'in_progress' | 'completed' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'refunded' | 'failed'
      release_status: 'held' | 'released' | 'disputed'
    }
  }
}


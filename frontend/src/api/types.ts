// Reference Types
export interface Reference {
  id: string;
  name: string;
  websiteUrl?: string;
  logoUrl?: string;
  industry?: string;
  description?: string;
  displayOrder?: number;
  createdAt: string;
}

export interface CreateReferenceRequest {
  name: string;
  websiteUrl?: string;
  industry?: string;
  description?: string;
  displayOrder?: number;
}

// Gallery Types
export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category?: 'Milling' | 'Turning' | 'Parts' | 'Factory';
  description?: string;
  displayOrder?: number;
  createdAt: string;
}

export interface CreateGalleryItemRequest {
  title: string;
  category?: string;
  description?: string;
  displayOrder?: number;
}

// Contact Types
export interface ContactMessage {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  attachmentUrl?: string;
  attachmentFilename?: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateContactRequest {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  referenceId?: string;
}

// Error Types
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: Record<string, string>;
}

// API Response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

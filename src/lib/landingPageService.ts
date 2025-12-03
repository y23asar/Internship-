import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  type DocumentData,
  type QuerySnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { getFirestore } from "./firebaseClient";

// Types
export interface LandingStats {
  activeLearners: number;
  courses: number;
  codingChallenges: number;
  expertInstructors: number;
  lastUpdated: Timestamp;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  featured?: boolean;
  createdAt: Timestamp;
  approved?: boolean;
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: Timestamp;
  source?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  subject?: string;
  submittedAt: Timestamp;
}

// Firestore collections
const COLLECTIONS = {
  STATS: "landingStats",
  TESTIMONIALS: "testimonials",
  NEWSLETTER: "newsletterSubscriptions",
  CONTACT: "contactSubmissions",
} as const;

/**
 * Fetch landing page statistics
 */
export const getLandingStats = async (): Promise<LandingStats | null> => {
  try {
    const db = getFirestore();
    const statsDoc = await getDoc(doc(db, COLLECTIONS.STATS, "current"));
    
    if (statsDoc.exists()) {
      return statsDoc.data() as LandingStats;
    }
    
    // Return default stats if not found
    return {
      activeLearners: 10000,
      courses: 500,
      codingChallenges: 1000,
      expertInstructors: 50,
      lastUpdated: Timestamp.now(),
    };
  } catch (error) {
    console.error("Error fetching landing stats:", error);
    // Return fallback stats
    return {
      activeLearners: 10000,
      courses: 500,
      codingChallenges: 1000,
      expertInstructors: 50,
      lastUpdated: Timestamp.now(),
    };
  }
};

/**
 * Fetch all approved testimonials
 */
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, COLLECTIONS.TESTIMONIALS),
      where("approved", "==", true),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Testimonial[];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

/**
 * Fetch featured testimonial
 */
export const getFeaturedTestimonial = async (): Promise<Testimonial | null> => {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, COLLECTIONS.TESTIMONIALS),
      where("featured", "==", true),
      where("approved", "==", true),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      } as Testimonial;
    }
    return null;
  } catch (error) {
    console.error("Error fetching featured testimonial:", error);
    return null;
  }
};

/**
 * Subscribe to newsletter
 */
export const subscribeToNewsletter = async (
  email: string,
  source: string = "landing-page"
): Promise<{ success: boolean; message: string }> => {
  try {
    const db = getFirestore();
    
    // Check if email already exists
    const existingQuery = query(
      collection(db, COLLECTIONS.NEWSLETTER),
      where("email", "==", email),
      limit(1)
    );
    const existing = await getDocs(existingQuery);
    
    if (!existing.empty) {
      return {
        success: false,
        message: "This email is already subscribed.",
      };
    }
    
    // Add new subscription
    await addDoc(collection(db, COLLECTIONS.NEWSLETTER), {
      email,
      source,
      subscribedAt: serverTimestamp(),
    });
    
    return {
      success: true,
      message: "Successfully subscribed to newsletter!",
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    };
  }
};

/**
 * Submit contact form
 */
export const submitContactForm = async (
  data: Omit<ContactSubmission, "submittedAt">
): Promise<{ success: boolean; message: string }> => {
  try {
    const db = getFirestore();
    
    await addDoc(collection(db, COLLECTIONS.CONTACT), {
      ...data,
      submittedAt: serverTimestamp(),
    });
    
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
};

/**
 * Track landing page view (analytics)
 */
export const trackLandingPageView = async (): Promise<void> => {
  try {
    const db = getFirestore();
    await addDoc(collection(db, "analytics"), {
      event: "landing_page_view",
      timestamp: serverTimestamp(),
      path: "/",
      userAgent: navigator.userAgent,
    });
  } catch (error) {
    console.error("Error tracking landing page view:", error);
    // Fail silently for analytics
  }
};

/**
 * Track CTA click (analytics)
 */
export const trackCTAClick = async (ctaType: string): Promise<void> => {
  try {
    const db = getFirestore();
    await addDoc(collection(db, "analytics"), {
      event: "cta_click",
      ctaType,
      timestamp: serverTimestamp(),
      path: "/",
    });
  } catch (error) {
    console.error("Error tracking CTA click:", error);
    // Fail silently for analytics
  }
};


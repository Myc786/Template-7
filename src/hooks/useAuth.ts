import { useUser } from "@clerk/nextjs";

// Define a User type
export interface User {
  id: string;
  name: string;
  email: string;
}

// A Clerk-based authentication hook
export default function useAuth() {
  const { user, isLoaded } = useUser();

  return { 
    user: user ? {
      id: user.id,
      name: user.fullName || user.username || 'User',
      email: user.primaryEmailAddress?.emailAddress || ''
    } : null,
    loading: !isLoaded
  };
}

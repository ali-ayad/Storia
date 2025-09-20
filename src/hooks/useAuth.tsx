import { useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"

function hasTokenCookie(): boolean {
  if (typeof document === "undefined") return false
  return document.cookie.split(";").some((c) => c.trim().startsWith("token="))
}

export function useAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const authenticated = hasTokenCookie()
    setIsAuthenticated(authenticated)
    
    if (!authenticated) {
      router.replace("/auth/login")
    }
  }, [router])

  return {
    isAuthenticated,
    isLoading: isAuthenticated === null
  }
}

/**
 * Wrap your protected content with this.
 * Example: <AuthGuard><DashboardPage /></AuthGuard>
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

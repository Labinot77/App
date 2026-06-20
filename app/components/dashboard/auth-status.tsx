"use client"

import { useUser } from "@/lib/use-user"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function AuthStatus() {
  const { user, loading, isLoggedIn } = useUser()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <span className="flex items-center gap-2 text-xs text-zinc-400">
        <span className="size-1.5 rounded-full bg-zinc-300 animate-pulse" />
        Checking…
      </span>
    )
  }

  if (!isLoggedIn) {
    return (
      <a
        href="/login"
        className="flex items-center gap-2 text-xs text-red-500 hover:text-red-600 transition-colors"
      >
        <span className="size-1.5 rounded-full bg-red-500" />
        Not logged in — sign in
      </a>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 text-xs text-emerald-600">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        {user?.email}
      </span>
      <button
        onClick={handleLogout}
        className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
      >
        Log out
      </button>
    </div>
  )
}
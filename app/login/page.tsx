"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <p className="text-zinc-600">Check your email for a login link.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full max-w-xs">
        <Input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-zinc-300 rounded-lg px-3 py-2"
        />
        <Button type="submit" className="bg-zinc-900 text-white rounded-lg py-2">
          Send magic link
        </Button>
      </form>
    </div>
  )
}
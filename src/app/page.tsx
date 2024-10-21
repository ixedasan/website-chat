'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Brain,
  Globe,
  Heart,
  History,
  MessageSquare,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    try {
      const encodedUrl = url
        .split('//')
        .map(component => encodeURIComponent(component))

      await router.push(`/chat/${encodedUrl.join('/')}`)
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-grid-black/[0.02] absolute inset-0 -z-10" />

      <main className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <Brain className="h-12 w-12 text-primary" />
            <h2 className="text-xl font-semibold text-primary">
              Website Chat AI
            </h2>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground">
            Chat with Any Website Using
            <span className="text-primary"> AI Intelligence</span>
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
            Transform any website into an interactive knowledge base. Simply
            paste a URL and start having intelligent conversations about its
            content.
          </p>

          <form
            onSubmit={handleSubmit}
            className="relative mx-auto mb-16 max-w-2xl"
          >
            <div className="flex gap-3 rounded-lg bg-card p-2 shadow-lg">
              <Globe className="my-auto ml-2 h-6 w-6 text-muted-foreground" />
              <Input
                type="url"
                placeholder="Enter website URL (e.g., https://example.com)"
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  'Processing...'
                ) : (
                  <>
                    Start Chat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            <Card className="group transition-all duration-300 hover:shadow-lg">
              <CardHeader className="space-y-1">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  Advanced AI automatically analyzes website content to create a
                  comprehensive knowledge base for accurate responses.
                </p>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:shadow-lg">
              <CardHeader className="space-y-1">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Contextual Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  Get accurate, context-aware responses based on the actual
                  content of the website you&apos;re chatting about.
                </p>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:shadow-lg">
              <CardHeader className="space-y-1">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <History className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Conversation Memory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  Your chat history is preserved between sessions, allowing you
                  to continue conversations seamlessly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground">
            Ready to transform how you interact with web content?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of users who are already experiencing smarter web
            interactions.
          </p>
          <Button
            size="lg"
            onClick={() => document.querySelector('input')?.focus()}
          >
            Try It Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>

      <footer className="mt-20 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">
              Website Chat AI
            </span>
          </div>
          <p className="text-center text-muted-foreground">
            Harness the power of AI to interact with any website in a smarter
            way
          </p>
          <p className="py-4 text-center text-gray-500">
            Made with <Heart className="mb-1 inline-block text-primary" /> by{' '}
            <Link
              href="https://github.com/ixedasan"
              target="_blank"
              className="text-lg text-primary"
            >
              ixedasan
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

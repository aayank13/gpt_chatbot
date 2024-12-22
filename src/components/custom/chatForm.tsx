'use client'

import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { ArrowUpIcon, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { AutoResizeTextArea } from '@/components/custom/autoResizeTextArea'
import { ThemeToggle } from '@/components/custom/themeToggle'

export function ChatForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const { messages, input, setInput, append } = useChat({
    api: '/api/chat',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return
    void append({ content: input, role: 'user' })
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const header = (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-blue-500/30 to-cyan-500/30 blur-3xl" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-20 text-center">
        <div className="rounded-full bg-background/50 p-3 backdrop-blur">
          <Bot size={24} />
        </div>
        <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-stone-500">
          AI Chatbot
        </h1>
        <p className="max-w-md text-muted-foreground">
          This is an AI chatbot app built with{' '}
          <span className="text-foreground">Next.js</span>, the{' '}
          <span className="text-foreground">Vercel AI SDK</span>, and{' '}
          <span className="text-foreground">OpenAI</span>.
        </p>
      </div>
    </div>
  )

  return (
    <main
      className={cn(
        'mx-auto flex h-svh w-full max-w-4xl flex-col items-stretch',
        className
      )}
      {...props}
    >
      <header className="sticky top-0 z-50 border-b bg-background/50 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <span className="font-semibold">AI Chat</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        {messages.length ? (
          <div className="flex flex-col gap-4 p-4">
            {messages.map((message, index) => (
              <Card
                key={index}
                className={cn(
                  'flex w-max max-w-[80%] items-start gap-3 px-4 py-3',
                  message.role === 'user' && 'ml-auto'
                )}
              >
                {message.role === 'assistant' ? (
                  <Bot className="mt-1 h-4 w-4 shrink-0" />
                ) : (
                  <User className="mt-1 h-4 w-4 shrink-0" />
                )}
                <p className="text-sm">{message.content}</p>
              </Card>
            ))}
          </div>
        ) : (
          header
        )}
      </div>

      <div className="border-t bg-background p-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl items-center gap-4"
        >
          <Card className="relative flex flex-1 items-center">
            <AutoResizeTextArea
              onKeyDown={handleKeyDown}
              onChange={setInput}
              value={input}
              placeholder="Send a message..."
              className="min-h-12 w-full resize-none bg-transparent px-4 py-3 focus:outline-none"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim()}
                  className="absolute right-2 h-8 w-8"
                >
                  <ArrowUpIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </Card>
        </form>
      </div>
    </main>
  )
}

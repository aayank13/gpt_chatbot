"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { ArrowUpIcon, Bot, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AutoResizeTextArea } from "@/components/custom/autoResizeTextArea";
import { ThemeToggle } from "@/components/custom/themeToggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatContent } from "./formatContent";

export function ChatForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [error, setError] = useState<string | null>(null);
  const { messages, input, setInput, append, isLoading } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("Chat error:", err);
      setError(err.message || "An unexpected error occurred");
    },
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const message = input.trim();
    if (!message) return;
    setInput("");
    try {
      await append({
        content: message,
        role: "user",
      });
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

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
          This is an AI chatbot app built with{" "}
          <span className="text-foreground">Next.js</span>, the{" "}
          <span className="text-foreground">Vercel AI SDK</span>, and{" "}
          <span className="text-foreground">OpenAI</span>.
        </p>
      </div>
    </div>
  );

  return (
    <main
      className={cn(
        "mx-auto flex h-svh w-full max-w-4xl flex-col items-stretch",
        className
      )}
      {...props}
    >
      <AlertDialog open={!!error} onOpenChange={() => setError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Error
            </AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Dismiss</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <header className="sticky top-0 z-50 border-b bg-background/50 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <span className="font-semibold">AI Chat</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div ref={chatContainerRef} className="flex-1 overflow-auto">
        {messages.length ? (
          <div className="flex flex-col gap-4 p-4">
            {messages.map((message, index) => (
              <Card
                key={index}
                className={cn(
                  "flex w-max max-w-[80%] items-start gap-3 px-4 py-3",
                  message.role === "user" ? "ml-auto" : "mr-auto"
                )}
              >
                {message.role === "assistant" ? (
                  <Bot className="mt-1 h-4 w-4 shrink-0" />
                ) : (
                  <User className="mt-1 h-4 w-4 shrink-0" />
                )}
                <div className="text-sm whitespace-pre-wrap">
                  {formatContent(message.content)}
                </div>
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
              onChange={(value) => setInput(value)}
              value={input}
              placeholder="Send a message..."
              className="min-h-12 w-full resize-none bg-transparent px-4 py-3 focus:outline-none"
              disabled={isLoading}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
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
  );
}
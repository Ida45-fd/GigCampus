"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Send, Paperclip, ImageIcon, FileText, Download, Phone, Video, MoreVertical } from "lucide-react"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const chats = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/asian-female-student.jpg",
      university: "Stanford University",
      project: "Mobile App UI Design",
      lastMessage: "I've uploaded the wireframes for review",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      verified: true,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "/african-american-male-student.jpg",
      university: "UC Berkeley",
      project: "Website Development",
      lastMessage: "When can we schedule a call to discuss the requirements?",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      verified: true,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "/latina-female-student.jpg",
      university: "NYU",
      project: "Social Media Content",
      lastMessage: "Here are the content ideas for this week",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      verified: true,
    },
  ]

  const sampleMessages = [
    {
      id: 1,
      sender: "Sarah Chen",
      content: "Hi! Thanks for choosing me for the mobile app UI design project. I'm excited to work with you!",
      timestamp: "10:30 AM",
      type: "text",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content:
        "Great! I'm looking forward to seeing your designs. Do you have any initial questions about the project?",
      timestamp: "10:35 AM",
      type: "text",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Sarah Chen",
      content: "I've reviewed the brief and have a few questions. Could you clarify the target audience age range?",
      timestamp: "10:40 AM",
      type: "text",
      isOwn: false,
    },
    {
      id: 4,
      sender: "Sarah Chen",
      content: "",
      timestamp: "10:45 AM",
      type: "file",
      isOwn: false,
      file: {
        name: "wireframes_v1.pdf",
        size: "2.4 MB",
        type: "pdf",
      },
    },
    {
      id: 5,
      sender: "Sarah Chen",
      content: "I've uploaded the initial wireframes for your review. Let me know what you think!",
      timestamp: "10:45 AM",
      type: "text",
      isOwn: false,
    },
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now(),
      sender: "You",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      isOwn: true,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const newMessage = {
      id: Date.now(),
      sender: "You",
      content: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "file",
      isOwn: true,
      file: {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.type.includes("image") ? "image" : file.type.includes("pdf") ? "pdf" : "file",
      },
    }

    setMessages([...messages, newMessage])
  }

  const currentMessages = selectedChat ? sampleMessages : []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">Communicate with clients and freelancers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${
                        selectedChat?.id === chat.id ? "bg-primary/10 border-primary/20" : ""
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                            <AvatarFallback>
                              {chat.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">{chat.name}</p>
                            {chat.verified && (
                              <Badge variant="secondary" className="text-xs px-1 py-0">
                                ✓
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.project}</p>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                          {chat.unread > 0 && (
                            <Badge variant="destructive" className="text-xs mt-1">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                            <AvatarFallback>
                              {selectedChat.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {selectedChat.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{selectedChat.name}</h3>
                            {selectedChat.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{selectedChat.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {currentMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {msg.type === "text" ? (
                            <p className="text-sm">{msg.content}</p>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                {msg.file?.type === "image" && <ImageIcon className="h-4 w-4" />}
                                {msg.file?.type === "pdf" && <FileText className="h-4 w-4" />}
                                {msg.file?.type === "file" && <Paperclip className="h-4 w-4" />}
                                <div>
                                  <p className="text-sm font-medium">{msg.file?.name}</p>
                                  <p className="text-xs opacity-70">{msg.file?.size}</p>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="h-6 px-2">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          )}
                          <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} accept="*/*" />
                  </div>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a chat from the sidebar to start messaging</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

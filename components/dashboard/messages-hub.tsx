"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Mail,
  Clock,
  CheckCircle,
  Star,
  MoreVertical,
  Filter,
  Archive
} from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  senderRole: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
  type: 'text' | 'image' | 'file';
}

interface Conversation {
  id: string;
  vendorName: string;
  vendorAvatar?: string;
  vendorRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

export function MessagesHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const conversations: Conversation[] = [
    {
      id: "1",
      vendorName: "Intore Cultural Group",
      vendorRole: "Entertainment",
      lastMessage: "Thank you for choosing us! We'll send the performance details soon.",
      lastMessageTime: "2 hours ago",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: "1",
          sender: "Intore Cultural Group",
          senderRole: "Entertainment",
          content: "Hello! Thank you for your interest in our traditional dance services.",
          timestamp: "2024-01-15 10:30",
          isRead: true,
          type: 'text'
        },
        {
          id: "2",
          sender: "You",
          senderRole: "Customer",
          content: "Hi! We'd like to book your Intore dancers for our wedding on March 15th.",
          timestamp: "2024-01-15 10:35",
          isRead: true,
          type: 'text'
        },
        {
          id: "3",
          sender: "Intore Cultural Group",
          senderRole: "Entertainment",
          content: "That's wonderful! We have availability on March 15th. Our package includes 8 dancers, traditional costumes, and cultural music. The cost is 150,000 RWF.",
          timestamp: "2024-01-15 10:40",
          isRead: true,
          type: 'text'
        },
        {
          id: "4",
          sender: "You",
          senderRole: "Customer",
          content: "Perfect! Can you send me more details about the performance duration and setup requirements?",
          timestamp: "2024-01-15 10:45",
          isRead: true,
          type: 'text'
        },
        {
          id: "5",
          sender: "Intore Cultural Group",
          senderRole: "Entertainment",
          content: "Thank you for choosing us! We'll send the performance details soon.",
          timestamp: "2 hours ago",
          isRead: false,
          type: 'text'
        }
      ]
    },
    {
      id: "2",
      vendorName: "Kigali Serena Hotel",
      vendorRole: "Venue",
      lastMessage: "Your venue booking is confirmed for March 15th.",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "1",
          sender: "Kigali Serena Hotel",
          senderRole: "Venue",
          content: "Your venue booking is confirmed for March 15th.",
          timestamp: "1 day ago",
          isRead: true,
          type: 'text'
        }
      ]
    },
    {
      id: "3",
      vendorName: "Rwandan Delights Catering",
      vendorRole: "Food",
      lastMessage: "We can accommodate your dietary requirements.",
      lastMessageTime: "3 days ago",
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: "1",
          sender: "Rwandan Delights Catering",
          senderRole: "Food",
          content: "We can accommodate your dietary requirements.",
          timestamp: "3 days ago",
          isRead: false,
          type: 'text'
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.vendorRole.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || 
      (filterStatus === "unread" && conv.unreadCount > 0) ||
      (filterStatus === "online" && conv.isOnline);
    
    return matchesSearch && matchesFilter;
  });

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim() && currentConversation) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="h-[calc(100vh-200px)] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("unread")}
            >
              Unread
            </Button>
            <Button
              variant={filterStatus === "online" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("online")}
            >
              Online
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                selectedConversation === conversation.id ? "bg-muted" : ""
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={conversation.vendorAvatar} />
                    <AvatarFallback>{getInitials(conversation.vendorName)}</AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium truncate">{conversation.vendorName}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {conversation.vendorRole}
                    </Badge>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="default" className="text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentConversation.vendorAvatar} />
                    <AvatarFallback>{getInitials(currentConversation.vendorName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{currentConversation.vendorName}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {currentConversation.vendorRole}
                      </Badge>
                      {currentConversation.isOnline ? (
                        <div className="flex items-center space-x-1 text-xs text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Online</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Offline</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${message.sender === "You" ? "order-2" : "order-1"}`}>
                    {message.sender !== "You" && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {getInitials(message.sender)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{message.sender}</span>
                        <Badge variant="outline" className="text-xs">
                          {message.senderRole}
                        </Badge>
                      </div>
                    )}
                    
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === "You"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    <div className={`flex items-center space-x-2 mt-1 ${
                      message.sender === "You" ? "justify-end" : "justify-start"
                    }`}>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                      {message.sender === "You" && (
                        <div className="flex items-center space-x-1">
                          {message.isRead ? (
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                          ) : (
                            <Clock className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[40px] max-h-[120px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

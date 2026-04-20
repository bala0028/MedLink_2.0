"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Paperclip, Phone, Video, MoreVertical, X } from "lucide-react";
import { getContactsAction, getMessagesAction, sendMessageAction } from '@/app/actions/messages';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { format } from 'date-fns';

interface Contact {
  id: string;
  name: string;
  role: string;
  img: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
}

interface CurrentUser {
  id: string;
  name: string | null;
  email: string;
}

export default function MessagesPage() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isVideoActive, setIsVideoActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize DB Context
  useEffect(() => {
    async function init() {
      const res = await getContactsAction();
      if (res.success) {
        const contactsList = res.contacts || [];
        setContacts(contactsList);
        setCurrentUser(res.currentUser || null);
        if (contactsList.length > 0) setActiveContact(contactsList[0]);
      }
    }
    init();
  }, []);

  // Poll for messages with active contact
  useEffect(() => {
    if (!activeContact) return;

    async function loadMessages() {
      if (!activeContact) return;
      const res = await getMessagesAction(activeContact.id);
      if (res.success) {
        setMessages(res.messages || []);
      }
    }

    // Load immediately
    loadMessages();

    // Poll every 5 seconds for new messages
    const pollId = setInterval(loadMessages, 5000);
    return () => clearInterval(pollId);
  }, [activeContact]);

  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeContact || !currentUser) return;
    
    // Optimistic UI update
    const optimisticMsg: Message = {
      id: 'temp-' + Date.now(),
      senderId: currentUser.id,
      receiverId: activeContact.id,
      content: inputText,
      createdAt: new Date()
    };
    setMessages(prev => [...prev, optimisticMsg]);
    setInputText('');

    // Actual Backend Call
    await sendMessageAction(activeContact.id, optimisticMsg.content);
  };

  const getRoomName = () => {
    if (!currentUser || !activeContact) return 'MedLink-General-Room';
    // Deterministic room name based on sorted IDs
    const ids = [currentUser.id, activeContact.id].sort();
    return `MedLink-${ids[0]}-${ids[1]}`;
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
      {/* Sidebar for chat list */}
      <div className="w-80 border-r border-border/50 bg-background/50 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-border/50 bg-white">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 h-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          {contacts.map((contact, i) => (
            <div 
              key={contact.id} 
              onClick={() => { setActiveContact(contact); setIsVideoActive(false); }}
              className={`flex gap-3 p-4 cursor-pointer hover:bg-accent/50 transition-colors ${activeContact?.id === contact.id ? 'bg-blue-50/50 border-l-4 border-blue-600' : 'border-l-4 border-transparent'}`}
            >
              <Avatar className="h-12 w-12 border border-border/50 shadow-sm">
                <AvatarImage src={`https://i.pravatar.cc/150?img=${contact.img}`} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-sm truncate text-slate-800">{contact.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground truncate font-medium">{contact.role}</p>
              </div>
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">No contacts available.</div>
          )}
        </div>
      </div>

      {/* Main chat window */}
      {activeContact ? (
        <div className="flex-1 flex flex-col bg-[#f8fafc] relative">
          
          {/* Chat header */}
          <div className="h-16 border-b border-border/50 px-6 flex items-center justify-between bg-white z-20 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-slate-200">
                <AvatarImage src={`https://i.pravatar.cc/150?img=${activeContact.img}`} />
                <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm text-slate-800">{activeContact.name}</h3>
                <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Online
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                <Phone className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => setIsVideoActive(!isVideoActive)}
                variant={isVideoActive ? "default" : "ghost"} 
                size="icon" 
                className={`rounded-full transition-colors ${isVideoActive ? "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20" : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"}`}
              >
                {isVideoActive ? <X className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Core Viewer: Video vs Chat */}
          {isVideoActive ? (
            <div className="flex-1 w-full h-full bg-slate-900 absolute z-10 top-16 left-0 right-0 bottom-0 flex flex-col">
              <div className="flex items-center justify-between px-6 py-3 bg-slate-900 text-white border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-semibold tracking-wide">Secure Video Conference</span>
                </div>
                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">E2E Encrypted</span>
              </div>
              <div className="flex-1 w-full bg-black">
                <JitsiMeeting
                  domain="meet.jit.si"
                  roomName={getRoomName()}
                  configOverwrite={{
                    startWithAudioMuted: false,
                    disableModeratorIndicator: true,
                    startScreenSharing: true,
                    enableEmailInStats: false
                  }}
                  interfaceConfigOverwrite={{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    SHOW_JITSI_WATERMARK: false,
                  }}
                  userInfo={{
                    displayName: currentUser?.name || 'MedLink User',
                    email: currentUser?.email || ''
                  }}
                  onApiReady={(externalApi) => {
                    // Integration hook
                  }}
                  getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '100%';
                    iframeRef.style.width = '100%';
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              {/* Messages area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6 Scrollbar-hidden">
                {!messages || messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full opacity-50 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
                      <Send className="w-6 h-6 text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-500">No messages found. Start the conversation!</span>
                  </div>
                ) : (
                  messages.map((msg, i) => {
                    const isMe = msg.senderId === currentUser?.id;
                    const msgTime = new Date(msg.createdAt);
                    
                    return (
                      <div key={msg.id} className={`flex gap-3 max-w-[70%] ${isMe ? 'self-end flex-row-reverse' : ''}`}>
                        {!isMe && (
                          <Avatar className="h-8 w-8 mt-auto rounded-full border border-slate-200 shadow-sm shrink-0">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${activeContact.img}`} />
                            <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col gap-1">
                          <div className={`p-3.5 text-sm rounded-2xl shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'}`}>
                            <p className="leading-relaxed">{msg.content}</p>
                          </div>
                          <span className={`text-[10px] font-semibold text-slate-400 px-1 ${isMe ? 'text-right' : 'text-left'}`}>
                            {format(msgTime, 'h:mm a')}
                          </span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Input area */}
              <div className="p-4 bg-white border-t border-slate-200 flex gap-2 items-center">
                <Button variant="ghost" size="icon" className="shrink-0 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1 bg-[#f4f6f8] rounded-full flex items-center px-4 border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <Input 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleSendMessage() }}
                    placeholder={`Message ${activeContact.name}...`} 
                    className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent h-12 px-0 text-slate-700" 
                  />
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="shrink-0 rounded-full h-12 w-12 p-0 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 disabled:shadow-none"
                >
                  <Send className="h-5 w-5 -ml-0.5" />
                </Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#f8fafc]">
          <div className="text-center px-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Select a Conversation</h3>
            <p className="text-slate-500 max-w-[280px]">Choose a patient or doctor from the sidebar to view chat history and start messaging or video calling.</p>
          </div>
        </div>
      )}
    </div>
  );
}

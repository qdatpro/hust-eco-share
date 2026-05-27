'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, MessageCircle, Send, ChevronDown } from 'lucide-react'

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{role: string, text: string}[]>([])
  const [status, setStatus] = useState('idle')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input khi mở chat
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const handleSend = () => {
    if (input && input.trim()) {
      // Đẩy tin nhắn của User lên màn hình
      setMessages(prev => [...prev, { role: 'user', text: input }])
      setInput('')
      setStatus('streaming')

      // Giả lập AI trả lời sau 1.5 giây để demo lúc báo cáo
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'ai', 
            text: 'Chào cậu! Trạm Pass Bách Khoa hiện đang có các combo Lập trình C, Hóa đại cương giá siêu hời. Cậu cần kiếm giáo trình hay linh kiện gì?' 
          }
        ])
        setStatus('idle')
      }, 1500)
    }
  }

  return (
    <>
      {/* Nút mở Chat */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true)
            setIsMinimized(false)
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Mở hỗ trợ AI"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Cửa sổ Chat - Thu nhỏ */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-xl shadow-2xl border border-border">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-primary/90 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium text-sm">Hỗ trợ HUST Eco-Share</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Cửa sổ Chat - Mở full */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-2rem)] h-96 bg-card rounded-2xl shadow-2xl flex flex-col border border-border animate-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-2xl">
            <div>
              <h3 className="font-semibold text-sm">Hỗ trợ HUST Eco-Share</h3>
              <p className="text-xs opacity-90">Trợ lý AI - Sẵn sàng giúp bạn</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-black/20 rounded-lg transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-black/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Khu vực hiển thị tin nhắn */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-3">
                <MessageCircle className="w-12 h-12 opacity-50" />
                <div>
                  <p className="font-medium">Xin chào! 👋</p>
                  <p className="text-sm mt-1">
                    Hỏi tôi về sản phẩm, giáo trình, hoặc các combo qua môn nhé!
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Hiệu ứng AI đang gõ chữ */}
            {status === 'streaming' && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Khu vực nhập text đã fix lỗi onChange */}
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Nhập tin nhắn..."
                className="flex-1 text-sm"
                disabled={status === 'streaming'}
              />
              <Button
                onClick={handleSend}
                disabled={status === 'streaming' || !input?.trim()}
                size="sm"
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
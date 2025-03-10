
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { MessagesSquare, X, Send, MinusCircle, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const AITool: React.FC = () => {
  const { isKidsMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm CodePulse AI. How can I help you with your coding journey today?",
      isUser: false
    }
  ]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true
    };
    
    setMessages([...messages, userMessage]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! In Python, a class is a blueprint for creating objects that bundle data and functionality together.",
        "I'd recommend starting with the HTML basics module before moving to CSS.",
        "A 'TypeError' usually occurs when an operation is performed on a value of the wrong type.",
        "React hooks like useState allow you to use state in functional components without writing a class."
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // If closed, just show the button
  if (!isOpen) {
    return (
      <Button
        onClick={toggleOpen}
        className={`
          fixed z-30 bottom-6 right-6 rounded-full p-4 shadow-lg
          ${isKidsMode 
            ? 'bg-kids-primary hover:bg-kids-primary/90' 
            : 'bg-foreground text-background hover:bg-foreground/90'
          }
        `}
        size="icon"
      >
        <Bot size={24} />
      </Button>
    );
  }

  return (
    <div
      className={`
        fixed z-30 bottom-6 right-6 w-full sm:w-96 rounded-xl shadow-xl transition-all
        ${isMinimized 
          ? 'h-14' 
          : 'max-h-[600px] h-[500px]'
        }
        ${isKidsMode 
          ? 'border-4 border-kids-primary' 
          : 'border border-border'
        }
        animate-scale-in
      `}
    >
      {/* Header */}
      <div
        className={`
          flex items-center justify-between p-4 rounded-t-xl cursor-pointer
          ${isKidsMode 
            ? 'bg-kids-primary text-white' 
            : 'bg-secondary text-foreground'
          }
        `}
        onClick={toggleMinimize}
      >
        <div className="flex items-center gap-2">
          <MessagesSquare size={20} />
          <h3 className={`font-semibold ${isKidsMode ? 'text-lg' : ''}`}>
            Ask CodePulse AI
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleMinimize}>
            <MinusCircle size={20} />
          </button>
          <button onClick={toggleOpen}>
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Chat body */}
      {!isMinimized && (
        <>
          <div 
            className={`
              flex-1 overflow-y-auto p-4 space-y-4
              ${isKidsMode 
                ? 'bg-white' 
                : 'bg-card text-card-foreground'
              }
            `}
            style={{ height: 'calc(100% - 140px)' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`
                  flex ${message.isUser ? 'justify-end' : 'justify-start'}
                `}
              >
                <div
                  className={`
                    max-w-[80%] rounded-lg p-3
                    ${message.isUser
                      ? isKidsMode 
                        ? 'bg-kids-primary text-white'
                        : 'bg-primary text-primary-foreground'
                      : isKidsMode
                        ? 'bg-kids-secondary text-kids-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }
                  `}
                >
                  <p className={isKidsMode ? 'text-base' : 'text-sm'}>
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input area */}
          <form 
            onSubmit={handleSubmit}
            className={`
              p-4 border-t flex gap-2 absolute bottom-0 w-full
              ${isKidsMode 
                ? 'border-kids-muted bg-white' 
                : 'border-border bg-card'
              }
            `}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a coding question..."
              className={`
                flex-1 px-4 py-2 rounded-lg focus:outline-none
                ${isKidsMode 
                  ? 'border-2 border-kids-muted text-kids-foreground text-lg' 
                  : 'border border-border bg-background'
                }
              `}
            />
            <Button 
              type="submit"
              size={isKidsMode ? "lg" : "default"}
              className={isKidsMode ? "kids-button" : ""}
            >
              <Send size={18} />
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default AITool;

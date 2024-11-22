import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Loader2, Maximize2, Minimize2, HelpCircle, RefreshCw } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { toast } from 'react-hot-toast';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'suggestion' | 'error' | 'success' | 'command';
}

interface Command {
  keyword: string;
  description: string;
  handler: (input: string) => Promise<string>;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi! I'm your resume assistant. I can help you customize your resume and provide suggestions. Type /help to see available commands.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { resume, updateResume } = useResumeStore();

  const commands: Command[] = [
    {
      keyword: '/help',
      description: 'Show available commands',
      handler: async () => {
        return `Available commands:
• /summary [text] - Update professional summary
• /experience [company] [text] - Add or update work experience
• /education [school] [text] - Add or update education
• /skills [text] - Update skills
• /contact [field] [value] - Update contact information
• /generate [section] - Generate content for a section
• /format [section] - Format existing content
• /preview - Show current resume preview
• /undo - Undo last change
• /clear - Clear chat history
• /expand - Expand chat window
• /minimize - Minimize chat window
• /help - Show this help message`;
      }
    },
    {
      keyword: '/summary',
      description: 'Update professional summary',
      handler: async (input) => {
        const summary = input.replace('/summary', '').trim();
        const updatedResume = { ...resume, summary };
        updateResume(updatedResume);
        return 'Professional summary updated successfully!';
      }
    },
    {
      keyword: '/experience',
      description: 'Add or update work experience',
      handler: async (input) => {
        const [company, ...descParts] = input.replace('/experience', '').trim().split(' ');
        const description = descParts.join(' ');
        
        const updatedResume = { ...resume };
        const expIndex = updatedResume.experience.findIndex(exp => 
          exp.company.toLowerCase() === company.toLowerCase()
        );

        if (expIndex >= 0) {
          updatedResume.experience[expIndex].description = description;
        } else {
          updatedResume.experience.push({
            company,
            position: 'Position',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            description
          });
        }
        
        updateResume(updatedResume);
        return `Work experience for ${company} updated successfully!`;
      }
    },
    {
      keyword: '/skills',
      description: 'Update skills',
      handler: async (input) => {
        const skills = input.replace('/skills', '').trim();
        const updatedResume = { ...resume };
        updatedResume.skills = skills.split(',').map(skill => skill.trim());
        updateResume(updatedResume);
        return 'Skills updated successfully!';
      }
    },
    {
      keyword: '/generate',
      description: 'Generate content for a section',
      handler: async (input) => {
        const section = input.replace('/generate', '').trim();
        try {
          const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              inputs: `Generate professional ${section} for resume`,
              parameters: {
                max_length: 150,
                temperature: 0.7,
                top_p: 0.9,
              }
            })
          });
          
          if (!response.ok) throw new Error('Failed to generate content');
          
          const data = await response.json();
          const generatedContent = data[0]?.generated_text;
          
          const updatedResume = { ...resume };
          updatedResume[section.toLowerCase()] = generatedContent;
          updateResume(updatedResume);
          
          return `Generated content for ${section}. You can now edit it if needed.`;
        } catch (error) {
          throw new Error(`Failed to generate content for ${section}`);
        }
      }
    },
    {
      keyword: '/clear',
      description: 'Clear chat history',
      handler: async () => {
        setMessages([{
          content: "Chat history cleared. How can I help you?",
          isUser: false,
          timestamp: new Date()
        }]);
        return '';
      }
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCommand = async (command: string, fullInput: string) => {
    const cmd = commands.find(c => c.keyword === command);
    if (cmd) {
      try {
        const response = await cmd.handler(fullInput);
        if (response) {
          setMessages(prev => [...prev, {
            content: response,
            isUser: false,
            timestamp: new Date(),
            type: 'success'
          }]);
        }
      } catch (error) {
        setMessages(prev => [...prev, {
          content: `Error: ${error.message}`,
          isUser: false,
          timestamp: new Date(),
          type: 'error'
        }]);
      }
      return true;
    }
    return false;
  };

  const handleAIResponse = async (userInput: string) => {
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: userInput,
          parameters: {
            max_length: 100,
            temperature: 0.7,
            top_p: 0.9,
          }
        })
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      return data[0]?.generated_text || "I understand. Let me help you with that.";
    } catch (error) {
      console.error('Error:', error);
      return "I understand your request. How can I help you with your resume?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Check for commands
      const firstWord = inputMessage.split(' ')[0];
      const isCommand = await handleCommand(firstWord, inputMessage);

      if (!isCommand) {
        // Get AI response
        const aiResponse = await handleAIResponse(inputMessage);
        
        setMessages(prev => [...prev, {
          content: aiResponse,
          isUser: false,
          timestamp: new Date()
        }]);

        // Generate suggestions based on context
        const suggestionsResponse = await handleAIResponse(`Suggest 3 improvements for this resume section: ${inputMessage}`);
        setSuggestions(suggestionsResponse.split('\n').filter(s => s.trim()));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 ${
        isExpanded ? 'w-96 h-[80vh]' : 'w-80 h-96'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b bg-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageSquare size={20} />
          <h3 className="font-medium">Resume Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleExpand}
            className="text-white/80 hover:text-white"
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-purple-600 text-white'
                  : message.type === 'error'
                  ? 'bg-red-100 text-red-800'
                  : message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : message.type === 'command'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
          <div className="text-xs text-gray-500 mb-2">Suggestions:</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-3 py-2 border-t border-gray-100 flex space-x-2">
        <button
          onClick={() => handleCommand('/help', '/help')}
          className="text-gray-500 hover:text-purple-600"
          title="Help"
        >
          <HelpCircle size={18} />
        </button>
        <button
          onClick={() => handleCommand('/clear', '/clear')}
          className="text-gray-500 hover:text-purple-600"
          title="Clear Chat"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Input */}
      <div className="p-3 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message or command..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-purple-600"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

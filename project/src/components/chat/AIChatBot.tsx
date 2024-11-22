import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, X, Send, Loader2, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/styles/gradients.css';
import '@/styles/sparkles.css';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: "✨ Hello! I'm your Lovable AI Assistant, powered by My lord Divyesh. I'm here to help you create professional resumes and career documents.",
    isUser: false,
  },
  {
    id: '2',
    content: "I can assist you with:\n🎯 Resume writing and formatting\n📝 Cover letter generation\n💼 Professional summaries\n⚡ Skills optimization\n\nWhat would you like help with today?",
    isUser: false,
  }
];

export function AIChatBot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('AIChatBot mounted, messages:', messages);
  }, []);

  if (!mounted) {
    return null;
  }

  // Diagnostic logging function
  const logDiagnostics = (message: string, details?: any) => {
    console.log(`[AI DIAGNOSTICS] ${message}`, details || '');
  };

  // Mistral AI Configuration
  const MISTRAL_API_KEY = 'xIg9VCwgrCrkODQGitEc91jn7oKu8QfV';
  const MISTRAL_API_ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';

  const generateAIResponse = async (userInput: string): Promise<string> => {
    logDiagnostics('Generating AI response with Mistral', { userInput });

    try {
      // Validate input
      if (!userInput || userInput.trim().length === 0) {
        logDiagnostics('Invalid input: Empty or whitespace');
        return 'Please provide a valid input.';
      }

      // Direct API call to Mistral
      const response = await fetch(MISTRAL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`
        },
        body: JSON.stringify({
          model: 'mistral-small-latest', // Updated to recommended model
          messages: [
            {
              role: 'system',
              content: `You are an AI Resume Assistant specialized in helping users create professional career documents. 
              Provide expert guidance on:
              - Resume writing
              - Cover letter creation
              - Interview preparation
              - Career development advice

              Key principles:
              - Use clear, professional language
              - Provide actionable, specific advice
              - Focus on highlighting user's strengths
              - Offer strategic career insights

              Response format:
              - Use markdown for formatting
              - Include emojis for engagement
              - Provide structured, bulleted advice
              - Keep responses concise and impactful`
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          // Mistral AI recommended parameters
          temperature: 0.7,
          max_tokens: 300,
          top_p: 1,
          safe_prompt: true // Added safety feature
        })
      });

      // Check response status
      if (!response.ok) {
        const errorBody = await response.text();
        logDiagnostics('Mistral API Error', { 
          status: response.status, 
          statusText: response.statusText,
          errorBody 
        });
        throw new Error(`Mistral API request failed: ${errorBody}`);
      }

      // Parse response
      const data = await response.json();
      
      // Extract and log the AI's response
      const aiResponse = data.choices[0]?.message?.content?.trim() || '';
      
      logDiagnostics('Mistral AI Response Generated', {
        responseLength: aiResponse.length,
        tokenUsage: data.usage
      });

      // Validate response
      if (!aiResponse) {
        throw new Error('Empty response from Mistral AI');
      }

      return aiResponse;
    } catch (error) {
      // Comprehensive error logging
      logDiagnostics('Error in Mistral AI response generation', {
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : 'No stack trace'
      });

      // Fallback to local response system
      return handleFallbackResponse(userInput);
    }
  };

  const handleFallbackResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    const keywords = {
      'resume': ['summary', 'experience', 'skills', 'education', 'objective', 'achievements', 'projects', 'certifications'],
      'cover': ['letter', 'introduction', 'closing', 'signature', 'format', 'motivation', 'interest'],
      'interview': ['questions', 'prepare', 'answers', 'behavioral', 'technical', 'salary', 'negotiation'],
      'job': ['search', 'application', 'description', 'requirements', 'qualifications', 'career', 'transition']
    };

    let matchedCategory = '';
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => lowercaseInput.includes(word)) || lowercaseInput.includes(category)) {
        matchedCategory = category;
        break;
      }
    }

    switch (matchedCategory) {
      case 'resume':
        return `Let me help you craft a compelling resume! Here's what we'll focus on:

✨ Resume Structure & Flow:
• Powerful professional summary
• Achievement-focused experience section
• Strategic skills presentation
• Relevant certifications & education

📝 Content Optimization:
• Industry-specific keywords
• Quantifiable achievements
• Action verbs & impact statements
• ATS-friendly formatting

🎯 Best Practices:
• Clear visual hierarchy
• Consistent formatting
• Tailored content
• Professional tone

Which aspect would you like to explore first?`;

      case 'cover':
        return `Let's create an impactful cover letter! Here's our approach:

📝 Strategic Structure:
• Attention-grabbing opening
• Compelling value proposition
• Evidence of company research
• Strong call to action

✨ Content Elements:
• Personal brand alignment
• Specific role connection
• Achievement highlights
• Cultural fit demonstration

🎯 Professional Polish:
• Clear formatting
• Consistent tone
• Perfect grammar
• Appropriate length

Which section should we focus on first?`;

      case 'interview':
        return `Let's prepare you for interview success! Here's our game plan:

🎯 Comprehensive Preparation:
• Company research deep-dive
• Role-specific preparation
• STAR method mastery
• Technical knowledge review

💼 Interview Strategy:
• Behavioral question framework
• Situation analysis
• Achievement storytelling
• Question preparation

✨ Professional Presence:
• Body language mastery
• Active listening skills
• Confident communication
• Follow-up protocol

What area would you like to work on?`;

      case 'job':
        return `Let's optimize your job search strategy! Here's what we'll cover:

🎯 Strategic Approach:
• Target role identification
• Industry research
• Network leveraging
• Application tracking

💼 Application Excellence:
• Resume customization
• Cover letter adaptation
• Portfolio preparation
• Online presence optimization

✨ Career Development:
• Skill gap analysis
• Professional development
• Industry networking
• Personal branding

Where would you like to start?`;

      default:
        return `I'm your AI Career Assistant! Here's how I can help:

✨ Document Creation:
• Custom resume design
• Cover letter writing
• LinkedIn optimization
• Portfolio development

🎯 Career Strategy:
• Job search planning
• Interview preparation
• Skill development
• Personal branding

💼 Professional Growth:
• Career path planning
• Industry insights
• Networking strategies
• Advancement tips

What would you like to work on first?`;
    }
  };

  const handleSendMessage = async () => {
    // Comprehensive input validation
    if (!input.trim() || isLoading) {
      logDiagnostics('Message send blocked', { 
        inputEmpty: !input.trim(), 
        isLoading 
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      logDiagnostics('Preparing to generate AI response', { userInput: input });

      // Simulate initial typing delay
      await new Promise(resolve => setTimeout(resolve, 200));

      const aiResponse = await generateAIResponse(input);
      
      // Adjust typing delay for potentially longer Mistral responses
      const typingDelay = Math.min(Math.floor(aiResponse.length / 10), 1200);
      await new Promise(resolve => setTimeout(resolve, typingDelay));
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
      };

      logDiagnostics('AI response generated successfully', {
        responseLength: aiResponse.length,
        typingDelay
      });

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      logDiagnostics('Error in message handling', {
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `🤖 Mistral AI Assistance Temporarily Unavailable

Fallback Support:
• System is monitoring the issue
• Alternative guidance provided
• Please try your request again

Would you like to explore our standard career advice?`,
        isUser: false,
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className={cn(
          "fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg gradient-button border-0 sparkle-button",
          "z-50" // Ensure button is visible
        )}
        onClick={() => {
          console.log('Toggle chat:', !isOpen); // Debug log
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <Brain className="h-6 w-6 text-white absolute animate-ping opacity-75" />
            <Brain className="h-6 w-6 text-white relative" />
            <div className="sparkle sparkle-sm float-1" style={{ top: '0%', left: '0%' }} />
            <div className="sparkle sparkle-md float-2" style={{ top: '20%', right: '10%' }} />
            <div className="sparkle sparkle-lg float-3" style={{ bottom: '10%', left: '30%' }} />
          </div>
        )}
      </Button>

      <Card className={cn(
        "fixed bottom-24 right-4 w-96 transition-all duration-300 ease-in-out shadow-2xl gradient-card sparkle-container",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      )}>
        <div className="h-[500px] flex flex-col rounded-lg overflow-hidden">
          <div className="p-4 border-b animated-gradient text-white relative">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <div className="star star-sm float-1" style={{ top: '-50%', left: '100%' }} />
                <div className="star star-md float-2" style={{ top: '100%', left: '50%' }} />
              </div>
              <div>
                <h3 className="font-semibold sparkle-text">AI Resume Assistant</h3>
                <p className="text-xs opacity-90">Powered by advanced AI</p>
              </div>
            </div>
            <div className="sparkle sparkle-lg float-3" style={{ top: '20%', right: '10%' }} />
            <div className="sparkle sparkle-sm float-1" style={{ bottom: '30%', right: '30%' }} />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/95 backdrop-blur-sm">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 whitespace-pre-wrap relative",
                    message.isUser
                      ? "animated-gradient text-white"
                      : "bg-gray-100 animated-gradient-border"
                  )}
                >
                  {message.content}
                  {!message.isUser && (
                    <>
                      <div className="sparkle sparkle-sm float-1" style={{ top: '-10%', left: '-5%' }} />
                      <div className="sparkle sparkle-md float-2" style={{ bottom: '-10%', right: '-5%' }} />
                    </>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 max-w-[85%] rounded-lg px-3 py-2 animated-gradient-border relative">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  </div>
                  <div className="sparkle sparkle-lg float-3" style={{ top: '50%', right: '-10%' }} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white/95 backdrop-blur-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about resume writing..."
                className="flex-1 animated-gradient-border bg-white"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading}
                className="gradient-button"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </>
  );
}

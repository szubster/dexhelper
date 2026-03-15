import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Map, Target } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import { SaveData, GameVersion } from '../utils/saveParser';

interface AIChatProps {
  saveData: SaveData | null;
  gameVersion: GameVersion;
  uncaughtPokemon: { id: number; name: string }[];
  selectedPokemon: { id: number; name: string } | null;
  onClose: () => void;
}

export function AIChat({ saveData, gameVersion, uncaughtPokemon, selectedPokemon, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateContext = () => {
    let context = `You are a helpful expert on Pokemon Generation 1 (Red, Blue, Yellow) and Generation 2 (Gold, Silver, Crystal).
The user is playing Pokemon ${gameVersion === 'unknown' ? (saveData?.generation === 2 ? 'Gold/Silver/Crystal' : 'Red/Blue/Yellow') : gameVersion}.
`;
    if (saveData) {
      const badges = [];
      if (saveData.generation === 1) {
        if (saveData.badges & 1) badges.push('Boulder');
        if (saveData.badges & 2) badges.push('Cascade');
        if (saveData.badges & 4) badges.push('Thunder');
        if (saveData.badges & 8) badges.push('Rainbow');
        if (saveData.badges & 16) badges.push('Soul');
        if (saveData.badges & 32) badges.push('Marsh');
        if (saveData.badges & 64) badges.push('Volcano');
        if (saveData.badges & 128) badges.push('Earth');
      } else {
        if (saveData.badges & 1) badges.push('Zephyr');
        if (saveData.badges & 2) badges.push('Hive');
        if (saveData.badges & 4) badges.push('Plain');
        if (saveData.badges & 8) badges.push('Fog');
        if (saveData.badges & 16) badges.push('Storm');
        if (saveData.badges & 32) badges.push('Mineral');
        if (saveData.badges & 64) badges.push('Glacier');
        if (saveData.badges & 128) badges.push('Rising');
      }

      const missingNames = uncaughtPokemon.map(p => p.name).join(', ');
      const caughtIds = Array.from(saveData.owned).join(', ');
      const totalPokemon = saveData.generation === 2 ? 251 : 151;
      context += `The user has ${badges.length} badges: ${badges.join(', ')}.
They have caught ${saveData.owned.size} out of ${totalPokemon} Pokemon.
Caught Pokemon IDs: ${caughtIds}
Missing Pokemon: ${missingNames}
Do NOT suggest locations or items that require HMs (like Surf or Strength) if the user does not have the corresponding badge.
`;
    }

    if (selectedPokemon) {
      context += `The user is currently looking at ${selectedPokemon.name} (ID: ${selectedPokemon.id}). Focus your advice on this Pokemon if relevant.`;
    }

    return context;
  };

  const handleSend = async (text: string, isSystemPrompt = false) => {
    if (!text.trim()) return;

    const userMessage = text;
    if (!isSystemPrompt) {
      setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
      setInput('');
    }
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `${generateContext()}\n\nUser Request: ${userMessage}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Sorry, I could not generate a response.' }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Error: Could not connect to the AI. Please check your API key.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4">
      <div className="bg-zinc-900 border-b-8 border-r-8 border-l-4 border-t-4 border-zinc-950 rounded-none sm:rounded-2xl w-full h-full sm:h-[80vh] sm:max-w-2xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-zinc-950 bg-zinc-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-[0_2px_0_rgb(30,58,138)] border-2 border-blue-900">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="font-black text-white uppercase tracking-widest text-lg">Pokédex AI Assistant</h2>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors p-2 bg-zinc-900 rounded-full border-2 border-zinc-700 hover:bg-red-600 hover:border-red-500">
            <X size={20} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 p-4 bg-zinc-950 border-b-4 border-zinc-900 overflow-x-auto custom-scrollbar">
          <button 
            onClick={() => handleSend("Based on my current badges and missing Pokemon, which single Pokemon should I hunt next? Tell me why and exactly how to get it.", true)}
            className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 border-blue-900 shadow-[0_4px_0_rgb(30,58,138)] hover:shadow-[0_2px_0_rgb(30,58,138)] hover:translate-y-[2px]"
          >
            <Target size={16} /> Next Target
          </button>
          <button 
            onClick={() => handleSend("Create a step-by-step roadmap for me to catch all my remaining missing Pokemon, grouped by location and taking my current badges into account.", true)}
            className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 border-purple-900 shadow-[0_4px_0_rgb(88,28,135)] hover:shadow-[0_2px_0_rgb(88,28,135)] hover:translate-y-[2px]"
          >
            <Map size={16} /> Full Roadmap
          </button>
          {selectedPokemon && (
            <button 
              onClick={() => handleSend(`Give me the best strategy to catch ${selectedPokemon.name} right now.`, true)}
              className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 border-emerald-900 shadow-[0_4px_0_rgb(6,78,59)] hover:shadow-[0_2px_0_rgb(6,78,59)] hover:translate-y-[2px]"
            >
              <Sparkles size={16} /> How to catch {selectedPokemon.name}?
            </button>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-zinc-800">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <Bot size={64} className="opacity-20" />
              <p className="text-center max-w-sm font-bold text-lg">
                Ask me anything about completing your Pokédex! I know your current progress, badges, and missing Pokémon.
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-4 border-b-4 border-r-4 border-l-2 border-t-2 ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm border-blue-900' 
                      : 'bg-zinc-900 text-zinc-200 rounded-tl-sm border-zinc-950'
                  }`}
                >
                  <div className="text-sm leading-relaxed prose prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 font-medium">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 text-zinc-400 rounded-2xl rounded-tl-sm border-b-4 border-r-4 border-l-2 border-t-2 border-zinc-950 p-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-900 border-t-4 border-zinc-950">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a Pokemon, location, or strategy..."
              className="flex-1 bg-zinc-950 border-2 border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all shadow-inner"
            />
            <button 
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all flex items-center justify-center border-2 border-blue-900 shadow-[0_4px_0_rgb(30,58,138)] hover:shadow-[0_2px_0_rgb(30,58,138)] hover:translate-y-[2px] disabled:shadow-none disabled:translate-y-[4px]"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

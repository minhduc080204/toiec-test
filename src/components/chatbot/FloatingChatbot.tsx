import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { askChatbot } from '../../services/chatbotService';

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! Ask me anything about the questions.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    scrollToBottom();

    try {
      const reply = await askChatbot(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I am disconnected right now.' }]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const container = document.querySelector('.overflow-y-auto');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 h-96 flex flex-col mb-4 overflow-hidden">
          <div className="bg-green-600 text-white p-3 flex justify-between items-center">
            <span className="font-medium flex items-center gap-2">
              <MessageCircle size={18} /> AI Assistant
            </span>
            <button onClick={() => setIsOpen(false)} className="hover:text-green-200">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`p-2 rounded-lg max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-green-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-xs self-start">Typing...</div>}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gray-200 flex gap-2 bg-white">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md outline-none focus:border-green-500"
            />
            <button type="submit" disabled={loading} className="bg-green-600 text-white p-1.5 rounded-md hover:bg-green-700 disabled:opacity-50">
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition transform hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

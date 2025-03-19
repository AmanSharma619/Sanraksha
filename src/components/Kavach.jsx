import { useState, useEffect, useRef } from "react";

const BACKEND_URL = "http://localhost:8000";

const Kavach = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const userMessage = message.trim();
      setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
      setMessage("");

      const response = await fetch(`${BACKEND_URL}/ask/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userMessage })
      });
      
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();

      setMessages(prev => [...prev, { text: data.answer || "I couldn't process that request.", sender: "bot" }]);
    } catch (err) {
      setError("Failed to get response from the bot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-red-800 hover:bg-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl transition-all duration-300"
        >
          <span className="text-2xl">💬</span>
        </button>
      ) : (
        <div className="w-96 bg-black text-white rounded-lg shadow-lg overflow-hidden border-2 border-red-600 animate-fadeIn">
          <div className="flex justify-between items-center p-4 bg-red-800">
            <h2 className="text-lg font-bold">Kavach AI</h2>
            <button onClick={() => setIsOpen(false)} className="text-white bg-transparent hover:text-gray-300">✕</button>
          </div>
          <div className="h-72 overflow-y-auto p-3 bg-gray-900">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-4">Start a conversation...</div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-2 p-3 rounded-lg text-sm max-w-[80%] ${msg.sender === "user" ? "bg-red-700 text-white ml-auto" : "bg-gray-700 text-white mr-auto"}`}
                >
                  {msg.text}
                </div>
              ))
            )}
            {loading && <div className="text-center text-gray-400 py-2">Kavach is typing...</div>}
            {error && <div className="text-red-500 text-center py-2">{error}</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-gray-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className={`bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition-all text-white ${loading || !message.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kavach;

import { useState, useEffect, useRef } from "react";

const BACKEND_URL = "http://localhost:8000";

const ChatBot = () => {
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

  useEffect(() => {
    async function testConnection() {
      try {
        const response = await fetch(`${BACKEND_URL}/test/`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          mode: "cors",
          body: JSON.stringify({})
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Test connection successful:", data);
      } catch (error) {
        console.error("Test connection failed:", error);
      }
    }
    
    testConnection();
  }, []);
  
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
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({ input: userMessage })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        text: data.answer || "I couldn't process that request.", 
        sender: "bot" 
      }]);

    } catch (err) {
      console.error("Chat error:", err);
      setError("Failed to get response from the bot");
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble processing your request right now.", 
        sender: "bot" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-red-300 p-6 w-96 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center text-red-900">Chat</h2>
        
        <div className="mt-4 h-64 overflow-y-auto bg-gray-800 rounded-lg p-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              Start a conversation with Kavach...
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded-lg ${
                  msg.sender === "user" 
                    ? "bg-red-900 text-white ml-auto max-w-[70%]" 
                    : "bg-gray-700 text-white mr-auto max-w-[70%]"
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
          {loading && (
            <div className="text-center py-2">
              <div className="inline-block animate-pulse">Kavach is thinking...</div>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center py-2">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your safety question..."
              className="w-full p-2 rounded-lg text-black"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className={`bg-red-900 hover:bg-red-500 px-4 py-2 rounded-lg transition-all ${
                loading || !message.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
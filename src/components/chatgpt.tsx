// Import necessary React hooks and styling
import { useState } from "react";
import "./ChatInterface.css";

// Define the Message type interface that specifies the structure of chat messages
// Messages can only have a role of "user" or "assistant" and must contain content
interface Message {
  role: "user" | "assistant";
  content: string;
}

// Define the main ChatInterface component as a React Functional Component
const ChatInterface: React.FC = () => {
  // Initialize state for storing chat messages array using useState hook
  const [messages, setMessages] = useState<Message[]>([]);
  // Initialize state for managing the input field's current value
  const [input, setInput] = useState<string>("");
  // Initialize state to track when the application is waiting for a response
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define the async function that handles sending messages and getting responses
  const handleSendMessage = async () => {
    // Return early if the input is empty or only contains whitespace
    if (!input.trim()) return;

    // Create a message object from the user's input
    const userMessage: Message = { role: "user", content: input.trim() };
    // Add the user's message to the chat history
    setMessages((prev) => [...prev, userMessage]);
    // Clear the input field
    setInput("");
    // Set loading state to true while waiting for response
    setIsLoading(true);

    try {
      // Send a POST request to OpenAI's API with the chat history
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            // Include API key from environment variables for authentication
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          // Send the model type and complete message history including the new message
          body: JSON.stringify({
            model: "gpt-4",
            messages: [...messages, userMessage],
          }),
        }
      );

      // Throw an error if the API response isn't successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response from the API
      const data = await response.json();
      // Create a message object from the assistant's response
      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      // Add the assistant's response to the chat history
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Log any errors that occur during the API call
      console.error("Error fetching response:", error);
    } finally {
      // Reset loading state whether the request succeeded or failed
      setIsLoading(false);
    }
  };

  // Render the chat interface
  return (
    // Main container for the entire chat interface
    <div className="chat-container">
      <div className="chat-window">
        {/* Container for displaying the message history */}
        <div className="messages-container">
          {/* Map through messages array to display each message */}
          {messages.map((message, index) => (
            <div
              key={index}
              // Apply different styling based on whether it's a user or assistant message
              className={`message-wrapper ${
                message.role === "user" ? "user-message" : "assistant-message"
              }`}
            >
              <div className="message-bubble">{message.content}</div>
            </div>
          ))}
          {/* Show loading indicator while waiting for response */}
          {isLoading && (
            <div className="message-wrapper assistant-message">
              <div className="message-bubble loading">
                <div className="loading-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Container for input field and send button */}
        <div className="input-container">
          <input
            type="text"
            value={input}
            // Update input state when user types
            onChange={(e) => setInput(e.target.value)}
            // Handle Enter key press to send message
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="message-input"
          />
          {/* Send button that's disabled when loading or input is empty */}
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the ChatInterface component for use in other parts of the application
export default ChatInterface;

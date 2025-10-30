import { useState, useEffect } from "react";
import { getCookie } from "../../lib/cookie-utils";
import { useNavigate } from "react-router-dom";

// Polyfill for crypto.randomUUID if not supported (e.g., in non-secure contexts or older browsers)
if (!crypto.randomUUID) {
  crypto.randomUUID = function randomUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  };
}

const Chatting = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [conversation, setConversation] = useState(null);
  const [conversationId, setConversationId] = useState("");

  // Replace with your actual token and URL
  const token = getCookie("access_token");
  const url = `ws://10.10.12.10:3000/ws/chat?token=${token}`;

  // Receiver hardcoded, can make dynamic if needed
  const receiver = 33;

  const navigate = useNavigate();

  useEffect(() => {
    let ws;
    let reconnectInterval;

    const connect = () => {
      setErrorMessage(""); // Clear previous errors
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("Connected to WebSocket");
        setIsConnected(true);
        setSocket(ws);
        // Note: Join is now manual via button
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received:", data);

          if (data.type === "message.field_error" || data.type === "chat.error" || data.type === "message_field_error") {
            // Improved error handling to display field-specific errors if present
            const errors = Object.entries(data)
              .filter(([key]) => key !== "type")
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ");
            setErrorMessage(errors || data.text || data.message || JSON.stringify(data));
          } else if (data.type === "connection.open") {
            // Handle connection open if needed
          } else if (data.type === "chat.join") {
            // Extract conversation details from response
            if (data.data) {
              setConversation(data.data.conversation);
              setConversationId(data.data.conversation_id);
              setIsJoined(true);
              // Update the route with the conversation ID
              navigate(`/conversation/${data.data.conversation_id}`);
            }
            setMessages((prev) => [...prev, data]);
          } else if (data.type === "chat.message") {
            setMessages((prev) => [...prev, data]);
          } // Add more type handlers as needed
        } catch (err) {
          console.error("Invalid JSON received:", err);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
        setErrorMessage("Connection error occurred.");
      };

      ws.onclose = (event) => {
        console.log(
          "Disconnected. Code:",
          event.code,
          "Reason:",
          event.reason,
          "Clean close?",
          event.wasClean
        );
        setIsConnected(false);
        setIsJoined(false);
        // Start reconnection if not a clean close
        if (!event.wasClean) {
          reconnectInterval = setTimeout(connect, 5000); // Reconnect after 5 seconds
        }
      };
    };

    connect(); // Initial connection

    return () => {
      if (ws) ws.close();
      if (reconnectInterval) clearTimeout(reconnectInterval);
    };
  }, [url, navigate]); // Re-run if URL changes (e.g., token updates)

  const joinConversation = () => {
    if (socket && isConnected) {
      const payload = {
        type: "chat.join",
        data: {},
        receiver: receiver,
      };

      if (conversationId) {
        // If user provided a conversation ID, include it to join existing
        payload.data.conversation_id = conversationId;
      } else {
        // Generate a new conversation ID if empty
        const uuid1 = crypto.randomUUID().replace(/-/g, '');
        const uuid2 = crypto.randomUUID().replace(/-/g, '');
        const generatedId = uuid1 + uuid2;
        setConversationId(generatedId);
        payload.data.conversation_id = generatedId;
      }

      console.log("Sending join:", payload);
      socket.send(JSON.stringify(payload));
    } else {
      setErrorMessage("Not connected. Cannot join conversation.");
    }
  };

  const sendMessage = () => {
    if (!isJoined) {
      setErrorMessage("Please join the conversation first.");
      return;
    }
    if (socket && isConnected && input.trim()) {
      if (!conversation) {
        setErrorMessage("Conversation ID not set. Please rejoin.");
        return;
      }
      const payload = {
        type: "chat.message",
        text: input,  // Changed from 'message' to 'text' based on backend error patterns
        receiver: receiver,
        message_type: "Text",
        conversation: conversation, // Use the conversation PK from join response (e.g., 8)
      };
      console.log("Sending:", payload);
      socket.send(JSON.stringify(payload));
      setInput("");
    } else if (!input.trim()) {
      setErrorMessage("Message cannot be empty.");
    } else {
      setErrorMessage("Not connected. Cannot send message.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Chatting with WebSocket</h2>
      <div>Status: {isConnected ? "Connected" : "Disconnected"}</div>
      <div>Joined: {isJoined ? `Yes (Conversation: ${conversation})` : "No"}</div>
      {errorMessage && (
        <div style={{ color: "red" }}>Error: {errorMessage}</div>
      )}
      {!isJoined && (
        <>
          <input
            type="text"
            value={conversationId}
            onChange={(e) => setConversationId(e.target.value)}
            placeholder="Conversation ID (optional for new, auto-generated if empty)"
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button onClick={joinConversation} style={{ marginBottom: "10px" }}>
            Join Conversation
          </button>
        </>
      )}
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <strong>{msg.user || "Unknown"}:</strong> {msg.text || msg.message}  {/* Updated to handle potential 'text' field */}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "70%", marginRight: "10px" }}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        disabled={!isJoined}
      />
      <button onClick={sendMessage} disabled={!isJoined}>
        Send
      </button>
    </div>
  );
};

export default Chatting;
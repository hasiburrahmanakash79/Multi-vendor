import { useState, useRef, useEffect } from "react";
import { getCookie } from "../../lib/cookie-utils";
import {
  Send,
  X,
  Search,
  MoreHorizontal,
  Star,
  Menu,
  Archive,
  BellOff,
  Trash2,
} from "lucide-react";

export default function ConversationPage() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedConvoId, setSelectedConvoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [joinedConvos, setJoinedConvos] = useState(new Set());

  const token = getCookie("access_token");
  const dropdownRef = useRef(null);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://10.10.12.10:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data);
        } else {
          console.error("Failed to fetch current user");
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };
    fetchCurrentUser();
  }, [token]);

  // Fetch conversations
  useEffect(() => {
    const fetchConvos = async () => {
      try {
        const res = await fetch("http://10.10.12.10:3000/api/chat/conversations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          let data = await res.json();
          // Sort by last message time descending
          data.sort((a, b) => {
            const timeA = a.last_message ? new Date(a.last_message.created_at).getTime() : 0;
            const timeB = b.last_message ? new Date(b.last_message.created_at).getTime() : 0;
            return timeB - timeA;
          });
          setConversations(data.map(convo => ({ ...convo, starred: false }))); // Add starred locally
          // Initialize messages with last_message if present
          const initialMessages = {};
          data.forEach(convo => {
            initialMessages[convo.id] = convo.last_message ? [convo.last_message] : [];
          });
          setMessages(initialMessages);
        } else {
          console.error("Failed to fetch conversations");
        }
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };
    fetchConvos();
  }, [token]);

  // WebSocket connection
  useEffect(() => {
    if (!token) return;

    let ws;
    let reconnectInterval;

    const connect = () => {
      const url = `ws://10.10.12.10:3000/ws/chat?token=${token}`;
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("Connected to WebSocket");
        setIsConnected(true);
        setSocket(ws);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received:", data);

          if (data.type === "message.field_error" || data.type === "chat.error" || data.type === "message_field_error") {
            const errors = Object.entries(data)
              .filter(([key]) => key !== "type")
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ");
            setErrorMessage(errors || data.text || data.message || JSON.stringify(data));
          } else if (data.type === "chat.join") {
            // Handle join if needed
          } else if (data.type === "chat.message") {
            // Assume data includes conversation (PK), sender, receiver, text, created_at, etc.
            const convoId = data.conversation;
            if (convoId) {
              setMessages((prev) => ({
                ...prev,
                [convoId]: [...(prev[convoId] || []), data],
              }));
              // Update conversation preview and last_message
              setConversations((prev) =>
                prev.map((c) =>
                  c.id === convoId
                    ? { ...c, last_message: data, preview: data.text || "", time: data.created_at }
                    : c
                ).sort((a, b) => {
                  const timeA = a.last_message ? new Date(a.last_message.created_at).getTime() : 0;
                  const timeB = b.last_message ? new Date(b.last_message.created_at).getTime() : 0;
                  return timeB - timeA;
                })
              );
            }
          }
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
        console.log("Disconnected. Code:", event.code, "Reason:", event.reason, "Clean close?", event.wasClean);
        setIsConnected(false);
        if (!event.wasClean) {
          reconnectInterval = setTimeout(connect, 5000);
        }
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
      if (reconnectInterval) clearTimeout(reconnectInterval);
    };
  }, [token]);

  // Fetch full message history when selecting a conversation
  useEffect(() => {
    if (selectedConvoId) {
      const fetchMessages = async () => {
        try {
          const res = await fetch(`http://10.10.12.10:3000/chat/messages?conversation=${selectedConvoId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setMessages((prev) => ({ ...prev, [selectedConvoId]: data }));
          } else {
            console.error("Failed to fetch messages");
          }
        } catch (err) {
          console.error("Error fetching messages:", err);
        }
      };
      fetchMessages();

      // Join conversation if not already joined
      if (socket && isConnected && !joinedConvos.has(selectedConvoId)) {
        const convo = conversations.find((c) => c.id === selectedConvoId);
        if (convo) {
          const payload = {
            type: "chat.join",
            data: { conversation_id: convo.conversation_id },
            receiver: convo.chat_with.id,
          };
          socket.send(JSON.stringify(payload));
          setJoinedConvos((prev) => new Set([...prev, selectedConvoId]));
        }
      }
    }
  }, [selectedConvoId, socket, isConnected, conversations, joinedConvos, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStar = (convoId, e) => {
    e.stopPropagation();
    setConversations((prev) =>
      prev.map((convo) => (convo.id === convoId ? { ...convo, starred: !convo.starred } : convo))
    );
  };

  const sendMessage = () => {
    if (message.trim() && socket && isConnected && selectedConvoId) {
      const convo = conversations.find((c) => c.id === selectedConvoId);
      if (!convo) return;

      const payload = {
        type: "chat.message",
        text: message.trim(),
        receiver: convo.chat_with.id,
        message_type: "Text",
        conversation: selectedConvoId,
      };

      socket.send(JSON.stringify(payload));

      // Add to local messages optimistically
      const newMsg = {
        ...payload,
        sender: currentUser ? { id: currentUser.id, full_name: currentUser.full_name } : { id: -1, full_name: "Me" },
        receiver: convo.chat_with,
        created_at: new Date().toISOString(),
        id: Date.now(), // Temporary ID
      };

      setMessages((prev) => ({
        ...prev,
        [selectedConvoId]: [...(prev[selectedConvoId] || []), newMsg],
      }));

      // Update preview
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConvoId ? { ...c, last_message: newMsg, preview: message.trim(), time: newMsg.created_at } : c
        ).sort((a, b) => {
          const timeA = a.last_message ? new Date(a.last_message.created_at).getTime() : 0;
          const timeB = b.last_message ? new Date(b.last_message.created_at).getTime() : 0;
          return timeB - timeA;
        })
      );

      setMessage("");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredConversations = conversations.filter((convo) => {
    const matchesSearch = convo.chat_with.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || (filterType === "Starred" && convo.starred);
    return matchesSearch && matchesFilter;
  });

  const handleDropdownAction = (action) => {
    if (action === "archive") {
      alert(`Archived chat with ${currentConvo?.chat_with.full_name}`);
    } else if (action === "mute") {
      alert(`Muted notifications for ${currentConvo?.chat_with.full_name}`);
    } else if (action === "delete") {
      if (window.confirm(`Are you sure you want to delete the chat with ${currentConvo?.chat_with.full_name}?`)) {
        setConversations((prev) => prev.filter((convo) => convo.id !== selectedConvoId));
        setMessages((prev) => {
          const newMessages = { ...prev };
          delete newMessages[selectedConvoId];
          return newMessages;
        });
        setSelectedConvoId(null);
        setShowSidebar(false);
      }
    }
    setShowDropdown(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const currentConvo = conversations.find((convo) => convo.id === selectedConvoId);

  return (
    <div className="flex h-[93vh] bg-white border-b border-gray-300">
      {/* Connection Status */}
      <div
        className={`fixed top-2 right-2 z-50 px-3 py-1 rounded-full text-xs font-medium ${
          isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isConnected ? "Connected" : "Disconnected"}
      </div>

      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-[#C8C1F5] text-black rounded-full"
        onClick={toggleSidebar}
      >
        {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static w-64 sm:w-72 lg:w-80 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out z-10 lg:z-auto`}
      >
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <select
              value={filterType}
              onChange={handleFilterChange}
              className="text-xs sm:text-sm font-medium text-gray-700 px-2 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8C1F5]"
            >
              <option value="All">All</option>
              <option value="Starred">Starred</option>
            </select>
            <div className="relative flex-1 ml-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search contacts..."
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1 bg-gray-100 rounded-full outline-none border border-gray-300 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((convo) => (
              <div
                key={convo.id}
                onClick={() => {
                  setSelectedConvoId(convo.id);
                  setShowSidebar(false);
                }}
                className={`flex items-center p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${selectedConvoId === convo.id ? "bg-gray-50" : ""}`}
              >
                <img
                  src={convo.chat_with.photo}
                  alt={convo.chat_with.full_name}
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex-shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/40"; // Fallback
                  }}
                />
                <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{convo.chat_with.full_name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">
                        {convo.last_message ? new Date(convo.last_message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                      </span>
                      <button
                        onClick={(e) => toggleStar(convo.id, e)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 transition-colors ${
                            convo.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-300 hover:text-yellow-300"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate mt-1">{convo.last_message?.text || ""}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-3 sm:p-4 text-xs sm:text-sm text-gray-500">No conversations found.</p>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConvo ? (
          <>
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button className="lg:hidden p-2 text-gray-600" onClick={toggleSidebar}>
                    <Menu className="w-5 h-5" />
                  </button>
                  <img
                    src={currentConvo.chat_with.photo}
                    alt={currentConvo.chat_with.full_name}
                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/40";
                    }}
                  />
                  <div>
                    <h2 className="font-medium text-sm sm:text-base text-gray-900">{currentConvo.chat_with.full_name}</h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                      <span>
                        {currentConvo.chat_with.is_online ? "Online" : `Last seen: ${new Date(currentConvo.chat_with.last_login).toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowDropdown(!showDropdown)}>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-2 sm:right-4 top-10 sm:top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                >
                  <button
                    onClick={() => handleDropdownAction("archive")}
                    className="flex items-center gap-2 w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Archive className="w-4 h-4" /> Archive Chat
                  </button>
                  <button
                    onClick={() => handleDropdownAction("mute")}
                    className="flex items-center gap-2 w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BellOff className="w-4 h-4" /> Mute Notifications
                  </button>
                  <button
                    onClick={() => handleDropdownAction("delete")}
                    className="flex items-center gap-2 w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Chat
                  </button>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 p-2 sm:p-4 overflow-y-auto bg-gray-50">
              {messages[selectedConvoId]?.map((msg) => (
                <div key={msg.id} className={`mb-4 sm:mb-6 ${msg.sender.id === currentUser?.id ? "flex justify-end" : ""}`}>
                  <div
                    className={`max-w-[80%] sm:max-w-md ${msg.sender.id === currentUser?.id ? "bg-[#C8C1F5] text-black" : "bg-white text-gray-800"} rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm`}
                  >
                    <p className="mb-2 text-xs sm:text-sm">{msg.text}</p>
                    <div className={`text-xs mt-2 ${msg.sender.id === currentUser?.id ? "text-black" : "text-gray-600"}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
              {errorMessage && <div className="text-red-500 text-sm mb-2">{errorMessage}</div>}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder={isConnected ? "Type new messages..." : "Connecting..."}
                    disabled={!isConnected || !selectedConvoId}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 rounded-full outline-none border border-gray-300 text-xs sm:text-sm disabled:opacity-50"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!message.trim() || !isConnected || !selectedConvoId}
                  className="bg-[#C8C1F5] disabled:bg-gray-100 disabled:cursor-not-allowed text-black p-2 sm:p-3 rounded-full"
                >
                  <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">No conversation selected</div>
        )}
      </div>
    </div>
  );
}
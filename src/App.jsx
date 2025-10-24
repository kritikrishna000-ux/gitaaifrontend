import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentView, setCurrentView] = useState("home"); // "home" or "chat"
  
  // Use ref to store current token for axios interceptor
  const tokenRef = useRef(token);
  
  // Auth states
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: ""
  });

  // Update ref when token changes
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  // Configure axios with auth token
  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add token to requests if available
  api.interceptors.request.use((config) => {
    console.log("Request interceptor - tokenRef.current:", tokenRef.current ? "Present" : "Missing");
    if (tokenRef.current) {
      config.headers.Authorization = `Bearer ${tokenRef.current}`;
      console.log("Added Authorization header");
    } else {
      console.log("No token available for request");
    }
    return config;
  });

  // Add response interceptor to handle auth errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("Authentication error, logging out user");
        logout();
      }
      return Promise.reject(error);
    }
  );

  // Check if user is authenticated on app load
  useEffect(() => {
    if (token) {
      console.log("Checking token validity...");
      // Check if token is expired
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        console.log("Token payload:", payload);
        console.log("Current time:", currentTime);
        console.log("Token expires at:", payload.exp);
        if (payload.exp < currentTime) {
          console.log("Token expired, logging out");
          logout();
          return;
        }
        console.log("Token is valid, checking auth...");
        checkAuth();
      } catch (error) {
        console.log("Invalid token, logging out:", error);
        logout();
      }
    } else {
      console.log("No token found");
    }
  }, [token]);

  // Separate effect to handle initial auth check
  useEffect(() => {
    if (token && !isAuthenticated) {
      console.log("Initial auth check triggered");
      checkAuth();
    }
  }, [token, isAuthenticated]);

  const checkAuth = async () => {
    try {
      console.log("checkAuth called with token:", token ? "Present" : "Missing");
      console.log("tokenRef.current:", tokenRef.current ? "Present" : "Missing");
      const response = await api.get("/auth/me");
      console.log("Auth check successful:", response.data);
      setUser(response.data);
      setIsAuthenticated(true);
      loadChats();
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    }
  };

  const loadChats = async () => {
    try {
      const response = await api.get("/auth/chats");
      setChats(response.data.chats);
    } catch (error) {
      console.error("Failed to load chats:", error);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (authMode === "signup") {
        await api.post("/auth/signup", {
          username: authData.username,
          email: authData.email,
          password: authData.password
        });
      }
      
      const response = await api.post("/auth/login", {
        username: authData.username,
        password: authData.password
      });
      
      const { access_token } = response.data;
      console.log("Login successful, received token:", access_token ? "Present" : "Missing");
      
      // Set token first
      setToken(access_token);
      localStorage.setItem("token", access_token);
      console.log("Token stored in state and localStorage");
      
      // Remove the setTimeout - useEffect will handle auth check
    } catch (error) {
      console.error("Auth error:", error);
      alert(error.response?.data?.detail || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setMessages([]);
    setChats([]);
    setCurrentChatId(null);
    localStorage.removeItem("token");
  };

  const createNewChat = async () => {
    try {
      const response = await api.post("/auth/chats", { title: "New Chat" });
      const newChat = response.data;
      setChats([newChat, ...chats]);
      setCurrentChatId(newChat.id);
      setMessages([]);
      setShowSidebar(false);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  const loadChat = async (chatId) => {
    try {
      const response = await api.get(`/chat/history/${chatId}`);
      setMessages(response.data.messages);
      setCurrentChatId(chatId);
      setShowSidebar(false);
    } catch (error) {
      console.error("Failed to load chat:", error);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      await api.delete(`/auth/chats/${chatId}`);
      setChats(chats.filter(chat => chat.id !== chatId));
      if (currentChatId === chatId) {
        setCurrentChatId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Switch to chat view if not already there
    setCurrentView("chat");
    
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // If no current chat, create one first
      let chatId = currentChatId;
      if (!chatId) {
        try {
          console.log("No current chat, creating new chat...");
          const chatResponse = await api.post("/auth/chats", { title: "New Chat" });
          chatId = chatResponse.data.id;
          setCurrentChatId(chatId);
          setChats([chatResponse.data, ...chats]);
        } catch (chatError) {
          console.error("Failed to create new chat:", chatError);
          // Continue without chat_id - the backend will handle it
          chatId = null;
        }
      }

      console.log("Sending message to:", `${api.defaults.baseURL}/chat/`);
      console.log("Request payload:", { message: input, chat_id: chatId });
      console.log("Auth token:", token ? "Present" : "Missing");
      
      const res = await api.post("/chat/", {
        message: input,
        chat_id: chatId
      });
      
      console.log("Response received:", res.data);
      
      const botMessage = { 
        sender: "bot", 
        text: `${res.data.shloka}\n\n${res.data.meaning}\n\n${res.data.guidance}`,
        shloka: res.data.shloka,
        meaning: res.data.meaning,
        guidance: res.data.guidance
      };
      setMessages((prev) => [...prev, botMessage]);
      
      // Refresh chats to get updated titles
      if (chatId) {
        loadChats();
      }
    } catch (err) {
      console.error("Error details:", {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        config: err.config
      });
      let errorMessage = "Server error, try again.";
      if (err.response?.status === 403) {
        errorMessage = "Authentication failed. Please log in again.";
      } else if (err.response?.status === 401) {
        errorMessage = "Session expired. Please log in again.";
      } else if (err.message) {
        errorMessage = `Error: ${err.message}`;
      }
      
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartChat = (initialMessage = "") => {
    setCurrentView("chat");
    if (initialMessage) {
      setInput(initialMessage);
      // Small delay to ensure the input is set before sending
      setTimeout(() => {
        sendMessage();
      }, 100);
    }
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  // Authentication UI
  if (!isAuthenticated) {
    return (
      <AuthPage
        authMode={authMode}
        setAuthMode={setAuthMode}
        authData={authData}
        setAuthData={setAuthData}
        handleAuth={handleAuth}
        loading={loading}
      />
    );
  }

  // Main App UI - Show HomePage or ChatWindow based on currentView
  if (currentView === "home") {
    return (
      <HomePage
        onStartChat={handleStartChat}
        user={user}
        logout={logout}
      />
    );
  }

  return (
    <ChatWindow
      messages={messages}
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
      loading={loading}
      chats={chats}
      currentChatId={currentChatId}
      createNewChat={createNewChat}
      loadChat={loadChat}
      deleteChat={deleteChat}
      user={user}
      logout={logout}
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
    />
  );
}

export default App;

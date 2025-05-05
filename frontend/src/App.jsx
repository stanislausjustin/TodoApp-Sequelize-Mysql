import React, { useState } from "react";
import Sign from "./Sign.jsx";
import TodoList from "./TodoList.jsx";

function App() {
  const [username, setUsername] = useState(null);

  const handleLogin = (user) => {
    setUsername(user);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  return (
    <div>
      {username ? (
        <TodoList username={username} onLogout={handleLogout} />
      ) : (
        <Sign onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

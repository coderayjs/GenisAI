import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage for existing user data
    const savedUser = localStorage.getItem('genisUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const registerUser = (walletAddress) => {
    const userData = {
      walletAddress,
      xp: 0,
      registeredAt: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('genisUser', JSON.stringify(userData));
  };

  const updateUserXP = (points) => {
    if (user) {
      const updatedUser = {
        ...user,
        xp: user.xp + points
      };
      setUser(updatedUser);
      localStorage.setItem('genisUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, registerUser, updateUserXP }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 
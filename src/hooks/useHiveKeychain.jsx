import { useState, useEffect } from 'react';

export const useHiveKeychain = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if Hive Keychain is installed
    const checkKeychain = () => {
      setIsInstalled(!!window.hive_keychain);
    };

    // Check immediately
    checkKeychain();

    // Check again after a short delay in case extension loads later
    const timer = setTimeout(checkKeychain, 1000);

    return () => clearTimeout(timer);
  }, []);

  const connectWallet = async (user) => {
    if (!isInstalled || !window.hive_keychain) {
      throw new Error('Hive Keychain not installed');
    }

    return new Promise((resolve) => {
      window.hive_keychain.requestSignBuffer(
        user,
        'RedHi DEX Login',
        'Posting',
        (response) => {
          if (response.success) {
            setIsConnected(true);
            setUsername(user);
            localStorage.setItem('redhi_username', user);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  };

  const disconnect = () => {
    setIsConnected(false);
    setUsername('');
    localStorage.removeItem('redhi_username');
  };

  const signTransaction = async (operation) => {
    if (!isInstalled || !window.hive_keychain || !username) {
      throw new Error('Wallet not connected');
    }

    return new Promise((resolve) => {
      window.hive_keychain.requestCustomJson(
        username,
        'redhi_dex',
        'Active',
        JSON.stringify(operation),
        'RedHi DEX Transaction',
        (response) => {
          resolve(response);
        }
      );
    });
  };

  // Check for saved username on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('redhi_username');
    if (savedUsername && isInstalled) {
      setUsername(savedUsername);
      setIsConnected(true);
    }
  }, [isInstalled]);

  return {
    isInstalled,
    isConnected,
    username,
    connectWallet,
    disconnect,
    signTransaction,
  };
};
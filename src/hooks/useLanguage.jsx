// src/hooks/useLanguage.js
import { useState, useEffect } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return { language, setLanguage };
};

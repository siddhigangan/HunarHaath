// src/google-translate.d.ts

interface GoogleTranslateElement {
    new (options: { 
      pageLanguage: string; 
      includedLanguages: string; 
      layout: any; 
    }, elementId: string): void;
  }
  
  interface Window {
    google: {
      translate: {
        TranslateElement: GoogleTranslateElement;
        InlineLayout: {
          SIMPLE: number;
          RIGHT: number;
          HORIZONTAL: number;
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
  

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Play, Check } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  height?: string;
  language?: string;
  readOnly?: boolean;
  onRun?: (code: string) => void;
  onCheck?: (code: string) => void;
}

// Simple code editor component (in a real app, you would use Monaco Editor)
const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '// Write your code here',
  height = '300px',
  language = 'javascript',
  readOnly = false,
  onRun,
  onCheck
}) => {
  const { theme, isKidsMode } = useTheme();
  const [code, setCode] = useState(initialCode);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleRun = () => {
    if (onRun) {
      onRun(code);
    } else {
      console.log('Code executed:', code);
    }
  };

  const handleCheck = () => {
    if (onCheck) {
      onCheck(code);
    } else {
      console.log('Code checked:', code);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editorRef.current!.selectionStart;
      const end = editorRef.current!.selectionEnd;
      
      // Insert 2 spaces when tab is pressed
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      
      // Move cursor to the right position
      setTimeout(() => {
        editorRef.current!.selectionStart = start + 2;
        editorRef.current!.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className={`flex flex-col rounded-xl overflow-hidden border ${isKidsMode ? 'border-4 border-kids-primary shadow-lg' : 'border-border'}`}>
      <div className={`flex justify-between items-center px-4 py-2 ${isKidsMode ? 'bg-kids-primary text-white' : 'bg-secondary text-foreground'}`}>
        <span className={`font-medium ${isKidsMode ? 'text-lg' : ''}`}>{language.toUpperCase()} Editor</span>
        <div className="flex gap-2">
          {onCheck && (
            <Button 
              onClick={handleCheck}
              size={isKidsMode ? "lg" : "sm"} 
              className={`flex items-center gap-2 ${isKidsMode ? 'bg-white text-kids-primary hover:bg-white/90' : 'bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90'}`}
            >
              <Check size={isKidsMode ? 20 : 16} />
              <span>Check Code</span>
            </Button>
          )}
          <Button 
            onClick={handleRun}
            size={isKidsMode ? "lg" : "sm"} 
            className={`flex items-center gap-2 ${isKidsMode ? 'bg-kids-accent text-white hover:bg-kids-accent/90' : 'bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90'}`}
          >
            <Play size={isKidsMode ? 20 : 16} />
            <span>Run Code</span>
          </Button>
        </div>
      </div>
      
      <textarea
        ref={editorRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        style={{ 
          height,
          resize: 'none',
          fontFamily: 'monospace',
          padding: '1rem',
          fontSize: isKidsMode ? '1.125rem' : '0.875rem',
          lineHeight: '1.5',
          background: theme === 'dark' ? '#1e1e1e' : '#f8f8f8',
          color: theme === 'dark' ? '#d4d4d4' : '#1e1e1e'
        }}
        className={`w-full focus:outline-none transition-colors code-font`}
      />
    </div>
  );
};

export default CodeEditor;

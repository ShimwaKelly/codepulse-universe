
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Play, Check } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  code?: string;
  value?: string;
  height?: string;
  language?: string;
  readOnly?: boolean;
  theme?: string; // Add theme prop
  onRun?: (code: string) => void;
  onCheck?: (code: string) => void;
  onChange?: (code: string) => void;
  setCode?: React.Dispatch<React.SetStateAction<string>>;
}

// Simple code editor component (in a real app, you would use Monaco Editor)
const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '// Write your code here',
  code,
  value,
  height = '300px',
  language = 'javascript',
  readOnly = false,
  theme: themeProp, // Theme prop from parent
  onRun,
  onCheck,
  onChange,
  setCode: setCodeProp
}) => {
  const { theme, isKidsMode } = useTheme();
  const [internalCode, setInternalCode] = useState(code || value || initialCode);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Update internal code when props change
  useEffect(() => {
    if (code !== undefined && code !== internalCode) {
      setInternalCode(code);
    } else if (value !== undefined && value !== internalCode) {
      setInternalCode(value);
    }
  }, [code, value, internalCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setInternalCode(newCode);
    
    // Call the appropriate callback/setter
    if (onChange) {
      onChange(newCode);
    }
    if (setCodeProp) {
      setCodeProp(newCode);
    }
  };

  const handleRun = () => {
    if (onRun) {
      onRun(internalCode);
    } else {
      console.log('Code executed:', internalCode);
    }
  };

  const handleCheck = () => {
    if (onCheck) {
      onCheck(internalCode);
    } else {
      console.log('Code checked:', internalCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editorRef.current!.selectionStart;
      const end = editorRef.current!.selectionEnd;
      
      // Insert 2 spaces when tab is pressed
      const newCode = internalCode.substring(0, start) + '  ' + internalCode.substring(end);
      setInternalCode(newCode);
      
      // Call callbacks
      if (onChange) onChange(newCode);
      if (setCodeProp) setCodeProp(newCode);
      
      // Move cursor to the right position
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = start + 2;
          editorRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Determine which theme to use - either from props or from context
  const activeTheme = themeProp || (theme === 'dark' ? 'vs-dark' : 'light');

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
        value={internalCode}
        onChange={handleCodeChange}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        style={{ 
          height,
          resize: 'none',
          fontFamily: 'monospace',
          padding: '1rem',
          fontSize: isKidsMode ? '1.125rem' : '0.875rem',
          lineHeight: '1.5',
          background: activeTheme === 'vs-dark' ? '#1e1e1e' : '#f8f8f8',
          color: activeTheme === 'vs-dark' ? '#d4d4d4' : '#1e1e1e'
        }}
        className={`w-full focus:outline-none transition-colors code-font`}
      />
    </div>
  );
};

export default CodeEditor;

// consoleLogger.js

let logs = [];
const originalConsole = { ...console };

export const startLogging = () => {
  logs = [];
  console.log = (...args) => {
    logs.push({ type: 'log', content: args });
    originalConsole.log(...args);
  };
  console.warn = (...args) => {
    logs.push({ type: 'warn', content: args });
    originalConsole.warn(...args);
  };
  console.error = (...args) => {
    logs.push({ type: 'error', content: args });
    originalConsole.error(...args);
  };
};

export const stopLogging = () => {
  console.log = originalConsole.log;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
};

export const getLogs = () => logs;

export const downloadLogs = () => {
  const now = new Date();
  const fileName = `uploadParser_console_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  
  const content = logs.map(log => `[${log.type.toUpperCase()}] ${JSON.stringify(log.content)}`).join('\n');
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName + '.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
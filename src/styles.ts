import styled, { createGlobalStyle, keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 5px var(--glow-color); }
  50% { box-shadow: 0 0 20px var(--glow-color), 0 0 30px var(--glow-color-secondary); }
  100% { box-shadow: 0 0 5px var(--glow-color); }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Light Mode - High-Tech Crystal */
    --background-color: #E2E8F0;
    --background-gradient: linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%);
    --text-color: #1E293B;
    --heading-color: #2563EB;
    --secondary-text: #475569;
    --button-bg: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
    --button-hover: linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%);
    --button-text: #FFFFFF;
    --link-color: #2563EB;
    --nav-bg: rgba(255, 255, 255, 0.7);
    --border-color: rgba(203, 213, 225, 0.4);
    --hover-color: rgba(255, 255, 255, 0.9);
    --glass-shadow: rgba(148, 163, 184, 0.2);
    --glass-border: rgba(255, 255, 255, 0.3);
    --glow-color: rgba(37, 99, 235, 0.5);
    --glow-color-secondary: rgba(59, 130, 246, 0.3);
    --panel-bg: rgba(255, 255, 255, 0.7);
    --table-header-bg: rgba(255, 255, 255, 0.9);
  }

  [data-theme='dark'] {
    /* Dark Mode - Cyberpunk Crystal */
    --background-color: #0F172A;
    --background-gradient: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    --text-color: #E2E8F0;
    --heading-color: #60A5FA;
    --secondary-text: #94A3B8;
    --button-bg: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
    --button-hover: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
    --button-text: #FFFFFF;
    --link-color: #60A5FA;
    --nav-bg: rgba(15, 23, 42, 0.7);
    --border-color: rgba(51, 65, 85, 0.4);
    --hover-color: rgba(30, 41, 59, 0.9);
    --glass-shadow: rgba(37, 99, 235, 0.2);
    --glass-border: rgba(37, 99, 235, 0.3);
    --glow-color: rgba(96, 165, 250, 0.5);
    --glow-color-secondary: rgba(59, 130, 246, 0.3);
    --panel-bg: rgba(15, 23, 42, 0.7);
    --table-header-bg: rgba(15, 23, 42, 0.95);
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--background-gradient);
    color: var(--text-color);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease;
  }
`;

export const AppContainer = styled.div`
  display: grid;
  grid-template-rows: auto 300px 1fr;
  height: 100vh;
  padding: 1rem;
  gap: 1rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--nav-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  box-shadow: 0 8px 32px -4px var(--glass-shadow);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 12px 40px -8px var(--glass-shadow);
    background: var(--hover-color);
  }
`;

export const EditorContainer = styled.div`
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--panel-bg);
  box-shadow: 0 8px 32px -4px var(--glass-shadow);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 12px 40px -8px var(--glass-shadow);
    background: var(--hover-color);
  }
`;

export const ResultsContainer = styled.div`
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: var(--panel-bg);
  box-shadow: 0 8px 32px -4px var(--glass-shadow);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 12px 40px -8px var(--glass-shadow);
    background: var(--hover-color);
  }

  .virtuoso-grid-list {
    padding: 0 !important;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.variant === 'primary' ? 'var(--button-bg)' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'var(--button-text)' : 'var(--text-color)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-size: 200% 200%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px var(--glow-color);
    background: ${props => props.variant === 'primary' ? 'var(--button-hover)' : 'var(--hover-color)'};
    animation: ${gradientMove} 3s ease infinite;
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const QuerySelector = styled.select`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
  background: var(--nav-bg);
  color: var(--text-color);
  cursor: pointer;
  min-width: 200px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  &:hover {
    border-color: var(--link-color);
    box-shadow: 0 0 20px var(--glow-color);
  }

  option {
    background: var(--background-color);
    color: var(--text-color);
  }
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    background: var(--table-header-bg);
    font-weight: 600;
    color: var(--heading-color);
    position: sticky;
    top: 0;
    z-index: 1;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  td {
    color: var(--text-color);
    transition: all 0.3s ease;
    background: var(--panel-bg);
  }

  tbody tr {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      background: var(--hover-color);
      td {
        border-bottom-color: var(--link-color);
      }
    }
  }

  /* Column widths */
  th:nth-child(1), td:nth-child(1) { width: 15%; }
  th:nth-child(2), td:nth-child(2) { width: 35%; }
  th:nth-child(3), td:nth-child(3) { width: 25%; }
  th:nth-child(4), td:nth-child(4) { width: 25%; }
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  margin: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  color: #EF4444;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--panel-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--heading-color);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 10;
`;

export const StatusBar = styled.div`
  padding: 0.5rem 1rem;
  background: var(--nav-bg);
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
  color: var(--secondary-text);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;
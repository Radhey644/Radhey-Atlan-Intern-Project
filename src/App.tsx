import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { Moon, Sun, Play, Copy, Download, Loader2 } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { sampleQueries, mockResults } from './mockData';
import {
  AppContainer,
  GlobalStyle,
  Header,
  EditorContainer,
  ResultsContainer,
  Button,
  QuerySelector,
  Table,
  ErrorMessage,
  LoadingOverlay,
  StatusBar
} from './styles';
import { TableData, QueryHistoryItem } from './types';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [selectedQuery, setSelectedQuery] = useState(sampleQueries[0].id);
  const [queryContent, setQueryContent] = useState(sampleQueries[0].sql);
  const [results, setResults] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>(() => {
    const saved = localStorage.getItem('queryHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('queryHistory', JSON.stringify(queryHistory));
  }, [queryHistory]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const query = sampleQueries.find(q => q.id === event.target.value);
    if (query) {
      setSelectedQuery(query.id);
      setQueryContent(query.sql);
      setError(null);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setQueryContent(value);
      setError(null);
    }
  };

  const executeQuery = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate query execution delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!queryContent.trim()) {
        throw new Error('Query cannot be empty');
      }

      if (!queryContent.toLowerCase().includes('select')) {
        throw new Error('Only SELECT queries are supported');
      }

      const result = mockResults[selectedQuery];
      if (!result) {
        throw new Error('No results found for this query');
      }

      setResults(result);
      
      const historyItem: QueryHistoryItem = {
        id: Date.now().toString(),
        query: queryContent,
        timestamp: Date.now(),
      };
      setQueryHistory(prev => [historyItem, ...prev].slice(0, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while executing the query');
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, [selectedQuery, queryContent]);

  const copyQuery = () => {
    navigator.clipboard.writeText(queryContent);
  };

  const exportData = () => {
    if (!results) return;
    
    const csv = [
      results.columns.join(','),
      ...results.rows.map(row => 
        results.columns.map(col => JSON.stringify(row[col])).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query-results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        executeQuery();
      } else if (e.ctrlKey && e.key === 'k') {
        const select = document.querySelector('select');
        if (select) select.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [executeQuery]);

  const columnHelper = createColumnHelper<any>();
  const columns = useMemo(() => 
    results?.columns.map(col => 
      columnHelper.accessor(col, {
        header: col,
        cell: info => info.getValue(),
      })
    ) ?? [], [results?.columns]
  );

  const table = useReactTable({
    data: results?.rows ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <QuerySelector value={selectedQuery} onChange={handleQueryChange}>
              {sampleQueries.map(query => (
                <option key={query.id} value={query.id}>
                  {query.name}
                </option>
              ))}
            </QuerySelector>
            <Button variant="primary" onClick={executeQuery} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
              Run Query
            </Button>
            <Button onClick={copyQuery}>
              <Copy size={16} />
            </Button>
            {results && (
              <Button onClick={exportData}>
                <Download size={16} />
              </Button>
            )}
          </div>
          <Button onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </Button>
        </Header>

        <EditorContainer>
          <Editor
            height="300px"
            defaultLanguage="sql"
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            value={queryContent}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </EditorContainer>

        <ResultsContainer>
          {loading && (
            <LoadingOverlay>
              <Loader2 className="animate-spin" size={24} />
              <span>Executing query...</span>
            </LoadingOverlay>
          )}
          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
          {results && !loading && !error && (
            <>
              <StatusBar>
                {results.rows.length} rows returned
              </StatusBar>
              <Virtuoso
                style={{ height: 'calc(100% - 30px)' }}
                totalCount={results.rows.length}
                itemContent={index => (
                  <Table>
                    {index === 0 && (
                      <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                              <th key={header.id}>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                    )}
                    <tbody>
                      <tr>
                        {table.getRowModel().rows[index].getVisibleCells().map(cell => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </Table>
                )}
              />
            </>
          )}
        </ResultsContainer>
      </AppContainer>
    </>
  );
}

export default App;
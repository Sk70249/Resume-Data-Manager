import React, { useState, useEffect } from 'react';
import { Plus, ClipboardCopy, FolderPlus, Trash2 } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { ResumeEntry, Group } from './types';
import { FileText } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [entries, setEntries] = useState<ResumeEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroup, setNewGroup] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Temporarily store entries in local storage
  useEffect(() => {
    const savedEntries = localStorage.getItem('entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    
    const savedGroups = localStorage.getItem('groups');
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    }
  }, []);

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroup.trim()) return;

    const group = {
      id: crypto.randomUUID(),
      name: newGroup.trim(),
      user_id: 'local',
      created_at: new Date().toISOString()
    };

    const updatedGroups = [...groups, group];
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setNewGroup('');
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    const entry = {
      id: crypto.randomUUID(),
      content: newEntry.trim(),
      group_id: selectedGroup
    };

    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
    setNewEntry('');
  };

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
  };

  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
  };

  const filteredEntries = selectedGroup
    ? entries.filter(entry => entry.group_id === selectedGroup)
    : entries;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#0A0C10] text-gray-100">
        <div className="max-w-4xl mx-auto p-8">
          <header className="flex items-center gap-4 mb-12">
            <div className="bg-blue-600 p-3 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Resume Handler</h1>
              <p className="text-gray-400 text-sm">Store and manage your resume data</p>
            </div>
            <ThemeToggle />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#0E1117] rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Groups</h2>
              <form onSubmit={handleAddGroup} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    placeholder="New group name..."
                    className="flex-1 bg-[#161B22] border-0 rounded-lg p-2 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                  >
                    <FolderPlus className="w-5 h-5" />
                  </button>
                </div>
              </form>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    selectedGroup === null ? 'bg-blue-600' : 'hover:bg-[#161B22]'
                  }`}
                >
                  All Items
                </button>
                {groups.map(group => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedGroup === group.id ? 'bg-blue-600' : 'hover:bg-[#161B22]'
                    }`}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="bg-[#0E1117] rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-2">Add Resume Item</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Enter your resume information and click the "Add" button or press Enter.
                </p>
                
                <form onSubmit={handleAddEntry} className="flex gap-2">
                  <input
                    type="text"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="Add a resume item..."
                    className="flex-1 bg-[#161B22] border-0 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                    aria-label="Resume item input"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                    aria-label="Add new item"
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </form>
              </div>

              <div className="bg-[#0E1117] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Your Resume Items</h2>
                  <span className="text-blue-400 text-sm">{filteredEntries.length} items</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Click the copy button to copy an item to your clipboard.
                </p>

                <div className="space-y-2">
                  {filteredEntries.map(entry => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-2 p-4 bg-[#161B22] rounded-lg group"
                    >
                      <p className="flex-1 text-gray-300">{entry.content}</p>
                      <button
                        onClick={() => handleCopy(entry.content)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        aria-label="Copy to clipboard"
                      >
                        <ClipboardCopy className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {filteredEntries.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      No items yet. Start by adding some resume data above.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center text-gray-500 text-sm">
            Resume Handler — Designed with precision and care
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
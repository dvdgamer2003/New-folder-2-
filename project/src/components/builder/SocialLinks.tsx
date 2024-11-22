import { useState } from 'react';
import { useTemplateStore } from '../../store/useTemplateStore';
import { Plus, Trash2, Link as LinkIcon, Edit2 } from 'lucide-react';

export default function SocialLinks() {
  const { links, addLink, removeLink, updateLink } = useTemplateStore();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (newUrl && newTitle) {
      addLink(newUrl, newTitle);
      setNewUrl('');
      setNewTitle('');
    }
  };

  const handleUpdate = (oldUrl: string) => {
    if (newUrl && newTitle) {
      updateLink(oldUrl, newUrl, newTitle);
      setIsEditing(null);
      setNewUrl('');
      setNewTitle('');
    }
  };

  const startEditing = (url: string, title: string) => {
    setIsEditing(url);
    setNewUrl(url);
    setNewTitle(title);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Links & Profiles</h2>
      
      {/* Add New Link Form */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Link Title (e.g., LinkedIn, Portfolio)"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        />
        <input
          type="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="URL (https://...)"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Link
        </button>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {links.map(({ url, title }) => (
          <div
            key={url}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            {isEditing === url ? (
              <>
                <div className="flex-1 flex space-x-4">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleUpdate(url)}
                    className="text-green-600 hover:text-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(null);
                      setNewUrl('');
                      setNewTitle('');
                    }}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <LinkIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{title}</div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 hover:text-purple-700"
                    >
                      {url}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startEditing(url, title)}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeLink(url)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

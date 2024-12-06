import React, { useState } from 'react';
import axios from 'axios';
import { Clock, LinkIcon, Info, RefreshCw } from 'lucide-react';

export default function Scraper() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleScrape = async () => {
    setError('');
    if (!url) {
        setError('Please enter a URL.');
        return;
    }

    setIsLoading(true);
    try {
        const response = await axios.get(`https://us-central1-ai-tools-6d313.cloudfunctions.net/api/scrape-tools?url=${encodeURIComponent(url)}`);
        setResults(response.data);
    } catch (err) {
        setError('Error scraping the URL. Please check the URL and try again.');
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Web Scraper</h1>
          <div className="flex gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to scrape"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              onClick={handleScrape}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                'Scrape'
              )}
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => {
            // Alternate between blue and orange cards
            const isBlue = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl p-6 ${
                  isBlue ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white'
                }`}
              >
                {/* Removed top-right logo */}
                {/* <div className="absolute right-4 top-4 flex items-center gap-2">
                  <button className="rounded-lg bg-white/20 p-2 hover:bg-white/30">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  {item.toolIcon && (
                    <img
                      src={item.toolIcon}
                      alt=""
                      className="h-8 w-8 rounded-full border-2 border-white/50"
                    />
                  )}
                </div> */}

                <div className="space-y-4">
                  {item.toolIcon && (
                    <div className="flex justify-center mb-4">
                      <img
                        src={item.toolIcon}
                        alt=""
                        className="h-16 w-16 rounded-full border-2 border-white/50"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">{item.toolName}</h2>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 opacity-80" />
                      <span className="text-sm opacity-80">Last updated: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 opacity-80" />
                      <span className="text-sm opacity-80">Source URL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 opacity-80" />
                      <p className="text-sm opacity-80 line-clamp-2">{item.toolInfoLink}</p>
                    </div>
                  </div>

                  <a
                    href={item.toolInfoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg bg-white/20 px-4 py-2 text-center font-medium hover:bg-white/30"
                  >
                    View Details
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


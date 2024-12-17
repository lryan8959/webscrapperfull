import React, { useState } from 'react';
import axios from 'axios';
import './ScrapeLink.css'; // Import the CSS file for styling

const ScrapeLink = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        // Validate URL
        if (!url) {
            setError('Please enter a valid URL.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/scrape-tools?url=${encodeURIComponent(url)}`);
            setResult(response.data);
        } catch (err) {
            // Check if the error response exists and extract the message
            const errorMessage = err.response?.data?.message || 'Failed to scrape the URL. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scrape-link">
            <h1>Scrape Link</h1>
            <form onSubmit={handleSubmit} className="scrape-form">
                <input
                    type="url"
                    placeholder="Enter URL to scrape"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="url-input"
                    disabled={loading} // Disable input while loading
                />
                <button type="submit" disabled={loading} className="scrape-button">
                    {loading ? 'Scraping...' : 'Scrape'}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {result && (
                <div className="result">
                    <h2>Result:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ScrapeLink;
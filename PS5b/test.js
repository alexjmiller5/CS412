
// Dynamic import of node-fetch
let fetch;

import('node-fetch').then(nodeFetch => {
    fetch = nodeFetch.default;

    // Make sure to place the code that uses 'fetch' here, or ensure 'fetch' is
    // defined before you use it elsewhere in your script. For example:

    // Ensure your API key is correct and active. Replace 'YOUR_API_KEY' with your actual key.
    const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRkZTQ4ZDhlLWRmNjYtNGNmZC1iYjVhLTdlNDlkOGJjOGQ5MCIsImlhdCI6MTY5NzY4NDcxMCwic3ViIjoiZGV2ZWxvcGVyLzQ1ZDg4ZDI0LWMxZDUtYTBmYy0yMzM3LWYwMGYzMzVlZDYxMiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTMwLjQ0LjEwNC45NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.6OvaCb-s96KJrrhqSjH-7kclHeCR5KFn4YHiBoMMeqwMctRFYJ_nlut0XWfPbBkNTUDAcBQgu54UburyC4vSlA';

    function getBrawlers() {
      const url = 'https://api.brawlstars.com/v1/brawlers';

      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        }
      };

      return fetch(url, options)
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => { throw err; });
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          return data;
        })
        .catch(error => {
          console.error('Error during fetch:', error);
          throw error;
        });
    }

    // Calling the function and handling the Promise's resolved/rejected states.
    getBrawlers()
      .then(data => {
        console.log('Brawlers data:', data);
      })
      .catch(error => {
        console.error('Error fetching brawlers:', error);
      });
});

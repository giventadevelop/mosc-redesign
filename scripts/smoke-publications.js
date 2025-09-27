const http = require('http');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4028; // adjust to your running dev server port

const options = {
  hostname: host,
  port,
  path: '/publications',
  method: 'GET',
  headers: {
    'User-Agent': 'smoke-test'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    if (data.includes('Publications') && data.includes('Malankara')) {
      console.log('SMOKE OK: Publications page contains expected text');
      process.exit(0);
    } else {
      console.error('SMOKE FAIL: Publications page missing expected content');
      process.exit(2);
    }
  });
});

req.on('error', (e) => {
  console.error('SMOKE FAIL: Request error', e.message);
  process.exit(2);
});

req.end();

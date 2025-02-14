import http from 'http';

import { datadog } from './utils/datadog';
import { log } from './utils/log';

// Used for health check
export function createAPI(): http.Server {
  const server = http.createServer((_req, res) => {
    datadog.check('main', datadog.CHECKS.OK);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        code: 200,
      })
    );
  });

  server.listen(8000, () => {
    log.info(`⛑   API started on port 8000`);
  });
  return server;
}

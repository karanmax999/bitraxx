// ecosystem.config.js — PM2 process config (Linux VM / Docker fallback)
// Usage: pm2 start ecosystem.config.js --env production
module.exports = {
  apps: [
    {
      name: 'brx-launchpad',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      restart_delay: 3000,
      max_restarts: 10,
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};

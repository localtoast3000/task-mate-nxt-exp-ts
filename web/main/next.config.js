require('dotenv').config({ path: '../../node_modules/shared.config/.env' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['shared.ui', 'shared.util', 'shared.config'],
};

module.exports = nextConfig;

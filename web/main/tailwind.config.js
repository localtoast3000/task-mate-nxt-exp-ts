/** @type {import('tailwindcss').Config} */
const resolveConfig = require('tailwindcss/resolveConfig');
const sharedTailwindConfig = require('shared.ui/tailwind.config');

module.exports = {
  ...resolveConfig(sharedTailwindConfig(['./src', '../../node_modules/shared.ui'])),
};

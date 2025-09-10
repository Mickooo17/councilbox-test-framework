import fs from 'fs';
import path from 'path';

const env = (process.env.TEST_ENV || 'dev').trim();
const configPath = path.join(__dirname, 'Application.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

if (!config[env]) {
    throw new Error(`Environment '${env}' not found in Application.json`);
}

// Export selected environment config for use in tests
export default config[env];

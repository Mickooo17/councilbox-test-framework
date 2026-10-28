import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env file (ignored by git)
dotenv.config({ path: path.join(__dirname, '.env') });

const env = (process.env.TEST_ENV || 'staging').trim();
const configPath = path.join(__dirname, 'Application.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

if (!config[env]) {
    throw new Error(`Environment '${env}' not found in Application.json`);
}

const envUpper = env.toUpperCase();

// Inject passwords from environment variables
const envConfig = config[env];
envConfig.users.admin.password = (process.env[`${envUpper}_ADMIN_PASSWORD`] || '').trim();
envConfig.users.adminProfessional.password = (process.env[`${envUpper}_ADMIN_PROFESSIONAL_PASSWORD`] || '').trim();
envConfig.users.superadmin.password = (process.env[`${envUpper}_SUPERADMIN_PASSWORD`] || '').trim();
if (envConfig.users.agentWithVideoAttention) {
    envConfig.users.agentWithVideoAttention.password = (process.env[`${envUpper}_AGENT_WITH_VIDEO_ATTENTION_PASSWORD`] || '').trim();
}
if (envConfig.users.entityAdministrator) {
    envConfig.users.entityAdministrator.password = (process.env[`${envUpper}_ENTITY_ADMINISTRATOR_PASSWORD`] || '').trim();
}

// Export selected environment config for use in tests
export default envConfig;

import { spawn } from 'child_process';
import path from 'path';

const sequelizeCliPath = path.resolve(__dirname, 'node_modules', '.bin', 'sequelize');
const configPath = path.resolve(__dirname, 'config', 'config.ts');

const migrateProcess = spawn('npx', [
  'ts-node',
  sequelizeCliPath,
  'db:migrate',
  '--config',
  configPath,
], {
  stdio: 'inherit',
  cwd: path.resolve(__dirname), // Ensure the command runs from the backend directory
});

migrateProcess.on('error', (err) => {
  console.error('Failed to start migration process:', err);
});

migrateProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Migration process exited with code ${code}`);
  } else {
    console.log('Migration process completed successfully.');
  }
});
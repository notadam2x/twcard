// --- 1. SINGLE SWITCH CONTROL ---
// Set this to TRUE for Mainnet (Real Money)
// Set this to FALSE for Nile Testnet (Simulation)
export const IS_MAINNET = true;

// --- 2. CONFIGURATION DATA ---
const MAINNET_CONFIG = {
    adapterNetwork: 'Mainnet',
    fullHost: 'https://api.trongrid.io',
};

const NILE_CONFIG = {
    adapterNetwork: 'Nile',
    fullHost: 'https://nile.trongrid.io',
};

// --- 3. EXPORT ACTIVE CONFIG ---
export const NETWORK_CONFIG = IS_MAINNET ? MAINNET_CONFIG : NILE_CONFIG;

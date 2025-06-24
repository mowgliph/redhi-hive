// src/utils/constants.js
import { Client } from '@hiveio/dhive';

// Hive blockchain client
export const dhive = new Client(['https://api.hive.blog']);

// Network configuration


// Token configuration
export const TOKENS = {
  HIVE: {
    symbol: 'HIVE',
    name: 'Hive',
    decimals: 3,
    blockchain: 'hive',
    totalSupply: 0 // Will be updated dynamically
  },
  HBD: {
    symbol: 'HBD',
    name: 'Hive Backed Dollar',
    decimals: 3,
    blockchain: 'hive',
    totalSupply: 0 // Will be updated dynamically
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    decimals: 8,
    blockchain: 'hive-engine', // Wrapped on Hive Engine
    totalSupply: 21000000
  },
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    blockchain: 'hive-engine', // Wrapped on Hive Engine
    totalSupply: 0
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    blockchain: 'hive-engine', // Wrapped on Hive Engine
    totalSupply: 0
  }
};

// Trading pairs
export const TRADING_PAIRS = [
  'HIVE_HBD',
  'BTC_HBD',
  'ETH_HBD',
  'HBD_USDT'
];

// Swap pairs
export const SWAP_PAIRS = [
  {
    id: 'HIVE_HBD',
    fromToken: TOKENS.HIVE,
    toToken: TOKENS.HBD,
    name: 'HIVE to HBD'
  },
  {
    id: 'HBD_HIVE',
    fromToken: TOKENS.HBD,
    toToken: TOKENS.HIVE,
    name: 'HBD to HIVE'
  },
  {
    id: 'BTC_HBD',
    fromToken: TOKENS.BTC,
    toToken: TOKENS.HBD,
    name: 'BTC to HBD'
  },
  {
    id: 'HBD_BTC',
    fromToken: TOKENS.HBD,
    toToken: TOKENS.BTC,
    name: 'HBD to BTC'
  },
  {
    id: 'ETH_HBD',
    fromToken: TOKENS.ETH,
    toToken: TOKENS.HBD,
    name: 'ETH to HBD'
  },
  {
    id: 'HBD_ETH',
    fromToken: TOKENS.HBD,
    toToken: TOKENS.ETH,
    name: 'HBD to ETH'
  },
  {
    id: 'HBD_USDT',
    fromToken: TOKENS.HBD,
    toToken: TOKENS.USDT,
    name: 'HBD to USDT'
  },
  {
    id: 'USDT_HBD',
    fromToken: TOKENS.USDT,
    toToken: TOKENS.HBD,
    name: 'USDT to HBD'
  }
];

// Trade types
export const TRADE_TYPES = {
  LIMIT: 'limit',
  MARKET: 'market'
};

// Trade sides
export const TRADE_SIDES = {
  BUY: 'buy',
  SELL: 'sell'
};

// Position sides
export const POSITION_SIDES = {
  LONG: 'long',
  SHORT: 'short'
};

// Default values
export const DEFAULT_LEVERAGE = 1;
export const MAX_LEVERAGE = 50;
export const SLIPPAGE_DEFAULT = 0.005; // 0.5%
export const DEFAULT_TIMEFRAME = '1d';

// Feature flags (for MVP)
export const FEATURES = {
  SWAP_ENABLED: true,
  SPOT_ENABLED: true,
  PERPETUAL_ENABLED: true,
  ORDERBOOK_VISUALIZATION: true,
  PRICE_CHARTS: true
};

// Chart themes
export const CHART_THEME = {
  upColor: '#26a69a',
  downColor: '#ef5350',
  backgroundColor: '#1e1e1e',
  textColor: '#d1d4dc',
  gridColor: '#2c2c2c'
};
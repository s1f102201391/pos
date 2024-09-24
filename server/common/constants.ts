export const APP_NAME = 'POSsupport';

export const BRANDED_ID_NAMES = ['user', 'task', 'pos'] as const;

export const WS_PATH = '/ws';

export const WS_TYPES = ['taskCreated', 'taskUpdated', 'taskDeleted'] as const;

export const WS_PING = 'ping';

export const WS_PONG = 'pong';

export const IS_PROD = process.env.NODE_ENV === 'production';

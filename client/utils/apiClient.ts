import aspida from '@aspida/axios';
import api from 'api/$api';
import axios from 'axios';
import { NEXT_PUBLIC_API_BASE_PATH } from './envValues';

export const apiAxios = axios.create({ withCredentials: true });

export const apiClient = api(aspida(apiAxios, { baseURL: NEXT_PUBLIC_API_BASE_PATH }));

// utils/result.ts
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export const Ok = <T>(value: T): Result<T> => ({ ok: true, value });
export const Err = <E>(error: E): Result<never, E> => ({ ok: false, error });

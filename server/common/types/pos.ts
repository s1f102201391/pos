import type { WORK_STATUSES } from 'api/@constants/index.ts';
import type { EntityId } from './brandedId';

type WorkBase = {
  id: EntityId['pos'];
  category: string;
  title: string;
  createdTime: number;
  status: string;
};

export type loadingWorkEntity = WorkBase & {
  status: (typeof WORK_STATUSES)[0];
  errorMsg: null;
};

export type CompletedWorkEntity = WorkBase & {
  status: (typeof WORK_STATUSES)[1];
  errorMsg: null;
};

export type FailedWorkEntity = WorkBase & {
  status: (typeof WORK_STATUSES)[2];
  errorMsg: string;
};

export type PosEntity = loadingWorkEntity | CompletedWorkEntity | FailedWorkEntity;

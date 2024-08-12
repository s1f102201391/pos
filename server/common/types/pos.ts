import type { WORK_STATUSES } from 'api/@constants/index.ts';
import type { EntityId } from './brandedId';

type WorkBase = {
  id: EntityId['task'];
  category: string;
  title: string;
  createdTime: number;
};

export type loadingWorkEntity = WorkBase & {
  status: (typeof WORK_STATUSES)[0];
  imageUrl: null;
  errorMsg: null;
};

export type CompletedWorkEntity = WorkBase & {
  status: (typeof WORK_STATUSES)[1];
  imageUrl: string;
  errorMsg: null;
};

export type FailedWorkEntity = WorkBase & {
  status: (typeof WORK_STATUSES)[2];
  imageUrl: null;
  errorMsg: string;
};

export type WorkEntity = loadingWorkEntity | CompletedWorkEntity | FailedWorkEntity;

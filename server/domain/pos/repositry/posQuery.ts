import type { Pos, Prisma } from '@prisma/client';
import { WORK_STATUSES } from 'api/@constants';
import type { PosEntity } from 'common/types/pos';
import { brandedId } from 'service/brandedId';
import { z } from 'zod';

const toPosEntity = async (prismaPos: Pos): Promise<PosEntity> => {
  const status = z.enum(WORK_STATUSES).parse(prismaPos.status);
  const id = brandedId.pos.entity.parse(prismaPos.id);

  switch (status) {
    case 'loading':
      return {
        id,
        status,
        category: prismaPos.category,
        title: prismaPos.title,
        createdTime: prismaPos.createdAt.getTime(),
        errorMsg: null,
      };
    case 'completed':
      return {
        id,
        status,
        category: prismaPos.category,
        title: prismaPos.title,
        createdTime: prismaPos.createdAt.getTime(),
        errorMsg: null,
      };
    case 'failed':
      return {
        id,
        status,
        category: prismaPos.category,
        title: prismaPos.title,
        createdTime: prismaPos.createdAt.getTime(),
        errorMsg: z.string().parse(prismaPos.errorMsg),
      };
    /* v8 ignore next 2 */
    default:
      throw new Error(status satisfies never);
  }
};

export const workQuery = {
  listAll: (tx: Prisma.TransactionClient): Promise<PosEntity[]> =>
    tx.pos
      .findMany({ orderBy: { createdAt: 'desc' } })
      .then((pos) => Promise.all(pos.map(toPosEntity))),
};

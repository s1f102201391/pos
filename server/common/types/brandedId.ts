import type { BRANDED_ID_NAMES } from 'common/constants';
import type { z } from 'zod';

type IdName = (typeof BRANDED_ID_NAMES)[number];

type Branded<T extends string> = string & z.BRAND<T>;

type Dto<T extends IdName> = string & z.BRAND<`${T}DtoId`>;

type Entity<T extends IdName> = string & z.BRAND<`${T}EntityId`>;

export type DtoId = { [T in IdName]: Dto<T> };

export type MaybeId = { [T in IdName]: Entity<T> | Branded<'maybe'> };

export type PostoId = { [T in IdName]: Dto<T> };

export type EntityId = { [T in IdName]: Entity<T> };

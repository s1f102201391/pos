import type { Prisma } from '@prisma/client';
import type { RealData, ScrapedSyllabusData } from 'common/types/class';

const scrapeAndSaveSyllabus = async (
  tx: Prisma.TransactionClient,
  scrapedData: ScrapedSyllabusData[],
): Promise<RealData[] | null> => {
  const syllabusData = await tx.syllabus.findMany({
    where: { faculty: { name: '情報連携学部' }, department: { name: '情報連携学科' } },
  });
  if (scrapedData.length === 0) return null;

  return syllabusData;
};

export { scrapeAndSaveSyllabus };

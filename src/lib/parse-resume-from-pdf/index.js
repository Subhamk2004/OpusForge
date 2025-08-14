import { readPdf } from "@/lib/parse-resume-from-pdf/read-pdf";
import { groupTextItemsIntoLines } from "@/lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "@/lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections";

export const parseResumeFromPdf = async (fileUrl) => {
  const textItems = await readPdf(fileUrl);
  const lines = groupTextItemsIntoLines(textItems);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);
  return resume;
};

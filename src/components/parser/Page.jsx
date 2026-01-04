"use client"
import { useState, useEffect } from "react";
import { readPdf } from "@/lib/parse-resume-from-pdf/read-pdf";
import { groupTextItemsIntoLines } from "@/lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "@/lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "@/components/parser/ResumeDropzone";
import { Link } from "@/components/documentation";
import { ResumeParserAlgorithmArticle } from "@/components/parser/ResumeParserAlgorithmArticle";

const RESUME_EXAMPLES = [
  {
    fileUrl: "resume-example/laverne-resume.pdf",
    description: (
      <span>
        Borrowed from University of La Verne Career Center -{" "}
        <Link href="https://laverne.edu/careers/wp-content/uploads/sites/15/2010/12/Undergraduate-Student-Resume-Examples.pdf">
          Link
        </Link>
      </span>
    ),
  },
  {
    fileUrl: "resume-example/openresume-resume.pdf",
    description: (
      <span>
        Created with OpenResume resume builder -{" "}
        <Link href="/resume-builder">Link</Link>
      </span>
    ),
  },
];

const defaultFileUrl = RESUME_EXAMPLES[0]["fileUrl"];

export default function ResumeParser({}) {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState([]);
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    async function test() {
      const textItems = await readPdf(fileUrl);
      setTextItems(textItems);
    }
    test();
  }, [fileUrl]);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="mt-3">
        <ResumeDropzone
          onFileUrlChange={(fileUrl) =>
            setFileUrl(fileUrl || defaultFileUrl)
          }
          playgroundView={true}
        />
      </div>
      <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
        <ResumeParserAlgorithmArticle
          textItems={textItems}
          lines={lines}
          sections={sections}
        />
      </div>
    </div>
  );
}
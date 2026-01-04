import { isBold } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import {
  Badge,
  Heading,
  Link,
  Paragraph,
  Table,
} from "@/components/documentation";
import { extractProfile } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTableObj } from "@/store/slices/SlightParsedData";

export const ResumeParserAlgorithmArticle = ({
  textItems,
  lines,
  sections,
}) => {

  let dispatch = useDispatch();

  const getBadgeContent = (item) => {
    const X1 = Math.round(item.x);
    const X2 = Math.round(item.x + item.width);
    const Y = Math.round(item.y);
    let content = `X₁=${X1} X₂=${X2} Y=${Y}`;
    if (X1 === X2) {
      content = `X=${X2} Y=${Y}`;
    }
    if (isBold(item)) {
      content = `${content} Bold`;
    }
    if (item.hasEOL) {
      content = `${content} NewLine`;
    }
    return content;
  };
  const step1TextItemsTable = [
    ["#", "Text Content", "Metadata"],
    ...textItems.map((item, idx) => [
      idx + 1,
      item.text,
      <Badge key={idx}>{getBadgeContent(item)}</Badge>,
    ]),
  ];

  const step2LinesTable = [
    ["Lines", "Line Content"],
    ...lines.map((line, idx) => [
      idx + 1,
      line.map((item, idx) => (
        <span key={idx}>
          {item.text}
          {idx !== line.length - 1 && (
            <span className="select-none font-extrabold text-sky-400">
              &nbsp;&nbsp;{"|"}&nbsp;&nbsp;
            </span>
          )}
        </span>
      )),
    ]),
  ];

  const { profile, profileScores } = extractProfile(sections);
  const Scores = ({ scores }) => {
    return (
      <>
        {scores
          .sort((a, b) => b.score - a.score)
          .map((item, idx) => (
            <span key={idx} className="break-all">
              <Badge>{item.score}</Badge> {item.text}
              <br />
            </span>
          ))}
      </>
    );
  };
  const step4ProfileFeatureScoresTable = [
    [
      "Resume Attribute",
      "Text (Highest Feature Score)",
      "Feature Scores of Other Texts",
    ],
    ["Name", profile.name, <Scores key={"Name"} scores={profileScores.name} />],
    [
      "Email",
      profile.email,
      <Scores key={"Email"} scores={profileScores.email} />,
    ],
    [
      "Phone",
      profile.phone,
      <Scores key={"Phone"} scores={profileScores.phone} />,
    ],
  ];

  return (
    <article className="mt-10">

      <div className="mt-4 max-h-72 overflow-y-scroll border scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 scrollbar-w-3">
        <Table
          table={step1TextItemsTable}
          className="!border-none"
          tdClassNames={["", "", "md:whitespace-nowrap"]}
        />
      </div>


      <div className="mt-4 max-h-96 overflow-y-scroll border scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 scrollbar-w-3">
        <Table table={step2LinesTable} className="!border-none" />
      </div>

      <Step3SectionsTable sections={sections} />

      <Table table={step4ProfileFeatureScoresTable} className="mt-4" />

      <Table
        table={step4NameFeatureSetsTable}
        title="Name Feature Sets"
        className="mt-4"
      />

      <Table table={step4CoreFeatureFunctionTable} className="mt-4" />

    </article>
  );
};

const step4NameFeatureSetsTable = [
  ["Feature Function", "Feature Matching Score"],
  ["Contains only letters, spaces or periods", "+3"],
  ["Is bolded", "+2"],
  ["Contains all uppercase letters", "+2"],
  ["Contains @", "-4 (match email)"],
  ["Contains number", "-4 (match phone)"],
  ["Contains ,", "-4 (match address)"],
  ["Contains /", "-4 (match url)"],
];

const step4CoreFeatureFunctionTable = [
  ["Resume Attribute", "Core Feature Function", "Regex"],
  ["Name", "Contains only letters, spaces or periods", "/^[a-zA-Z\\s\\.]+$/"],
  [
    "Email",
    <>
      Match email format xxx@xxx.xxx
      <br />
      xxx can be anything not space
    </>,
    "/\\S+@\\S+\\.\\S+/",
  ],
  [
    "Phone",
    <>
      Match phone format (xxx)-xxx-xxxx <br /> () and - are optional
    </>,
    "/\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4}/",
  ],
  [
    "Location",
    <>Match city and state format {"City, ST"}</>,
    "/[A-Z][a-zA-Z\\s]+, [A-Z]{2}/",
  ],
  ["Url", "Match url format xxx.xxx/xxx", "/\\S+\\.[a-z]+\\/\\S+/"],
  ["School", "Contains a school keyword, e.g. College, University, School", ""],
  ["Degree", "Contains a degree keyword, e.g. Associate, Bachelor, Master", ""],
  ["GPA", "Match GPA format x.xx", "/[0-4]\\.\\d{1,2}/"],
  [
    "Date",
    "Contains date keyword related to year, month, seasons or the word Present",
    "Year: /(?:19|20)\\d{2}/",
  ],
  [
    "Job Title",
    "Contains a job title keyword, e.g. Analyst, Engineer, Intern",
    "",
  ],
  ["Company", "Is bolded or doesn't match job title & date", ""],
  ["Project", "Is bolded or doesn't match date", ""],
];

const Step3SectionsTable = ({ sections }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!sections || Object.keys(sections).length === 0) return;
    
    const table = [["Lines", "Line Content"]];
    const trClassNames = [];
    let lineCounter = 0;
    const BACKGROUND_COLORS = [
      "bg-red-50",
      "bg-yellow-50",
      "bg-orange-50", 
      "bg-green-50",
      "bg-blue-50",
      "bg-purple-50",
    ];
    const sectionsEntries = Object.entries(sections);

    for (let i = 0; i < sectionsEntries.length; i++) {
      const sectionBackgroundColor = BACKGROUND_COLORS[i % 6];
      const [sectionTitle, lines] = sectionsEntries[i];
      table.push([
        sectionTitle === "profile" ? "" : lineCounter,
        sectionTitle === "profile" ? "PROFILE" : sectionTitle,
      ]);
      trClassNames.push(`${sectionBackgroundColor} font-bold`);
      lineCounter += 1;
      
      for (let j = 0; j < lines.length; j++) {
        const lineContent = lines[j].map(item => item.text).join(" | ");
        table.push([lineCounter, lineContent]);
        trClassNames.push(sectionBackgroundColor);
        lineCounter += 1;
      }
    }
    
    dispatch(addTableObj(table));
  }, [sections, dispatch]);

  const table = [["Lines", "Line Content"]];
  const trClassNames = [];
  let lineCounter = 0;
  const BACKGROUND_COLORS = [
    "bg-red-50",
    "bg-yellow-50", 
    "bg-orange-50",
    "bg-green-50",
    "bg-blue-50",
    "bg-purple-50",
  ];
  const sectionsEntries = Object.entries(sections);

  const Line = ({ line }) => {
    return (
      <>
        {line.map((item, idx) => (
          <span key={idx}>
            {item.text}
            {idx !== line.length - 1 && (
              <span className="select-none font-extrabold text-sky-400">
                &nbsp;&nbsp;{"|"}&nbsp;&nbsp;
              </span>
            )}
          </span>
        ))}
      </>
    );
  };

  for (let i = 0; i < sectionsEntries.length; i++) {
    const sectionBackgroundColor = BACKGROUND_COLORS[i % 6];
    const [sectionTitle, lines] = sectionsEntries[i];
    table.push([
      sectionTitle === "profile" ? "" : lineCounter,
      sectionTitle === "profile" ? "PROFILE" : sectionTitle,
    ]);
    trClassNames.push(`${sectionBackgroundColor} font-bold`);
    lineCounter += 1;
    for (let j = 0; j < lines.length; j++) {
      table.push([lineCounter, <Line key={lineCounter} line={lines[j]} />]);
      trClassNames.push(sectionBackgroundColor);
      lineCounter += 1;
    }
  }

  return (
    <div className="mt-4 max-h-96 overflow-y-scroll border scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 scrollbar-w-3">
      <Table
        table={table}
        className="!border-none"
        trClassNames={trClassNames}
      />
    </div>
  );
};
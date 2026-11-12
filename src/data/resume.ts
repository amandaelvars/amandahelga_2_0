/*
  Resume content.

  Each bullet can list the skills it shows. The skill filter at the top of the
  Resume page highlights every bullet tagged with the selected skill, so when you
  add a bullet, tag it with any skills from SKILLS that it demonstrates.
*/

export const SKILLS = [
    "UI/UX Design",
    "Data Visualization",
    "HCI",
    "Responsible AI",
    "AR",
    "Decision-Making",
    "Research",
    "Front-end Engineering",
] as const;

export type Skill = (typeof SKILLS)[number];

/** Each skill's color (defined per theme in index.css), taken from the home page art. */
export const SKILL_COLOR: Record<Skill, string> = {
    "UI/UX Design": "var(--skill-uiux)",
    "Data Visualization": "var(--skill-dataviz)",
    HCI: "var(--skill-hci)",
    "Responsible AI": "var(--skill-rai)",
    AR: "var(--skill-ar)",
    "Decision-Making": "var(--skill-decision)",
    Research: "var(--skill-research)",
    "Front-end Engineering": "var(--skill-frontend)",
};

export type Bullet = { text: string; skills?: Skill[] };

export type Entry = {
    org: string;
    location?: string;
    role: string;
    dates: string;
    bullets?: Bullet[];
    /** Skills for the entry as a whole (used when it has no bullets). */
    skills?: Skill[];
    /** Optional link to a portfolio page, e.g. "/portfolio/ar-juggling". */
    link?: string;
};

export type Section = { title: string; entries: Entry[] };

/** Shorthand for a tagged bullet. */
const b = (text: string, ...skills: Skill[]): Bullet => ({ text, skills });

export const resume: Section[] = [
    {
        title: "Education",
        entries: [
            {
                org: "University of Minnesota",
                location: "Minneapolis, MN",
                role: "M.S. in Computer Science",
                dates: "May 2026",
            },
            {
                org: "Northern Michigan University",
                location: "Marquette, MI",
                role: "B.S. in Computer Science, Minor in Math",
                dates: "May 2021",
            },
            {
                org: "Akureyri Junior College",
                location: "Akureyri, Iceland",
                role: "Matriculation Examination in Physics and Math",
                dates: "Jun. 2017",
            },
        ],
    },
    {
        title: "Experience",
        entries: [
            {
                org: "Kuratech ehf.",
                location: "Reykjavik, Iceland",
                role: "Software Engineer",
                dates: "Feb. 2026 – Present",
                bullets: [
                    b(
                        "Lead frontend engineering and UI/UX design, including a complete redesign of the core Icelandic application, its information architecture, and user workflows.",
                        "UI/UX Design",
                        "Front-end Engineering",
                    ),
                    b(
                        "Served as technical lead for the Estonian expansion, collaborating directly with bankruptcy trustees to define requirements and coordinate full-stack development.",
                    ),
                    b(
                        "Designed and developed the fraud detection tool’s frontend, contributing to backend development and complex financial data visualization.",
                        "Data Visualization",
                        "UI/UX Design",
                        "Front-end Engineering",
                    ),
                    b(
                        "Led the design and frontend development of kröfuhafi.is, a creditor claims portal, collaborating with backend engineering to launch the platform.",
                        "UI/UX Design",
                        "Front-end Engineering",
                    ),
                ],
            },
            {
                org: "Office of Teacher Education, University of Minnesota",
                location: "Minneapolis, MN",
                role: "Graduate Assistant (Administrative Fellowship), part-time",
                dates: "Aug. 2025 – May 2026",
                bullets: [
                    b(
                        "Analyzed data collected from teacher education programs at institutions across Minnesota.",
                        "Data Visualization",
                    ),
                    b(
                        "Created clear, easy-to-read data visualizations of each institution's results, making the findings simple to understand.",
                        "Data Visualization",
                    ),
                ],
            },
            {
                org: "Graduate Admissions Office, University of Minnesota",
                location: "Minneapolis, MN",
                role: "Administrative Fellow",
                dates: "Sep. 2024 – Aug. 2025",
                bullets: [
                    b(
                        "Responded to inquiries from prospective, current, and admitted students via email and phone, providing guidance on admissions processes and program requirements.",
                    ),
                    b(
                        "Collected and organized data on applicant trends and student inquiries to support process improvements and outreach strategies.",
                    ),
                    b(
                        "Helped plan and coordinate graduate admissions events, including info sessions, in collaboration with staff and student ambassadors.",
                    ),
                ],
            },
            {
                org: "Fagkaup ehf.",
                location: "Reykjavik, Iceland",
                role: "Front End Developer",
                dates: "May 2024 – Sep. 2024",
                bullets: [
                    b(
                        "Led the complete front-end development for the company’s new website, ensuring a responsive, user-friendly design and seamless integration with backend services.",
                        "Front-end Engineering",
                        "UI/UX Design",
                    ),
                    b(
                        "Solely responsible for maintaining and enhancing the company’s mobile apps, delivering regular updates, bug fixes, and feature improvements to improve user experience.",
                        "Front-end Engineering",
                    ),
                ],
            },
            {
                org: "Graco Inc.",
                location: "Minneapolis, MN",
                role: "Full Stack Developer",
                dates: "Oct. 2022 – May 2024",
                bullets: [
                    b(
                        "Developed and customized websites and web applications to meet changing requirements.",
                        "Front-end Engineering",
                    ),
                    b("Supported end users and functional analysts to perform integration and regression testing."),
                    b("Migrated legacy product to a cloud-based infrastructure."),
                ],
            },
            {
                org: "Modus",
                location: "Minneapolis, MN",
                role: "Software Developer",
                dates: "May 2021 – Aug. 2022",
                bullets: [
                    b(
                        "Worked on a major front-end upgrade to the main application that our users interface with, which led to fewer bugs and reduced development time.",
                        "Front-end Engineering",
                    ),
                    b(
                        "Built user-facing pages that require state management, data-binding and observer patterns that show my ability to problem solve.",
                        "Front-end Engineering",
                    ),
                ],
            },
            {
                org: "Northern Michigan University",
                location: "Marquette, MI",
                role: "IT Help Desk Technician",
                dates: "Aug. 2020 – May 2021",
                bullets: [
                    b("Assessed and troubleshot software, hardware, and network problems for students, faculty/staff, and retirees."),
                    b("Wrote technical reports to communicate common problems and outline solutions."),
                ],
            },
        ],
    },
    {
        title: "Research Experience",
        entries: [
            {
                org: "Dr. Zhu-Tian Chen’s Research Lab, University of Minnesota",
                location: "Minneapolis, MN",
                role: "Graduate Researcher",
                dates: "May 2025 – May 2026",
                bullets: [
                    b(
                        "Co-first author of an AR study (N = 32) on whether contextual information in physical environments helps people make better decisions with fallible AI; accepted to IEEE AIxVR 2027.",
                        "Research",
                        "HCI",
                        "AR",
                        "Decision-Making",
                        "Responsible AI",
                    ),
                    b(
                        "Investigated how interface design (AR vs. mobile) affects user decision-making and reliance on AI.",
                        "Research",
                        "HCI",
                        "AR",
                        "Decision-Making",
                        "Responsible AI",
                    ),
                    b(
                        "Led experimental design on decision context, risk level, and interface modality.",
                        "Research",
                        "HCI",
                        "Decision-Making",
                    ),
                    b(
                        "Conducted literature reviews on decision-making theories and risk perception.",
                        "Research",
                        "Decision-Making",
                    ),
                    b("Initiated and set up the website for the lab.", "Front-end Engineering", "UI/UX Design"),
                ],
            },
            {
                org: "JugglAR: AR for Motor Skill Learning, University of Minnesota",
                location: "Minneapolis, MN",
                role: "Co-first author",
                dates: "Sep. 2024 – Jan. 2025",
                link: "/portfolio/ar-juggling",
                bullets: [
                    b(
                        "Co-developed a hand-tracked AR juggling trainer for the Meta Quest 3 with adjustable ball speed and gravity.",
                        "AR",
                        "HCI",
                    ),
                    b(
                        "Designed the user study and instrumentation for a two-week study comparing AR training with physical practice.",
                        "Research",
                        "HCI",
                    ),
                    b("Explored slowed-down virtual trajectories for motor learning.", "AR", "Research"),
                    b(
                        "All four AR-trained participants learned to juggle real balls, compared with two of four who practiced only with physical balls.",
                        "Research",
                        "AR",
                    ),
                ],
            },
        ],
    },
    {
        title: "Publications",
        entries: [
            {
                org: "How Contextual Information in Physical Environments Shapes Decisions with AI",
                role: "O. Elgohary*, A. Elvarsdóttir*, V. Lee, Z. Chen. *Equal contribution.",
                dates: "IEEE AIxVR 2027 (accepted)",
                link: "/portfolio/contextual-ai-ar",
                skills: ["Research", "HCI", "AR", "Decision-Making", "Responsible AI"],
            },
            {
                org: "JugglAR: Exploring Mixed Reality for Enhanced Task Learning and Muscle Memory Formation",
                role: "H. Chandirasekar*, A. Elvarsdóttir*, A. Purohit, D. Blundell, Z. Chen. *Equal contribution.",
                dates: "Submitted to ACM",
                link: "/portfolio/ar-juggling",
                skills: ["Research", "AR", "HCI"],
            },
        ],
    },
    {
        title: "Selected Projects",
        entries: [
            {
                org: "Aurora Story: Tracing an Aurora From Solar Storm to Colored Sky",
                location: "Data Visualization course",
                role: "React, D3.js",
                dates: "Spring 2026",
                link: "/portfolio/aurora-vis",
                bullets: [
                    b(
                        "Team scrollytelling visualization of NOAA space weather data that follows an aurora from the solar wind to the colors it makes at different altitudes.",
                        "Data Visualization",
                        "Front-end Engineering",
                    ),
                ],
            },
            {
                org: "SourceLens: LLM-Based Assistant for Paper Reading",
                location: "CSCI 8615",
                role: "React, TypeScript, Tailwind, Gemini API",
                dates: "Fall 2025",
                link: "/portfolio/citation-ai-visualization",
                bullets: [
                    b(
                        "Designed the full interface layout and interaction flow through iterative sketches and UI prototypes.",
                        "UI/UX Design",
                        "HCI",
                    ),
                    b(
                        "Conducted user research by observing a participant using the app and identifying usability improvements.",
                        "Research",
                        "HCI",
                        "UI/UX Design",
                    ),
                    b(
                        "Built the keyword filter, favorites system and overview panel for an interactive canvas that combines paper reading, citations and LLM evidence.",
                        "Front-end Engineering",
                    ),
                ],
            },
        ],
    },
    {
        title: "Activities",
        entries: [
            {
                org: "Job Interview Mentorship",
                location: "Independent",
                role: "Mentor",
                dates: "Oct. 2022 – Present",
                bullets: [
                    b("Conducted one-on-one mock interviews with students to simulate real job interview scenarios."),
                    b("Provided constructive feedback on interview performance, focusing on strengths and areas for improvement."),
                    b("Shared insights on industry-specific interview trends and common questions to enhance students’ preparation."),
                ],
            },
            {
                org: "Student Research Mentorship",
                location: "University of Minnesota — Minneapolis, MN",
                role: "Research Mentor",
                dates: "Summer 2025",
                bullets: [
                    b(
                        "Mentored a student from the Research in Undergraduate Institutions (RUI) program through a summer research project.",
                        "Research",
                    ),
                ],
            },
            {
                org: "Diversity and Equality Committee",
                location: "Modus Engagement Inc. — Minneapolis, MN",
                role: "Founding Member",
                dates: "Jun. 2021 – Aug. 2022",
                bullets: [
                    b("Led initiatives to promote diversity and inclusion in the workplace."),
                    b("Developed and implemented strategies to foster an inclusive and equitable work environment."),
                ],
            },
        ],
    },
];

export const technicalSkills = [
    {
        label: "Languages / Frameworks",
        value: "Java, Python, C/C++, Swift, SQL, JavaScript, HTML/CSS, Objective-C, R, SmallTalk, Vue, Knockout, React, Typescript, REST API, Alpine",
    },
    {
        label: "Developer Tools",
        value: "Git, VS Code, Visual Studio, IntelliJ IDEA, Eclipse, Figma, Postman, Chrome Developer Tools, GitHub, Bitbucket, AEM",
    },
];

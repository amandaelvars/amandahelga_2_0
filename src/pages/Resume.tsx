import React from "react";
import { Link } from "react-router-dom";

export default function Resume() {
  return (
    <main className="bg-neutral-950 text-gray-100">
      {/* top spacer so content doesn't hide behind sticky navbar */}
      <div className="h-14" />

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <header className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
        </header>

        <hr className="my-6 border-neutral-800" />

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-wide text-gray-200">Education</h2>

          <Item
            org="University of Minnesota"
            location="Minneapolis, MN"
            role="M.S in Computer Science"
            dates="Currently"
          />

          <Item
            org="Northern Michigan University"
            location="Marquette, MI"
            role="B.S in Computer Science, Minor in Math"
            dates="May 2021"
          />

          <Item
            org="Akureyri Junior College"
            location="Akureyri, Iceland"
            role="Matriculation Examination in Physics and Math"
            dates="Jun. 2017"
          />
        </section>

        <hr className="my-6 border-neutral-800" />

        {/* Experience */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-wide text-gray-200">Experience</h2>
          <Item
            org="Graduate Admissions Office, University of Minnesota"
            location="Minneapolis, MN"
            role="Administrative Fellow"
            dates="Sep. 2024 – Aug. 2025"
            bullets={[
              "Responded to inquiries from prospective, current, and admitted students via email and phone, providing guidance on admissions processes and program requirements.",
              "Collected and organized data on applicant trends and student inquiries to support process improvements and outreach strategies.",
              "Helped plan and coordinate graduate admissions events, including info sessions, in collaboration with staff and student ambassadors."
            ]}
          />
          <Item
            org="Fagkaup ehf."
            location="Reykjavik, Iceland"
            role="Front End Developer"
            dates="May 2024 – Sep. 2024"
            bullets={[
              "Led the complete front-end development for the company’s new website, ensuring a responsive, user-friendly design and seamless integration with backend services.",
              "Solely responsible for maintaining and enhancing the company’s mobile apps, delivering regular updates, bug fixes, and feature improvements to improve user experience.",
            ]}
          />

          <Item
            org="Graco Inc."
            location="Minneapolis, MN"
            role="Full Stack Developer"
            dates="Oct. 2022 – May 2024"
            bullets={[
              "Developed and customized websites and web applications to meet changing requirements.",
              "Supported end users and functional analysts to perform integration and regression testing.",
              "Migrated legacy product to a cloud-based infrastructure.",
            ]}
          />

          <Item
            org="Modus"
            location="Minneapolis, MN"
            role="Software Developer"
            dates="May 2021 – Aug. 2022"
            bullets={[
              "Worked on a major front-end upgrade to the main application that our users interface with, which led to fewer bugs and reduced development time.",
              "Built user-facing pages that require state management, data-binding and observer patterns that show my ability to problem solve.",
            ]}
          />

          <Item
            org="Northern Michigan University"
            location="Marquette, MI"
            role="IT Help Desk Technician"
            dates="Aug. 2020 – May 2021"
            bullets={[
              "Assessed and troubleshot software, hardware, and network problems for students, faculty/staff, and retirees.",
              "Wrote technical reports to communicate common problems and outline solutions.",
            ]}
          />
        </section>

        <hr className="my-6 border-neutral-800" />



{/* Activities */}
<section className="space-y-4">
  <h2 className="text-lg font-semibold tracking-wide text-gray-200">Activities</h2>

  <Item
    org="Job Interview Mentorship"
    location="Independent"
    role="Mentor"
    dates="Oct. 2022 – Present"
    bullets={[
      "Conducted one-on-one mock interviews with students to simulate real job interview scenarios.",
      "Provided constructive feedback on interview performance, focusing on strengths and areas for improvement.",
      "Shared insights on industry-specific interview trends and common questions to enhance students’ preparation.",
    ]}
  />

  <Item
    org="Diversity and Equality Committee"
    location="Modus Engagement Inc. — Minneapolis, MN"
    role="Founding Member"
    dates="Jun. 2021 – Aug. 2022"
    bullets={[
      "Led initiatives to promote diversity and inclusion in the workplace.",
      "Developed and implemented strategies to foster an inclusive and equitable work environment.",
    ]}
  />
</section>

        <hr className="my-6 border-neutral-800" />

        {/* Technical Skills */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold tracking-wide text-gray-200">Technical Skills</h2>
          <div className="grid gap-2 text-gray-300">
            <div>
              <span className="font-medium text-gray-200">Languages / Frameworks: </span>
              Java, Python, C/C++, Swift, SQL, JavaScript, HTML/CSS, Objective-C, R, SmallTalk, Vue, Knockout, React, Typescript, REST API, Alpine
            </div>
            <div>
              <span className="font-medium text-gray-200">Developer Tools: </span>
              Git, VS Code, Visual Studio, IntelliJ IDEA, Eclipse, Figma, Postman, Chrome Developer Tools, GitHub, Bitbucket, AEM
            </div>
          </div>
        </section>

        

        {/* Back to home link (optional) */}
        <div className="mt-10">
          <Link to="/" className="text-sm text-gray-400 hover:text-brand">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}

/* ---------- Small presentational components ---------- */

type ItemProps = {
  org: string;
  location: string;
  role: string;
  dates: string;
  bullets?: string[];
};

function Item({ org, location, role, dates, bullets }: ItemProps) {
  return (
    <article className="space-y-1">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-semibold text-gray-200">{org} <span className="text-gray-400 font-normal">— {location}</span></h3>
        <div className="text-sm text-gray-400">{dates}</div>
      </div>
      <div className="italic text-gray-300">{role}</div>
      {bullets && bullets.length > 0 && (
        <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-300">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </article>
  );
}

type ProjectProps = {
  title: string;
  stack: string;
  dates: string;
  bullets?: string[];
};

function Project({ title, stack, dates, bullets }: ProjectProps) {
  return (
    <article className="space-y-1">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-semibold text-gray-200">{title}</h3>
        <div className="text-sm text-gray-400">{dates}</div>
      </div>
      <div className="text-gray-300"><span className="italic text-gray-400">Stack:</span> {stack}</div>
      {bullets && bullets.length > 0 && (
        <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-300">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </article>
  );
}

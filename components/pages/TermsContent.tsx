import { LegalPageLayout } from "@/components/ui/LegalPageLayout";
import { getSiteContent, SUPPORT_EMAIL, type Locale } from "@/lib/i18n";

export function TermsContent({ locale }: { locale: Locale }) {
  const page = getSiteContent(locale).terms;

  return (
    <LegalPageLayout
      title={page.title}
      description={page.description}
      updatedAt={page.updatedAt}
    >
      {page.sections.map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.list ? (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}

      <div>
        <h2>{page.contact.title}</h2>
        <p>
          {page.contact.prompt}{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-gold hover:text-gold-light"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </LegalPageLayout>
  );
}

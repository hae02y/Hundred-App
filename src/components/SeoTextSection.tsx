import { AppSeoContent } from '@/lib/seo';

type SeoTextSectionProps = {
  title: string;
  content: AppSeoContent;
};

export default function SeoTextSection({ title, content }: SeoTextSectionProps) {
  return (
    <section className="relative mt-12 border-t border-gray-200/60 dark:border-gray-700/60">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <details className="rounded-2xl bg-white/70 dark:bg-gray-900/60 shadow-sm border border-white/40 dark:border-gray-800/60">
          <summary className="cursor-pointer list-none px-6 py-4 text-lg font-semibold text-gray-800 dark:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-2xl">
            {title} 자세히 보기
          </summary>
          <div className="px-6 pb-6 pt-2 text-gray-700 dark:text-gray-300 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {title} 안내
              </h2>
              <p className="leading-relaxed">{content.summary}</p>
            </div>
            <div className="space-y-6">
              {content.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {section.heading}
                  </h3>
                  <p className="leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
            {content.faqs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  자주 묻는 질문
                </h3>
                <div className="space-y-4">
                  {content.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h4>
                      <p className="leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}


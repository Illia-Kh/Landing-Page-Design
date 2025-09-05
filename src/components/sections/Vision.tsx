import type { Language } from "../../types";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ImageOptimization } from "../ImageOptimization";

import en from "../../i18n/locales/en.json";
import cs from "../../i18n/locales/cs.json";
import ru from "../../i18n/locales/ru.json";
import de from "../../i18n/locales/de.json";

type VisionStep = {
  key: "discovery" | "design" | "delivery";
  align: "left" | "right";
  imageSrc: string;
  imageAltKey: string;
  titleKey: string;
  viewKey: string;
  expertHref: string;
  expertLabelKey: string;
  serviceHref?: string;
};

const localeMap: Record<Language, any> = { en, cs, ru, de };

interface VisionProps {
  language: Language;
}

const steps: VisionStep[] = [
  {
    key: "discovery",
    align: "left",
    imageSrc: "/media/vision/marketing.webp",
    imageAltKey: "sections.vision.steps.0.imageAlt",
    titleKey: "sections.vision.steps.0.title",
    viewKey: "sections.vision.steps.0.view",
    expertHref: "https://www.mckinsey.com/capabilities/operations/our-insights",
    expertLabelKey: "sections.vision.expertLink",
    serviceHref: "/services#discovery",
  },
  {
    key: "design",
    align: "left",
    imageSrc: "/media/vision/website.webp",
    imageAltKey: "sections.vision.steps.1.imageAlt",
    titleKey: "sections.vision.steps.1.title",
    viewKey: "sections.vision.steps.1.view",
    expertHref: "https://www2.deloitte.com/insights",
    expertLabelKey: "sections.vision.expertLink",
    serviceHref: "/services#architecture",
  },
  {
    key: "delivery",
    align: "right",
    imageSrc: "/media/vision/deploy.webp",
    imageAltKey: "sections.vision.steps.2.imageAlt",
    titleKey: "sections.vision.steps.2.title",
    viewKey: "sections.vision.steps.2.view",
    expertHref: "https://www.gartner.com/en/devops",
    expertLabelKey: "sections.vision.expertLink",
    serviceHref: "/services#delivery",
  },
];

export default function Vision({ language }: VisionProps) {
  const t = localeMap[language] ?? localeMap.ru;
  const heading: string = t?.sections?.vision?.title ?? "";
  const readArticleLabel: string = t?.sections?.vision?.readArticle ?? t?.common?.readMore ?? "Read more";

  const getByPath = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  return (
    <section id="vision" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">{heading}</h2>
        </motion.div>

        <div className="flex flex-col gap-6">
            {steps.map((step, index) => {
              const title = getByPath(t, step.titleKey) as string;
              const view = getByPath(t, step.viewKey) as string;
              const imageAlt = getByPath(t, step.imageAltKey) as string;
              const imageFromI18n = getByPath(t, `sections.vision.steps.${index}.image`) as string | undefined;
              const imageSrc = imageFromI18n || step.imageSrc;
              const paragraphs = typeof view === "string" ? view.split("\n") : [];
              const isRight = index === 1;
              const articleHref = (getByPath(t, `sections.vision.steps.${index}.article`) as string) || step.expertHref;

              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className={`md:grid md:grid-cols-12`}>
                    <div className={`md:col-span-9 ${isRight ? 'md:col-start-4' : 'md:col-start-1'}`}>
                      <article className={`relative overflow-hidden card-hover w-full rounded-2xl p-6 md:p-8 shadow-sm transition hover:shadow-md motion-safe:hover:scale-[1.01] before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none ${isRight ? 'before:bg-gradient-to-l' : 'before:bg-gradient-to-r'} before:from-[hsl(var(--primary)_/_0.35)] before:to-transparent`}>
                        <div className="relative z-10 md:grid md:grid-cols-12 md:gap-6 items-center">
                          <div className={`flex items-center justify-center md:col-span-5 ${isRight ? 'md:order-2' : 'md:order-1'}`}>
                            <ImageOptimization
                              src={imageSrc}
                              alt={imageAlt || title}
                              className="mx-auto mb-4 md:mb-0 h-32 w-auto object-contain rounded-xl"
                              width={800}
                              height={450}
                              loading={index === 0 ? "eager" : "lazy"}
                              priority={index === 0}
                            />
                          </div>
                          <div className={`md:col-span-7 ${isRight ? 'md:order-1' : 'md:order-2'}`}>
                            <h3 className={`text-lg font-semibold mb-2 ${isRight ? 'md:text-right' : ''}`}>{title}</h3>
                            <div className={`text-sm text-muted-foreground space-y-2 mb-4 card-surface ${isRight ? 'md:text-right' : ''}`}>
                              {paragraphs.map((p, i) => (
                                <p key={`${step.key}-p-${i}`}>{p}</p>
                              ))}
                            </div>
                            <div className={`${isRight ? 'md:text-right' : ''}`}>
                              <a
                                href={articleHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                              >
                                {readArticleLabel}
                              </a>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-xl font-semibold mb-4">{t?.sections?.vision?.ctaTitle ?? ""}</h3>
          <Button asChild size="lg">
            <a href="/contact">
              {t?.sections?.vision?.ctaButton ?? (t?.common?.actions?.contactUs ?? "Contact Us")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}



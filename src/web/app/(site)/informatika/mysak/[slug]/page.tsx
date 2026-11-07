import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuKeyboard } from "react-icons/lu";
import Collapsible from "@/components/content/Collapsible";
import { exerciseComponents } from "@/components/mysak/exerciseComponents";
import { getPuzzlePictures } from "@/lib/content/misc";
import { exercises, getExercise } from "@/lib/mysak/exercises";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

const available = exercises.filter((e) => e.slug in exerciseComponents);

export const generateStaticParams = () => available.map((e) => ({ slug: e.slug }));

export const generateMetadata = async ({ params }: PageProps<"/informatika/mysak/[slug]">): Promise<Metadata> => {
  const exercise = getExercise((await params).slug);
  if (!exercise) return {};
  return pageMetadata(`/informatika/mysak/${exercise.slug}`, `${exercise.title} | Informatika`, exercise.task);
};

const ExercisePage = async ({ params }: PageProps<"/informatika/mysak/[slug]">) => {
  const { slug } = await params;
  const exercise = getExercise(slug);
  const Exercise = exerciseComponents[slug];
  if (!exercise || !Exercise) notFound();

  const index = available.findIndex((e) => e.slug === slug);
  const prev = available[index - 1];
  const next = available[index + 1];

  return (
    <div className="page">
      <div className="article">
        <div className="article__section mysak">
          <nav aria-label="Drobečková navigace">
            <ol className="breadcrumb mysak__breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/informatika">Informatika</Link>
              </li>
              <li className="breadcrumb-item">Myš a klávesnice</li>
              <li className="breadcrumb-item active" aria-current="page">
                {exercise.title}
              </li>
            </ol>
          </nav>
          <h1 className="article__title">
            {exercise.number}. {exercise.title}
          </h1>
          <p className="mysak__task">
            {exercise.task}
            {exercise.hint && (
              <span className={`mysak__hint${exercise.touchHint ? " mysak__hint--mouse" : ""}`}> {exercise.hint}</span>
            )}
            {exercise.touchHint && <span className="mysak__hint mysak__hint--touch"> {exercise.touchHint}</span>}
          </p>
          {exercise.keyboard && (
            <p className="alert alert-info mysak__keyboard-note">
              <LuKeyboard className="mysak__keyboard-icon" aria-hidden="true" />
              <span>
                Toto cvičení je určené pro počítač s klávesnicí. Na telefonu nebo tabletu nemusí fungovat dobře, zkus
                raději cvičení s myší, která jdou ovládat i prstem.
              </span>
            </p>
          )}

          <div className="mysak__stage">
            <Exercise photos={await getPuzzlePictures()} />
          </div>

          <Collapsible title="Informace o cvičení" className="mysak__info">
            <p>{exercise.info}</p>
          </Collapsible>

          <nav aria-label="Další cvičení" className="mysak__pager">
            {prev ? (
              <Link href={`/informatika/mysak/${prev.slug}`} className="btn btn-outline-secondary mysak__pager-button">
                <span aria-hidden="true">←</span> {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/informatika/mysak/${next.slug}`}
                className={`btn btn-outline-secondary mysak__pager-button${prev ? " mysak__pager-button--end" : ""}`}
              >
                {next.title} <span aria-hidden="true">→</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;

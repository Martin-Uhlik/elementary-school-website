import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { exerciseComponents } from "@/components/mysak/exerciseComponents";
import { getPhotos } from "@/lib/content/misc";
import { exercises, getExercise } from "@/lib/mysak/exercises";

export const dynamicParams = false;

const available = exercises.filter((e) => e.slug in exerciseComponents);

export const generateStaticParams = () => available.map((e) => ({ slug: e.slug }));

export const generateMetadata = async ({ params }: PageProps<"/informatika/mysak/[slug]">): Promise<Metadata> => {
  const exercise = getExercise((await params).slug);
  return exercise ? { title: `${exercise.title} | Informatika | ZŠ a MŠ Moravský Písek` } : {};
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
    <div className="body">
      <div className="article">
        <div className="article__section mysak">
          <nav aria-label="Drobečková navigace">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/informatika">Informatika</Link>
              </li>
              <li className="breadcrumb-item">Myš a klávesnice</li>
              <li className="breadcrumb-item active" aria-current="page">
                {exercise.title}
              </li>
            </ol>
          </nav>
          <h1>
            {exercise.number}. {exercise.title}
          </h1>
          <p className="mysak__task">
            {exercise.task}
            {exercise.hint && <span className="mysak__hint"> {exercise.hint}</span>}
          </p>

          <Exercise photos={await getPhotos()} />

          <details className="mysak__info">
            <summary>Informace o cvičení</summary>
            <p>{exercise.info}</p>
          </details>

          <nav aria-label="Další cvičení" className="mysak__pager">
            {prev ? (
              <Link href={`/informatika/mysak/${prev.slug}`} className="btn btn-outline-secondary">
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/informatika/mysak/${next.slug}`} className="btn btn-outline-secondary">
                {next.title} →
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;

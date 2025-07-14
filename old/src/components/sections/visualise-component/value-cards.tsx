import './value-card.css';
import type { FC } from 'react';

export interface ValueCardProps {
  title: string;
  content?: string;
  description?: string;
  graphic: string;
}

export const ValueCard: FC<ValueCardProps> = ({
  title,
  content,
  description,
  graphic,
}) => {
  return (
    <article className="flex group/value-card value-card-background transition-all backdrop-blur-lg md:w-[calc((100vw-19vw)/3)] w-auto md:h-[calc((100vh-10vh)/2)] xl:h-[calc((100vh-8vh)/2)] h-auto  md:hover:h-[calc(120vh/2)] xl:hover:h-[calc((100vh+26vh)/2)] p-5 flex-col items-center justify-between gap-3 rounded-2xl -[0.4px] -zinc-400/80">
      <figure>
        <img
          src={graphic}
          className="md:w-[350px]"
          alt={description || title}
          loading="lazy"
        />
      </figure>
      <div className="md:p-4 p-2 h-full flex-col gap-4 flex items-center">
        <h3 className="md:text-2xl text-lg w-full text-start text-zinc-200">
          {title}
        </h3>
        {content && (
          <p
            className="text-zinc-400 md:opacity-0 md:group-hover/value-card:opacity-100 duration-500 font-outfit-light tracking-wide"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </article>
  );
};

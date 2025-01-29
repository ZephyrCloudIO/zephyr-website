import './value-card.css';
import { FC } from 'react';

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
    <article className="flex value-card-background backdrop-blur-lg lg:w-[calc((100vw-19vw)/3)] p-5 flex-col items-center justify-between gap-3 rounded-2xl -[0.4px] -zinc-400/80">
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
          <p className="text-zinc-400 font-outfit-light tracking-wide">
            {content}
          </p>
        )}
      </div>
    </article>
  );
};

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`companion-${id}`);
    if (stored === "true") {
      setIsBookmarked(true);
    }
  }, [id]);

  useEffect(() => {
    if (isBookmarked) {
      localStorage.setItem(`companion-${id}`, "true");
    } else {
      localStorage.removeItem(`companion-${id}`);
    }
  }, [isBookmarked, id]);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={
              isBookmarked
                ? "/icons/bookmark-filled.svg"
                : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button className="w-full btn-primary justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;

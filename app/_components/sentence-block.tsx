import { cn } from "@/lib/utils";
import { Sentence } from "@/types/model-response";
import { useState } from "react";

interface SentenceBlockProps {
  sentence: Sentence;
  isRudeMode: boolean;
}

export default function SentenceBlock({
  sentence,
  isRudeMode,
}: SentenceBlockProps) {
  const [currentText, setCurrentText] = useState(sentence.originalSentence);
  const hasChanged = currentText !== sentence.originalSentence;

  const toggleText = () => {
    if (sentence.isModified) {
      setCurrentText(
        hasChanged
          ? sentence.originalSentence
          : (sentence.suggestedSentence as string),
      );
    }
  };

  return (
    <span
      onClick={toggleText}
      className={cn(
        "inline box-decoration-slice transition-all duration-200 rounded-md py-0.5 px-1.5 mx-0.5 border font-medium",

        sentence.isModified
          ? "cursor-pointer hover:shadow-sm"
          : "cursor-default border-transparent font-normal",
        sentence.isModified && !hasChanged
          ? isRudeMode
            ? "bg-purple-200 text-purple-950 border-purple-300 hover:bg-purple-300 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/50 dark:hover:bg-purple-500/30"
            : "bg-yellow-200 text-yellow-950 border-yellow-300 hover:bg-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/50 dark:hover:bg-yellow-500/30"
          : sentence.isModified && hasChanged
            ? isRudeMode
              ? "bg-red-200 text-red-950 border-red-300 hover:bg-red-300 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/50 dark:hover:bg-red-500/30"
              : "bg-emerald-200 text-emerald-950 border-emerald-300 hover:bg-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/50 dark:hover:bg-emerald-500/30"
            : "text-muted-foreground",
      )}
    >
      {currentText}
    </span>
  );
}

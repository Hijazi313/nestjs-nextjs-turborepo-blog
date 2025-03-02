"use client";
import DOMPurify from "dompurify";
type Props = {
  content: string;
  className?: string;
};
const SanitizedContent = ({ content, className }: Props) => {
  const cleanContent = DOMPurify.sanitize(content);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
};

export default SanitizedContent;

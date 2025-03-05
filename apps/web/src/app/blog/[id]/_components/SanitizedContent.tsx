"use client";
type Props = {
  content: string;
  className?: string;
};
const SanitizedContent = ({ content, className }: Props) => {
  // const cleanContent = DOMPurify.sanitize(content);
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default SanitizedContent;

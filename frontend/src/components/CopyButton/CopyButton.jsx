import { CheckCheck, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import IconButton from "../IconButton/IconButton";

const COOL_DOWN_PERIOD = 1500;

const CopyButton = ({ text = "" }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleCopy = async (e) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, COOL_DOWN_PERIOD);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <IconButton
      icon={copied ? CheckCheck : Copy}
      onClick={copied ? undefined : handleCopy}
      disabled={copied}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    />
  );
};

export default CopyButton;

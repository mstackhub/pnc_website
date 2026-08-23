import React from "react";
import Image from "next/image";

export const LineIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <span className={`inline-block relative shrink-0 ${className}`}>
    <Image
      src="/images/icons/line.png"
      alt="LINE"
      width={64}
      height={64}
      className="w-full h-full object-contain"
    />
  </span>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <span className={`inline-block relative shrink-0 ${className}`}>
    <Image
      src="/images/icons/messenger.png"
      alt="Facebook"
      width={64}
      height={64}
      className="w-full h-full object-contain"
    />
  </span>
);

export const MessengerIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <span className={`inline-block relative shrink-0 ${className}`}>
    <Image
      src="/images/icons/messenger.png"
      alt="Facebook Messenger"
      width={64}
      height={64}
      className="w-full h-full object-contain"
    />
  </span>
);

// icon:ellipsis-horizontal | Ionicons https://ionicons.com/ | Ionic Framework
import * as React from "react";

export function EllipsisIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M304 256 A48 48 0 0 1 256 304 A48 48 0 0 1 208 256 A48 48 0 0 1 304 256 z" />
      <path d="M464 256 A48 48 0 0 1 416 304 A48 48 0 0 1 368 256 A48 48 0 0 1 464 256 z" />
      <path d="M144 256 A48 48 0 0 1 96 304 A48 48 0 0 1 48 256 A48 48 0 0 1 144 256 z" />
    </svg>
  );
}

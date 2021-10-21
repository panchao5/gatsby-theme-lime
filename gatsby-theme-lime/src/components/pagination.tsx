import { css } from "@emotion/react";
import { Fragment, ReactNode } from "react";
import tw, { styled } from "twin.macro";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "./icons";

const PaginationItemBase = styled.button(
  tw`w-8 h-8 text-sm`,
  (props) =>
    props.disabled && tw`cursor-not-allowed text-gray-400 text-opacity-75`
);

const PaginationItemNav = styled(PaginationItemBase)(
  tw`flex items-center justify-center`
);

const PaginationItemPage = styled(PaginationItemBase)<{
  selected: boolean;
}>(tw`text-center rounded-full`, (props) => {
  if (props.selected) {
    return css(tw`bg-primary-400 text-white`, props.disabled && tw`opacity-75`);
  }
});

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

type PageItem = {
  type: "page";
  page: number;
  selected: boolean;
  disabled: boolean;
};
type NavItem = { type: "previous" | "next"; disabled: boolean };
type EllipsisItem = {
  type: "start-ellipsis" | "end-ellipsis";
  disabled: boolean;
};

type Item = PageItem | NavItem | EllipsisItem;

type ItemInputProps = { item: Item; [otherProps: string]: any };

interface PaginationRendererProps {
  current: number;
  pageCount: number;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  children: (renderProps: {
    items: Item[];
    getItemProps: (input: ItemInputProps) => any;
  }) => ReactNode;
  onChange?: (event: Event, value: number) => void;
}

const PaginationRenderer = (props: PaginationRendererProps) => {
  const {
    current,
    pageCount,
    siblingCount = 1,
    boundaryCount = 1,
    disabled = false,
    children,
    onChange: handleChange,
  } = props;

  const handleClick = (event: Event, value: number) => {
    if (handleChange) {
      handleChange(event, value);
    }
  };

  const numberCount = siblingCount * 2 + boundaryCount * 2 + 1;
  const itemCount = numberCount + 2;

  let itemList: Array<Exclude<Item["type"], "page"> | number>;

  if (pageCount > itemCount) {
    const startPage = Math.max(boundaryCount + 1, current - siblingCount); // max(3, 4 - 2) = 3
    const endPage = Math.min(current + siblingCount, pageCount - boundaryCount); // min(4 + 2, 10 - 2) = 6

    const hasStartEllipsis = startPage > boundaryCount + 1; // 3 > 2 + 1. false
    const hasEndEllipsis = pageCount - endPage > boundaryCount; // 10 - 6 > 2. true

    itemList = [
      "previous",
      ...range(1, boundaryCount),
      ...(hasStartEllipsis
        ? [
            "start-ellipsis",
            ...range(-boundaryCount * 2 + endPage, startPage - 1),
          ]
        : []),
      ...range(startPage, endPage),
      ...(hasEndEllipsis
        ? [...range(endPage + 1, boundaryCount * 2 + startPage), "end-ellipsis"]
        : []),
      ...range(pageCount - boundaryCount + 1, pageCount),
      "next",
    ] as any;
  } else {
    // not enough pages
    itemList = ["previous", ...range(1, pageCount), "next"];
  }

  // Map the button type to its page number
  const buttonPage = (type: Item["type"]) => {
    switch (type) {
      case "previous":
        return current - 1;
      case "next":
        return current + 1;
      case "start-ellipsis":
        return current - boundaryCount * 2 - 1;
      case "end-ellipsis":
        return current + boundaryCount * 2 + 1;
      default:
        return null;
    }
  };

  const getItemProps = (input: ItemInputProps) => {
    const { item, onClick, ...other } = input;
    if (item.type === "page") {
      return {
        onClick: (event: Event) => {
          handleClick(event, item.page);

          if (onClick) {
            onClick(event, item.page);
          }
        },
        disabled: item.disabled,
        "aria-current": item.page === current ? "true" : undefined,
        ...other,
      };
    }

    return {
      onClick: (event: Event) => {
        const page = buttonPage(item.type);
        if (page) {
          handleClick(event, page);
        }

        if (onClick) {
          onClick(event, page);
        }
      },
      disabled: item.disabled,
      ...other,
    };
  };

  const items: Item[] = itemList.map((item) => {
    return typeof item === "number"
      ? {
          type: "page",
          page: item,
          selected: item === current,
          disabled,
        }
      : {
          type: item,
          disabled:
            disabled ||
            (item.indexOf("ellipsis") === -1 &&
              (item === "next" ? current >= pageCount : current <= 1)),
        };
  });

  return <Fragment>{children({ items, getItemProps })}</Fragment>;
};

interface PaginationProps {
  current: number;
  pageCount: number;
  className?: string;
  onChange?: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { className, onChange } = props;

  const handleChange = (e: Event, page: number) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <nav className={className}>
      <PaginationRenderer
        current={props.current}
        pageCount={props.pageCount}
        onChange={handleChange}
      >
        {({ items, getItemProps }) => {
          return (
            <ul tw="flex items-center space-x-3">
              {items.map((item, index) => {
                let children: ReactNode;

                if (item.type === "page") {
                  children = (
                    <PaginationItemPage
                      selected={item.selected}
                      {...getItemProps({ item })}
                    >
                      {item.page}
                    </PaginationItemPage>
                  );
                } else {
                  children = (
                    <PaginationItemNav {...getItemProps({ item })}>
                      {
                        {
                          previous: <ChevronLeftIcon />,
                          next: <ChevronRightIcon />,
                          "start-ellipsis": <ChevronDoubleLeftIcon />,
                          "end-ellipsis": <ChevronDoubleRightIcon />,
                        }[item.type]
                      }
                    </PaginationItemNav>
                  );
                }

                if (item.type === "previous") {
                  children = (
                    <PaginationItemNav {...getItemProps({ item })}>
                      <ChevronLeftIcon />
                    </PaginationItemNav>
                  );
                }

                return <li key={index}>{children}</li>;
              })}
            </ul>
          );
        }}
      </PaginationRenderer>
    </nav>
  );
};

export default Pagination;

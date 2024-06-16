import React from "react";
import { useHref, useLinkClickHandler } from "react-router-dom";
import { Anchor } from "grommet";

export const TopHeaderLink = React.forwardRef(
  ({ onClick, replace = false, state, target, to, ...rest }, ref) => {
    let href = useHref(to);
    let handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    });

    return (
      <Anchor
        {...rest}
        href={href}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            handleClick(event);
          }
        }}
        ref={ref}
        target={target}
      />
    );
  },
);

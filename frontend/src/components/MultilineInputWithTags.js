import React, { memo, useCallback } from "react";

import { FormClose } from "grommet-icons";
import { Box, Button, Keyboard, Text, TextInput } from "grommet";

const Tag = ({ children, onTagClick, tag, ...rest }) => (
  <Button onClick={onTagClick.bind(null, tag.type)}>
    <Box
      direction="row"
      align="center"
      background="brand"
      pad={{ horizontal: "xsmall", vertical: "xxsmall" }}
      margin={{ vertical: "xxsmall" }}
      round="medium"
      {...rest}
    >
      <Text size="xsmall" margin={{ right: "xxsmall" }}>
        {tag.label}
      </Text>
    </Box>
  </Button>
);

const TagInput = ({ value, tags, onChange, onTagClick, ...rest }) => {
  const boxRef = React.useRef();

  const renderValue = useCallback(
    () =>
      tags.map((tag, index) => (
        <Tag margin="xxsmall" key={index} onTagClick={onTagClick} tag={tag} />
      )),
    [onTagClick, tags],
  );

  return (
    <Box
      direction="row"
      align="center"
      pad={{ horizontal: "xsmall" }}
      border="all"
      ref={boxRef}
      wrap
      style={{ maxWidth: "710px" }}
    >
      {renderValue()}
      <Box flex style={{ minWidth: "120px" }}>
        <TextInput
          plain
          dropTarget={boxRef.current}
          {...rest}
          onChange={onChange}
          value={value}
        />
      </Box>
    </Box>
  );
};

export const MultilineInputWithTags = memo(
  ({ value, onChange, tags, onTagClick }) => (
    <TagInput
      placeholder="Картинка на баннере (необязательно)"
      value={value}
      tags={tags}
      onChange={onChange}
      onTagClick={onTagClick}
    />
  ),
);

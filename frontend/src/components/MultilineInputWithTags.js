import React, { memo, useCallback } from 'react';

import { FormClose } from 'grommet-icons';
import { Box, Button, Keyboard, Text, TextInput } from 'grommet';

const Tag = ({ children, onRemove, ...rest }) => {
    const tag = (
        <Box
            direction="row"
            align="center"
            background="brand"
            pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
            margin={{ vertical: 'xxsmall' }}
            round="medium"
            {...rest}
        >
            <Text size="xsmall" margin={{ right: 'xxsmall' }}>
                {children}
            </Text>
            {onRemove && <FormClose size="small" color="white" />}
        </Box>
    );

    if (onRemove) {
        return <Button onClick={onRemove}>{tag}</Button>;
    }
    return tag;
};

const TagInput = ({ value, tags, onChange, onRemove, ...rest }) => {

    const boxRef = React.useRef();




    const renderValue = useCallback(() =>
        tags.map((tag, index) => (
            <Tag
                margin="xxsmall"
                key={index}
                onRemove={() => onRemove(tag)}
            >
                {tag}
            </Tag>
        )), [ onRemove, tags])

    return (

            <Box
                direction="row"
                align="center"
                pad={{ horizontal: 'xsmall' }}
                border="all"
                ref={boxRef}
                wrap
                style={{ maxWidth: '710px' }}
            >
                {renderValue()}
                <Box flex style={{ minWidth: '120px' }}>
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

export const MultilineInputWithTags = memo(({ value, onChange, tags, onRemoveTag}) => (
    <Box>
        <TagInput
            placeholder="Желаемый результат (необязательно)"
            value={value}
            tags={tags}
            onChange={onChange}
            onRemove={onRemoveTag}
        />
    </Box>
))

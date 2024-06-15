import React, { memo } from "react";
import { Box, Button, FormField, Heading, Layer, Text } from "grommet";
import { NumberInput } from "grommet-controls";

export const BannerSettingsModal = memo(
  ({
    isOpened,
    onCancel,
    onSuccess,
    bannerWidth,
    onBannerWidthChange,
    bannerHeight,
    onBannerHeightChange,
  }) => {
    if (!isOpened) {
      return null;
    }

    return (
      <Layer
        position="right"
        full="vertical"
        onClickOutside={onCancel}
        onEsc={onCancel}
      >
        <Box pad="medium" gap="small" width="medium">
          <Heading level={3} margin="none">
            Настройки баннера
          </Heading>
          <Text>Основные параметры</Text>
          <FormField label="Ширина">
            <NumberInput
              value={bannerWidth}
              onChange={onBannerWidthChange}
              step={216}
              min={216}
              max={1600}
              thousandsSeparatorSymbol=" "
            />
          </FormField>
          <FormField label="Высота">
            <NumberInput
              value={bannerHeight}
              onChange={onBannerHeightChange}
              step={216}
              min={216}
              max={1600}
              thousandsSeparatorSymbol=" "
            />
          </FormField>
          <Box
            as="footer"
            gap="small"
            direction="row"
            align="center"
            justify="end"
            pad={{ top: "medium", bottom: "small" }}
          >
            <Button label="Отмена" onClick={onCancel} />
            <Button label="Готово" onClick={onSuccess} primary />
          </Box>
        </Box>
      </Layer>
    );
  },
);

import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, FormField, Heading, Layer, Select, Text } from "grommet";
import { NumberInput } from "grommet-controls";

import {
  getBannerFormat,
  getBannerType,
  getBannerWidth,
  getBannerHeight,
} from "../redux/selectors";
import {
  updateBannerFormat,
  updateBannerType,
  updateBannerWidth,
  updateBannerHeight,
} from "../redux/actions";
import { ages, bannerFormats, bannerTypes } from "../constants";

export const BannerSettingsModal = memo(({ isOpened, onClose }) => {
  const format = useSelector(getBannerFormat);
  const type = useSelector(getBannerType);
  const width = useSelector(getBannerWidth);
  const height = useSelector(getBannerHeight);

  const dispatch = useDispatch();
  const onFormatChange = useCallback(
    ({ option }) => dispatch(updateBannerFormat(option)),
    [dispatch, updateBannerFormat],
  );
  const onTypeChange = useCallback(
    ({ option }) => dispatch(updateBannerType(option)),
    [dispatch, updateBannerType],
  );
  const onWidthChange = useCallback(
    (event) => dispatch(updateBannerWidth(event.target.value)),
    [dispatch, updateBannerWidth],
  );
  const onHeightChange = useCallback(
    (event) => dispatch(updateBannerHeight(event.target.value)),
    [dispatch, updateBannerHeight],
  );

  if (!isOpened) {
    return null;
  }

  return (
    <Layer
      position="right"
      full="vertical"
      onClickOutside={onClose}
      onEsc={onClose}
    >
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          Настройки баннера
        </Heading>
        <Text>Основные параметры</Text>
        <FormField label="Ширина">
          <NumberInput
            value={width}
            onChange={onWidthChange}
            step={216}
            min={216}
            max={1600}
            thousandsSeparatorSymbol=" "
            plain
          />
        </FormField>
        <FormField label="Высота">
          <NumberInput
            value={height}
            onChange={onHeightChange}
            step={216}
            min={216}
            max={1600}
            thousandsSeparatorSymbol=" "
            plain
          />
        </FormField>
        <FormField label="Формат">
          <Select
            value={format}
            options={bannerFormats}
            onChange={onFormatChange}
          />
        </FormField>
        <FormField label="Тип">
          <Select value={type} options={bannerTypes} onChange={onTypeChange} />
        </FormField>
        <Box
          as="footer"
          gap="small"
          direction="row"
          align="center"
          justify="end"
          pad={{ top: "medium", bottom: "small" }}
        >
          <Button label="Готово" onClick={onClose} primary />
        </Box>
      </Box>
    </Layer>
  );
});

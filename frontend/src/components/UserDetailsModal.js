import React, { memo } from "react";
import { Box, Button, FormField, Heading, Layer, Select, Text } from "grommet";
import { NumberInput } from "grommet-controls";

import { ages, genders, clusters } from "../constants";

export const UserDetailsModal = memo(
  ({
    isOpened,
    onCancel,
    onSuccess,
    gender,
    onGenderChange,
    age,
    onAgeChange,
    wage,
    onWageChange,
    cluster,
    onClusterChange,
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
            Информация о клиенте
          </Heading>
          <Text>Всевозможные дополнительные сведения о клиенте</Text>
          <FormField label="Пол">
            <Select
              value={gender}
              options={genders}
              onChange={onGenderChange}
            />
          </FormField>
          <FormField label="Возраст">
            <Select value={age} options={ages} onChange={onAgeChange} />
          </FormField>
          <FormField label="Зарплата за последние 12 месяц">
            <NumberInput
              value={wage}
              onChange={onWageChange}
              step={1000}
              thousandsSeparatorSymbol=" "
              plain
            />
          </FormField>
          <FormField label="Тип клиента">
            <Select
              value={cluster}
              options={clusters}
              onChange={onClusterChange}
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

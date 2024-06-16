import React, { memo, useCallback } from "react";
import { Box, Button, FormField, Heading, Layer, Select, Text } from "grommet";
import { NumberInput } from "grommet-controls";

import { ages, genders, clusters } from "../constants";

import { getGender, getAge, getWage, getCluster } from "../redux/selectors";
import {
  updateGender,
  updateAge,
  updateWage,
  updateCluster,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export const UserDetailsModal = memo(({ isOpened, onClose }) => {
  const gender = useSelector(getGender);
  const age = useSelector(getAge);
  const wage = useSelector(getWage);
  const cluster = useSelector(getCluster);

  const dispatch = useDispatch();
  const onGenderChange = useCallback(
    ({ option }) => dispatch(updateGender(option)),
    [dispatch, updateGender],
  );
  const onAgeChange = useCallback(
    ({ option }) => dispatch(updateAge(option)),
    [dispatch, updateAge],
  );
  const onWageChange = useCallback(
    (event) => dispatch(updateWage(event.target.value)),
    [dispatch, updateWage],
  );
  const onClusterChange = useCallback(
    ({ option }) => dispatch(updateCluster(option)),
    [dispatch, updateCluster],
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
          Информация о клиенте
        </Heading>
        <Text>Всевозможные дополнительные сведения о клиенте</Text>
        <FormField label="Пол">
          <Select value={gender} options={genders} onChange={onGenderChange} />
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
          <Button label="Готово" onClick={onClose} primary />
        </Box>
      </Box>
    </Layer>
  );
});

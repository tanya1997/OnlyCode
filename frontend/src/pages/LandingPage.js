import React, { memo } from "react";
import { Box, Button, Carousel, Heading, Image, Spinner, Text } from "grommet";

export const LandingPage = memo(() => {
  return (
    <Box width="xlarge" overflow="hidden" gap="small" pad="small">
      <Heading level={1}>Сервис генерации маркетинговых изображений</Heading>

      <Text>
        Сервера с GPU дорогие, поэтому предлагаем вам включить его вручную.
        Время пробуждения сервера 3-4 минуты. После 15 минут простоя сервер
        снова уснет
      </Text>
      <Button
        //label="Horizontal"
        fill="horizontal"
        size="large"
        primary
      >
        <Box align="center" fill direction="row" gap="small" pad="small">
          <Spinner
            round="full"
            border={false}
            size="small"
            background="linear-gradient(to right, #fc466b, #3f5efb)"
          />
          <Text>Разбудить ML сервер</Text>
        </Box>
      </Button>
      <Heading level={2} margin="small">
        Примеры работы модели
      </Heading>
      <Carousel fill play={4000}>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">
            Потребительский кредит под залог недвижимости для женщины 50 лет
          </Text>
          <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">Автомобильный кредит клиенту с супер ЗП</Text>
          <Image
            fit="cover"
            src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
          />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">Вклад на 3 года для депозитчика</Text>
          <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
        </Box>
      </Carousel>
    </Box>
  );
});

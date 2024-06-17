import React, { memo } from "react";
import { useHref } from "react-router-dom";

import { Box, Button, Carousel, Heading, Image, Spinner, Text } from "grommet";

export const LandingPage = memo(() => {
  const href = useHref("/login");

  return (
    <Box width="xlarge" overflow="hidden" gap="small" pad="small">
      <Heading level={2}>Сервис генерации маркетинговых изображений</Heading>

      <Text>
        Сервера с GPU дорогие, поэтому предлагаем вам включить его вручную.
        Время пробуждения сервера 3-4 минуты. После 15 минут простоя сервер
        снова уснет
      </Text>
      <Button fill="horizontal" size="large" primary href={href}>
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
            #домики #пол_мужской #возраст_35 #зп_x12_2500000 #клиент_super #png
            #баннер_background #512x512 #продукт_mortg
          </Text>
          <Image fit="cover" src="/photo_2024-06-16_08-46-13.jpg" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">
            #машинки #пол_женский #возраст_25 #зп_x12_2000000 #клиент_super #png
            #баннер_megabanner #512x512 #продукт_auto
          </Text>
          <Image fit="cover" src="/photo_2024-06-16_08-53-25.jpg" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">
            #домики #пол_мужской #возраст_35 #зп_x12_2500000 #клиент_super #png
            #баннер_background #512x512 #продукт_mortg
          </Text>
          <Image fit="cover" src="/photo_2024-06-16_08-46-16.jpg" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">
            #машинки #пол_женский #возраст_25 #зп_x12_2000000 #клиент_super #png
            #баннер_megabanner #512x512 #продукт_auto
          </Text>
          <Image fit="cover" src="/photo_2024-06-16_08-53-28.jpg" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">
            #домики #пол_мужской #возраст_35 #зп_x12_2500000 #клиент_super #png
            #баннер_background #512x512 #продукт_mortg
          </Text>
          <Image fit="cover" src="/photo_2024-06-16_08-46-19.jpg" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">
            #машинки #пол_мужской #возраст_25 #зп_x12_2000000 #клиент_common
            #png #баннер_background #512x512 #продукт_auto
          </Text>
          <Image fit="cover" src="/photo_2024-06-16_09-26-20.jpg" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">
            #домики #пол_мужской #возраст_35 #зп_x12_2500000 #клиент_super #png
            #баннер_background #512x512 #продукт_mortg
          </Text>
          <Image fit="cover" src="/photo_2024-06-16_08-46-21.jpg" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">
            #машинки #пол_мужской #возраст_22 #зп_x12_600000 #клиент_common #png
            #баннер_ghost #1600x512 #продукт_pc an orange bag of lady
          </Text>
          <Image fit="cover" src="/photo_2024-06-16_09-26-22.jpg" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          gap="small"
          pad="small"
          background="dark-1"
        >
          <Text size="large">
            #домики #пол_мужской #возраст_35 #зп_x12_2500000 #клиент_super #png
            #баннер_background #512x512 #продукт_mortg
          </Text>
          <Image fit="cover" src="/photo_2024-06-16_08-46-23.jpg" />
        </Box>
      </Carousel>
    </Box>
  );
});

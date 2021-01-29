import React, { useState } from "react";
import { Box, Button, Text, Tag, Image, Stack } from "@chakra-ui/react";
// import "../App.css";

export default function PizzaCard(props) {
   const { imgsrc, storename, tags, distance, fee } = props.data;
   return (
      <Box className="pizzacard">
         <Image boxSize="300px" objectFit="cover" src={imgsrc} />
         <Text margin="2% 0" fontSize="xl">
            {storename}
         </Text>
         <Stack direction="row" margin="2% 0">
            {tags.map((i) => (
               <Tag key={i} colorScheme="cyan">
                  {" "}
                  {i}
               </Tag>
            ))}
         </Stack>

         <Stack direction="row">
            <Button colorScheme="blue" size="sm">
               {props.convert(distance)}
            </Button>

            <Button colorScheme="blue" size="sm">
               ${fee} Delivery Fee
            </Button>
         </Stack>
      </Box>
   );
}

import React, { useState, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import { Text, Box, Button } from "@chakra-ui/react";

export default function Order(props) {
   const fieldstodisplay = [
      "size",
      "toppings",
      "sauce",
      "gluten",
      "amount",
      "comment",
      "price",
   ];

   const fieldmap = {
      size: "Size",
      toppings: "Toppings",
      sauce: "Sauce",
      gluten: "Gluten Free?",
      amount: "Amount",
      comment: "Comment",
      price: "Price",
   };

   const resultmap = {
      size: {
         0: "Mini",
         1: "Small",
         2: "Medium",
         3: "Large",
      },
      gluten: {
         1: "Yes",
         0: "No",
      },
   };

   return (
      <Box>
         <section className="cta-2">
            <Text
               fontSize="4xl"
               marginBottom="4%"
               color="white"
               textShadow="1px 1px 2px black"
               fontFamily="Roboto Slab"
               bgColor="rgba(0,0,0,0.5)"
               padding="3%"
            >
               Congrats! Pizza is on its way!
            </Text>
         </section>
         {props.order.size === undefined ? (
            <Box>
               <Text fontSize="3xl"> Not yet ready... </Text>
            </Box>
         ) : (
            <Box margin="3%">
               {/* {console.log(parsed)} */}

               <Text padding="1%" fontSize="3xl">
                  {" "}
                  Your Order:{" "}
               </Text>
               <Box>
                  {Object.keys(props.order).map((i) => {
                     if (!fieldstodisplay.includes(i)) {
                        return <div key={i + Math.random()}></div>;
                     }
                     return (
                        <Text
                           key={i + Math.random()}
                           padding="1%"
                           fontSize="xl"
                        >
                           {fieldmap[i]}:{" "}
                           {resultmap[i]
                              ? resultmap[i][props.order[i] * 1]
                              : props.order[i]}
                        </Text>
                     );
                  })}
               </Box>
            </Box>
         )}
      </Box>
   );
}

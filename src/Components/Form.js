import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import axios from "axios";

import {
   FormLabel,
   Input,
   Select,
   Radio,
   RadioGroup,
   Checkbox,
   CheckboxGroup,
   Switch,
   Text,
   Box,
   Button,
   NumberInput,
   NumberInputField,
   NumberInputStepper,
   NumberIncrementStepper,
   NumberDecrementStepper,
} from "@chakra-ui/react";

const toppings = [
   "Anchovies",
   "Beef",
   "Bacon",
   "Chicken",
   "Italian Sausage",
   "Sausage",
   "Pepperoni",
   "Meatball",
   "Salami",
   "Green Peppers",
   "Mushrooms",
   "Onions",
   "Tomatoes",
   "Banana Peppers",
   "Pineapple",
   "Black Olives",
   "Green Olives",
   "Spinach",
];

// initialize state for toppings like "{Bacon: true, ...}"
const initialToppingsTable = {};
[...toppings].forEach((i) => {
   initialToppingsTable[i] = false;
});

// This helper renders sections above the inputs
const SectionBanner = (props) => {
   const { text, subtext } = props;
   return (
      <Box bgColor="#DDDDDD" margin="2% 0" padding="1% 3%">
         <FormLabel as="legend" fontSize="3xl">
            {text}
         </FormLabel>
         <Text fontSize="xl"> {subtext} </Text>

         {/* error meesages? */}
      </Box>
   );
};

export default function Form(props) {
   const [size, setSize] = useState("1");
   const [toppingsTable, setToppingsTable] = useState(initialToppingsTable);
   const [sauce, setSauce] = useState("Original Red");
   const [gluten, setGluten] = useState(false);
   const [comment, setComment] = useState("");
   const [amount, setAmount] = useState("1");

   // handler for topping checkboxes
   const updatetoppings = (e) => {
      if (
         Object.keys(toppingsTable).filter((i) => toppingsTable[i] === true)
            .length > 9 &&
         e.target.checked === true
      ) {
         return;
      }

      if (e.target.type === "checkbox") {
         const { name, checked } = e.target;
         setToppingsTable({ ...toppingsTable, [name]: checked });
         return;
      }
   };

   // calculate the price of the current order
   const price = () => {
      const toppingcount = Object.keys(toppingsTable).filter(
         (i) => toppingsTable[i] === true
      ).length;
      return amount * (toppingcount * 1.5 + size * 2 + gluten + 8);
   };

   // congregate the states into a final order, post to reqres
   const submit = (e) => {
      props.setCurrentorder({});
      const fullorder = {
         size: size,
         toppings: Object.keys(toppingsTable)
            .filter((i) => toppingsTable[i] === true)
            .map((i) => i + "; "),
         sauce: sauce,
         gluten: gluten,
         comment: comment,
         amount: amount,
         price: price(),
      };
      axios
         .post("https://reqres.in/api/order", fullorder)
         .then((res) => {
            console.log(res);
            props.setCurrentorder(res.data);
         })
         .catch((e) => alert("Error: " + e));
   };

   return (
      <Box width="70%" alignSelf="center">
         <Box width="100%" padding="1% 2%" textAlign="center">
            <Text fontSize="4xl"> Build Your Own Pizza</Text>
         </Box>
         <section className="cta-2"></section>

         <SectionBanner text="Choice of Size" subtext="Required" />
         <Box width="40%" padding="1% 2%">
            <Select
               defaultValue="1"
               onChange={(e) => {
                  setSize(e.target.value);
               }}
            >
               <option value={0}> Mini - 8" </option>
               <option value={1}> Small - 10" </option>
               <option value={2}> Medium - 12" </option>
               <option value={3}> Large - 14" </option>
            </Select>
         </Box>

         <SectionBanner text="Choice of Sauce" subtext="Required" />
         <Box width="40%" padding="1% 2%">
            <RadioGroup
               display="flex"
               flexDirection="column"
               onChange={(e) => setSauce(e)}
               value={sauce}
            >
               <Radio value="Original Red" defaultChecked>
                  Original Red
               </Radio>
               <Radio value="Garlic Ranch">Garlic Ranch</Radio>
               <Radio value="BBQ Sauce">BBQ Sauce</Radio>
               <Radio value="Spinach Alfredo">Spinach Alfredo</Radio>
            </RadioGroup>
         </Box>

         <SectionBanner text="Add Toppings" subtext="Choose up to 10" />
         <CheckboxGroup>
            <Box
               display="flex"
               flexDirection="column"
               flexWrap="wrap"
               justifyContent="flex-start"
               height="30vh"
            >
               {toppings.map((i) => (
                  <Checkbox
                     key={i}
                     padding="0.5vh 25% 0 2%"
                     name={i}
                     size="lg"
                     onChange={(e) => updatetoppings(e)}
                     isChecked={toppingsTable[i]}
                     checked={toppingsTable[i]}
                     value={false} //chakra's checkbox behaves naturally here, value is not used, but I have to set it to false and use `checked` for states
                  >
                     <Text> {i}</Text>
                  </Checkbox>
               ))}
            </Box>
         </CheckboxGroup>

         <SectionBanner text="Choice of Substitute" subtext="Choose up to 1" />
         <Box width="80%" padding="1% 2%" display="flex">
            <Switch onChange={(e) => setGluten(e.target.checked)} />
            <Text marginLeft="2%"> Gluten Free? (+$1) </Text>
         </Box>
         <SectionBanner text="Special Instructions" />
         <Box width="95%" padding="1% 2%">
            <Input
               name="comment"
               placeholder="Anything else you'd like to add?"
               onChange={(e) => setComment(e.target.value)}
            />
         </Box>
         <Box
            display="flex"
            flexFlow="row"
            justifyContent="space-between"
            margin="2%"
         >
            <NumberInput
               defaultValue={1}
               min={1}
               width="10vw"
               minWidth="60px"
               onChange={(e) => setAmount(e)}
               max={20}
            >
               <NumberInputField />
               <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
               </NumberInputStepper>
            </NumberInput>
            <NavLink to="/order">
               <Button
                  width="50vw"
                  onClick={(e) => {
                     submit(e);
                  }}
               >
                  <Box
                     width="50vw"
                     display="flex"
                     flexFlow="row"
                     justifyContent="space-between"
                  >
                     <Text>Add to order </Text>
                     <Text> ${price()} </Text>
                  </Box>
               </Button>
            </NavLink>
         </Box>
      </Box>
   );
}

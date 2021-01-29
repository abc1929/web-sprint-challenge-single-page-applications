import React, { useState } from "react";
import { ChakraProvider, Button, Text, Box } from "@chakra-ui/react";
import Nav from "./Components/Nav";
import PizzaCard from "./Components/PizzaCard";
import Form from "./Components/Form";
import Order from "./Components/Order";
import { NavLink, Route } from "react-router-dom";
import "./App.css";

// let a = process.env.PUBLIC_URL + "/Pizza.jpg";
// const test = require(a);

const stores = require("./Data/Stores.json").data;

// converts distance field to strings
const convert = (i) => {
   switch (i) {
      case "0":
         return "<10 Min";
      case "1":
         return "10-20 Min";
      case "2":
         return "20-30 Min";
      case "3":
         return "30-45 Min";
      case "4":
         return "45-60 Min";
      case "5":
         return ">60 Min";

      default:
         return "Unknown";
   }
};

const App = () => {
   const [currentorder, setCurrentorder] = useState({});

   return (
      <ChakraProvider>
         {/* {console.log(stores)} */}
         <Box display="flex" flexDirection="column">
            <Nav></Nav>
            <Route exact path="/">
               <div className="main">
                  <section className="cta">
                     {/* Your favorite food delivered while coding */}
                     <Text
                        fontSize="4xl"
                        marginBottom="4%"
                        color="white"
                        textShadow="1px 1px 2px black"
                        fontFamily="Roboto Slab"
                        bgColor="rgba(0,0,0,0.5)"
                        padding="3%"
                     >
                        Your favorite food, delivered while coding
                     </Text>
                     <NavLink to="/pizza">
                        <Button size="lg" width="10vw" minWidth="75px">
                           Pizza?
                        </Button>
                     </NavLink>
                  </section>
                  <section className="homemain">
                     {stores.map((i) => (
                        <PizzaCard
                           key={i.storename}
                           convert={convert}
                           data={i}
                        />
                     ))}
                  </section>
               </div>
            </Route>
            <Route path="/pizza">
               <Form
                  currentorder={currentorder}
                  setCurrentorder={setCurrentorder}
               ></Form>
            </Route>
            <Route path="/help">
               {" "}
               <section className="cta-2">
                  {" "}
                  <Box
                     display="flex"
                     flexDir="column"
                     alignSelf="center"
                     justifyContent="center"
                     alignItems="center"
                     width="50vh"
                  >
                     {" "}
                     <Text
                        fontSize="3xl"
                        marginBottom="4%"
                        color="white"
                        textShadow="1px 1px 2px black"
                        fontFamily="Roboto Slab"
                        bgColor="rgba(0,0,0,0.5)"
                        padding="3%"
                     >
                        Help yourself with a pizza!
                     </Text>{" "}
                     <NavLink to="/pizza">
                        <Button size="lg" width="10vw" minWidth="75px">
                           Pizza?
                        </Button>
                     </NavLink>
                  </Box>{" "}
               </section>
            </Route>
            <Route path="/order">
               {" "}
               <Order order={currentorder}></Order>{" "}
            </Route>
         </Box>
      </ChakraProvider>
   );
};
export default App;

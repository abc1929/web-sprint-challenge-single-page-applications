import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { Text, Box, Button } from "@chakra-ui/react";

export default function Nav(props) {
   return (
      <nav className="navbar">
         <Box>
            <Text fontSize="3xl">Lambda Eats</Text>
         </Box>
         <Box>
            <NavLink to="/">
               <Button> Home </Button>
            </NavLink>
            <NavLink to="/help">
               <Button> Help </Button>
            </NavLink>
         </Box>
      </nav>
   );
}

import React from "react";
import { NavLink } from "react-router-dom";
import { Text, Box, Button } from "@chakra-ui/react";

export default function Nav(props) {
   return (
      <nav className="navbar">
         <Box>
            <Text fontSize="3xl">Lambda Eats</Text>
         </Box>
         <Box width="20vw" display="flex" justifyContent="flex-end">
            <NavLink to="/">
               <Button> Home </Button>
            </NavLink>
            <NavLink to="/help">
               <Button marginLeft="12px"> Help </Button>
            </NavLink>
         </Box>
      </nav>
   );
}

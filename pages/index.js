import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Map Widget Builder</title>
      </Head>
      <Box bg="cyan.500" w="100%" p={4} color="white" pos="fixed">
        <Container maxW="6xl">Map Widget Builder</Container>
      </Box>
      <Container pt={14} maxW="6xl"></Container>
    </>
  );
}

import Head from "next/head";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import EventEntry from "components/EventEntry";
import { mapboxAccessToken } from "state/config";
import { useRecoilState } from "recoil";
import MapStyleEntry from "components/MapStyleEntry";
import WidgetSnippet from "components/WidgetSnippet";

export default function Home() {
  const [accessToken, setAccessToken] = useRecoilState(mapboxAccessToken);
  return (
    <>
      <Head>
        <title>Map Widget Builder</title>
      </Head>
      <Box bg="cyan.500" w="100%" p={4} color="white" pos="fixed" zIndex={1}>
        <Container maxW="6xl">Map Widget Builder</Container>
      </Box>
      <Container pt={16} maxW="6xl">
        <FormControl id="mapboxToken">
          <FormLabel>Mapbox Access Token</FormLabel>
          <Input
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
          />
          <FormHelperText>
            Used to access map data. Find your access token{" "}
            <Link
              href="https://account.mapbox.com/"
              color="teal.500"
              isExternal
            >
              here <ExternalLinkIcon />
            </Link>
            . It is recommended that you add the URL of this widget builder and
            the URL of your site to the access token.
          </FormHelperText>
        </FormControl>
        <Tabs mt={6} isLazy>
          <TabList>
            <Tab>My Data</Tab>
            <Tab>Customize Map</Tab>
            <Tab>Export to Website</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <EventEntry />
            </TabPanel>
            <TabPanel>
              <MapStyleEntry />
            </TabPanel>
            <TabPanel>
              <Text>Paste the following code snippet into your website:</Text>
              <WidgetSnippet />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}

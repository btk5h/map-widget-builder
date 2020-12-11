import {
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { mapHeight, mapStyle, mapWidth } from "state/config";
import Map from "components/Map";
import { useDebounce } from "use-debounce";

export default function MapStyleEntry() {
  const [height, setHeight] = useRecoilState(mapHeight);
  const [width, setWidth] = useRecoilState(mapWidth);
  const [style, setStyle] = useRecoilState(mapStyle);

  const [mapProps] = useDebounce(
    {
      height,
      width,
      style,
    },
    1000
  );

  return (
    <VStack align="normal">
      <FormControl id="mapHeight">
        <FormLabel>Height</FormLabel>
        <Input
          type="text"
          name="mapHeight"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </FormControl>
      <FormControl id="mapStyle">
        <FormLabel>Width</FormLabel>
        <Input
          type="text"
          name="mapWidth"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </FormControl>
      <FormControl id="mapStyle">
        <FormLabel>Style</FormLabel>
        <Input
          type="text"
          name="mapStyle"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
      </FormControl>
      <ButtonGroup mb={8}>
        <Button onClick={() => setStyle("mapbox://styles/mapbox/light-v10")}>
          Light
        </Button>
        <Button onClick={() => setStyle("mapbox://styles/mapbox/dark-v10")}>
          Dark
        </Button>
        <Button onClick={() => setStyle("mapbox://styles/mapbox/outdoors-v11")}>
          Outdoors
        </Button>
        <Button onClick={() => setStyle("mapbox://styles/mapbox/streets-v11")}>
          Streets
        </Button>
        <Button onClick={() => setStyle("mapbox://styles/mapbox/satellite-v9")}>
          Satellite
        </Button>
        <Button
          onClick={() =>
            setStyle("mapbox://styles/mapbox/satellite-streets-v11")
          }
        >
          Satellite Streets
        </Button>
      </ButtonGroup>
      <Map key={JSON.stringify(mapProps)} {...mapProps} />
    </VStack>
  );
}

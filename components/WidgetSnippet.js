import CodeBlock from "components/CodeBlock";
import { Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import {
  mapboxAccessToken,
  mapHeight,
  mapStyle,
  mapWidth,
  validEventData,
} from "state/config";
import { fnt, get } from "fntstring";

const snippet = fnt`<link href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css" rel="stylesheet" />
<script type="application/javascript" src="https://github.com/btk5h/map-widget/releases/download/1.0.0/map-widget.js"></script>
<script type="application/javascript">
  MapWidget.renderMap({
    height: "${get("height")}",
    width: "${get("width")}",
    mapbox: {
      accessToken: "${get("accessToken")}",
      mapStyle: "${get("style")}"
    },
    data: ${get("data")}
  })
</script>
`;

export default function WidgetSnippet() {
  const accessToken = useRecoilValue(mapboxAccessToken);
  const data = useRecoilValue(validEventData);
  const height = useRecoilValue(mapHeight);
  const width = useRecoilValue(mapWidth);
  const style = useRecoilValue(mapStyle);

  const code = snippet({
    accessToken,
    height,
    width,
    style,
    data: JSON.stringify(data),
  });

  return (
    <>
      <CodeBlock>{code}</CodeBlock>
      <Text mt={2}>{code.length} characters</Text>
    </>
  );
}

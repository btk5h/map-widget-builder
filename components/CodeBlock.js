import { Box, Button, useClipboard } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

export default function CodeBlock(props) {
  const { children } = props;
  const { hasCopied, onCopy } = useClipboard(children);

  return (
    <Box mt={2} p={4} bg="gray.100" rounded="md" pos="relative">
      <Box as="pre" fontFamily="mono" overflow="auto">
        {children}
      </Box>
      <Button
        onClick={onCopy}
        colorScheme="blue"
        pos="absolute"
        top={2}
        right={2}
      >
        <CopyIcon mr={1} />
        {hasCopied ? "Copied!" : "Copy"}
      </Button>
    </Box>
  );
}

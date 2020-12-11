import {
  Box,
  ButtonGroup,
  Button,
  IconButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { eventData, mapboxAccessToken } from "state/config";
import { useForm, Controller } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useEffect, useMemo, useState } from "react";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import Map from "components/Map";
import DatePicker from "components/DatePicker";

function EditModal({ index, onClose }) {
  const [data, setData] = useRecoilState(eventData);
  const { register, control, watch, handleSubmit } = useForm({
    defaultValues: data[index],
  });
  const [debouncedAddress] = useDebounce(watch("address"), 2000);
  const accessToken = useRecoilValue(mapboxAccessToken);

  const [lngLat, setLngLat] = useState();
  const [placeName, setPlaceName] = useState();

  const geocodingClient = useMemo(() => mbxGeocoding({ accessToken }), [
    accessToken,
  ]);

  useEffect(() => {
    let cancelled = false;

    const geocode = async () => {
      const response = await geocodingClient
        .forwardGeocode({
          query: debouncedAddress,
          types: ["address"],
          countries: ["US"],
          limit: 1,
        })
        .send();

      const result = response.body?.features[0];

      if (result) {
        setLngLat(result.geometry.coordinates);
        setPlaceName(result.place_name);
      } else {
        setLngLat(null);
        setPlaceName(null);
      }
    };

    if (debouncedAddress) {
      geocode();
    }

    return () => {
      cancelled = true;
    };
  }, [geocodingClient, debouncedAddress]);

  const onSubmit = (changedEvent) => {
    const eventData = {
      ...changedEvent,
      lngLat,
    };
    setData((data) =>
      data
        .slice(0, index)
        .concat([eventData])
        .concat(data.slice(index + 1))
    );
    requestAnimationFrame(onClose);
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={true} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalBody>
          <VStack>
            <FormControl id="eventName">
              <FormLabel>Event Name</FormLabel>
              <Input type="text" name="name" ref={register} />
            </FormControl>
            <FormControl id="eventDate">
              <FormLabel>Date</FormLabel>
              <Controller
                control={control}
                name="date"
                render={({ value, onChange, onBlur }) => (
                  <DatePicker
                    id="eventDate"
                    selectedDate={value && new Date(value)}
                    onChange={(date) => onChange(date?.toJSON())}
                    onBlur={onBlur}
                    isClearable
                  />
                )}
              />
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Textarea type="text" name="address" ref={register} rows={4} />
            </FormControl>
            <Box>{placeName || "No place found for address"}</Box>
            <Map center={lngLat} marker={lngLat} />
            <FormControl id="imageUrl">
              <FormLabel>Image URL</FormLabel>
              <Input type="text" name="imageUrl" ref={register} />
            </FormControl>
            <FormControl id="eventUrl">
              <FormLabel>Event URL</FormLabel>
              <Input type="text" name="url" ref={register} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup colorScheme="blue">
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant="solid">
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function EditButtonsWithModal({ index }) {
  const setData = useSetRecoilState(eventData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteEvent = () =>
    setData((data) => data.slice(0, index).concat(data.slice(index + 1)));

  return (
    <>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button onClick={onOpen} mr="-px">
          <EditIcon mr="1" /> Edit
        </Button>
        <IconButton
          onClick={deleteEvent}
          colorScheme="red"
          icon={<DeleteIcon />}
        />
      </ButtonGroup>
      {isOpen && <EditModal index={index} onClose={onClose} />}
    </>
  );
}

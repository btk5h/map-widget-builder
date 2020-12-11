import { Box, Button } from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";
import { format } from "date-fns";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ArrowUpDownIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { eventData } from "state/config";
import EditButtonsWithModal from "components/EditButtonsWithModal";

const columns = [
  {
    Header: "Event Name",
    accessor: "name",
  },
  {
    Header: "Date",
    id: "date",
    accessor: (e) => {
      return e.date ? format(new Date(e.date), "P") : "none";
    },
  },
  {
    Header: "Ready?",
    id: "ready",
    accessor: (e) => (e.lngLat ? <CheckIcon /> : "Missing Address"),
  },
  {
    Header: "",
    id: "actions",
    accessor: "name",
    Cell: ({ row }) => <EditButtonsWithModal index={row.index} />,
    minimize: true,
  },
];

export default function EventEntry() {
  const [data, setData] = useRecoilState(eventData);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  const addEvent = () =>
    setData((data) => [{ name: "New Event", date: null }, ...data]);

  return (
    <>
      <Button onClick={addEvent}>Add Event</Button>
      <Box shadow="sm" rounded="lg" overflow="auto" mt={2}>
        <Box as="table" w="full" {...getTableProps()}>
          <Box as="thead">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Box
                    as="th"
                    px="6"
                    py="3"
                    borderBottomWidth="1px"
                    backgroundColor="gray.50"
                    textAlign="left"
                    fontSize="xs"
                    color="gray.500"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    lineHeight="1rem"
                    fontWeight="medium"
                    w={column.minimize && 1}
                    maxWidth={column.minimize && 1}
                    {...column.getHeaderProps()}
                    {...(column.minimize ? {} : column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {!column.minimize && (
                      <span>
                        {" "}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon />
                          ) : (
                            <TriangleUpIcon />
                          )
                        ) : (
                          <ArrowUpDownIcon />
                        )}
                      </span>
                    )}
                  </Box>
                ))}
              </tr>
            ))}
          </Box>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Box
                        as="td"
                        px="6"
                        py="4"
                        lineHeight="1.25rem"
                        whiteSpace="nowrap"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </Box>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Box>
      </Box>
    </>
  );
}

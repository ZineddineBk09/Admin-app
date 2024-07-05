import {
  Badge,
  Col,
  Row,
  Table,
  useAsyncList,
  useCollator,
  User,
} from "@nextui-org/react";
import { useDriversContext } from "../../../../context/admin/drivers";
import { faker } from "@faker-js/faker";
import { CancelIcon } from "../../../icons/orders";
import { IconButton } from "../table.styled";
import { EditIcon } from "../../../icons/table";

export default function DriverTable() {
  interface Driver {
    id: string;
    first_name: string;
    last_name: string;
    device_id: string;
    phone_number: string;
    zone: string;
    nationality: string;
    id_number: string;
    id_image: string;
    driving_license_number: string;
    driving_license_img: string;
    pricing: string;
    status: "pending" | "active" | "suspend";
  }

  const fakeDrivers: Driver[] = Array.from({ length: 100 }, () => ({
    id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    device_id: faker.phone.imei(),
    phone_number: faker.phone.number(),
    zone: faker.address.city(),
    nationality: faker.location.country(),
    id_number: faker.string.uuid(),
    id_image: faker.image.avatar(),
    driving_license_number: faker.string.uuid(),
    driving_license_img: faker.image.avatar(),
    pricing: faker.number.int({ min: 100, max: 1000 }).toString(),
    status: ["pending", "active", "suspend"][
      faker.number.int({ min: 0, max: 2 })
    ] as "pending" | "active" | "suspend",
  }));

  const columns = [
    {
      id: "driver",
      title: "Driver",
      render: () => {
        return (
          <User
            src={faker.image.avatar()}
            name={faker.person.firstName() + " " + faker.person.lastName()}
            description={faker.phone.number()}
            squared
          />
        );
      },
    },
    { id: "device_id", title: "Device ID" },
    { id: "zone", title: "Zone" },
    { id: "nationality", title: "Nationality" },
    { id: "id_number", title: "ID Number" },
    {
      id: "driving_license_number",
      title: "Driving License Number",
    },
    {
      id: "pricing",
      title: "Pricing",
      render: (pricing: string) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(parseInt(pricing)),
    },
    {
      id: "status",
      title: "Status",
      render: (status: string) => {
        return (
          <Badge
            color={
              status === "pending"
                ? "warning"
                : status === "active"
                ? "success"
                : "error"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      title: "Actions",
      render: () => {
        return (
          <Row
            justify="center"
            align="center"
            css={{ gap: "$8", "@md": { gap: 3 } }}
          >
            <Col css={{ d: "flex" }}>
              <IconButton>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Col>
            <Col css={{ d: "flex" }}>
              <IconButton>
                <CancelIcon />
              </IconButton>
            </Col>
          </Row>
        );
      },
    },
  ];

  const collator = useCollator({ numeric: true });
  const { drivers, loading } = useDriversContext();

  async function load({ signal }: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      items: fakeDrivers,
    };
  }

  async function sort({ items, sortDescriptor }: any) {
    return {
      items: items.sort((a: any, b: any) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }

  const list = useAsyncList({ load, sort });

  return (
    <Table
      aria-label="drivers table"
      css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      animated
    >
      <Table.Header>
        {columns.map((column) => (
          <Table.Column key={column.id} allowsSorting align="center">
            {column.title}
          </Table.Column>
        ))}
      </Table.Header>
      <Table.Body items={list.items} loadingState={list.loadingState}>
        {(item: any) => (
          <Table.Row key={item.name}>
            {(columnKey) => (
              <Table.Cell>
                {columns.find((column) => column.id === columnKey)?.render
                  ? // @ts-ignore
                    columns
                      .find((column) => column.id === columnKey)
                      ?.render(item[columnKey])
                  : item[columnKey]}
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={10}
        onPageChange={(page) => console.log({ page })}
        total={list.items.length / 10}
      />
    </Table>
  );
}

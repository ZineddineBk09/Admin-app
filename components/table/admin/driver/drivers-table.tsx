import { Table, useAsyncList, useCollator } from "@nextui-org/react";
import { useDriversContext } from "../../../../context/admin/drivers";

export default function DriverTable() {
  const collator = useCollator({ numeric: true });
  const { drivers, loading } = useDriversContext();

  async function load({ signal }: any) {
    const res = await fetch("https://swapi.py4e.com/api/people/?search", {
      signal,
    });
    const json = await res.json();
    return {
      items: json.results,
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

  /**interface Driver {
  id: string | number
  user: User
  city: City
  driver_type: DriverType
  team: DriverTeam
  code: string
  phone_number: string
  status: 'active' | 'inactive' | 'PickingUp' | 'delivering' | 'waiting'
  image: string
  vehicle_license: string
  residency_id: string
  is_idle: boolean
} */

  const columns = [{ key: "name", label: "Name" }];

  return (
    <Table
      aria-label="drivers table"
      css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      animated
    >
      <Table.Header>
        <Table.Column key="name" allowsSorting align="center">
          Name
        </Table.Column>
        <Table.Column key="height" allowsSorting align="center">
          Height
        </Table.Column>
        <Table.Column key="mass" allowsSorting align="center">
          Mass
        </Table.Column>
        <Table.Column key="birth_year" allowsSorting align="center">
          Birth Year
        </Table.Column>
      </Table.Header>
      <Table.Body items={list.items} loadingState={list.loadingState}>
        {(item: any) => (
          <Table.Row key={item.name}>
            {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={10}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  );
}

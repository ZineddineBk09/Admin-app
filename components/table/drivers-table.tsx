import { Table } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Box } from '../styles/box'
import { RenderCell } from './render-drivers-cell'
import { menuTableColumns } from './data'
import { useDriversContext } from '@/context/driver/DriversContext'
import { Sort } from '@/interfaces'

export const DriversTable = () => {
  const { drivers, handleSortDrivers } = useDriversContext()
  const [sorting, setSorting] = useState<Sort>({ column: '', direction: '' })

  useEffect(() => {
    if (sorting.column === '') return
    handleSortDrivers(sorting)
  }, [sorting])

  return (
    <Box
      css={{
        '& .nextui-table-container': {
          boxShadow: 'none',
          marginBottom: '10px',
        },
      }}
    >
      <Table
        aria-label='Drivers table'
        bordered
        sticked
        striped
        css={{
          height: 'auto',
          minWidth: '100%',
          boxShadow: 'none',
          width: '100%',
          px: 5,
        }}
        onSortChange={(sort: any) => {
          // because the table does not support descending sorting
          // we need to do it manually
          const { direction } = sorting
          const { column } = sort
          if (direction === 'ascending') {
            setSorting({
              column,
              direction: 'descending',
            })
            return
          }
          setSorting({ column, direction: 'ascending' })
        }}
      >
        <Table.Header columns={menuTableColumns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === 'actions'}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={
                column.uid === 'completedTasks' ||
                column.uid === 'inProgressTasks'
              }
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={drivers}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {RenderCell({ driver: item, columnKey: columnKey })}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align='center'
          color='warning'
          rowsPerPage={8}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </Box>
  )
}

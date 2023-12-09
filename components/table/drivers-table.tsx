import { Table } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Box } from '../styles/box'
import { RenderCell } from './render-drivers-cell'
import { driversTableCols } from './data'
import { useDriversContext } from '@/context/driver'
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
          borderRadius: '0',
          border: '1px solid #CECECE',
        },
      }}
    >
      <Table
        aria-label='Drivers table'
        bordered
        sticked
        striped
        hoverable
        css={{
          height: 'auto',
          minWidth: '100%',
          boxShadow: 'none',
          width: '100%',
          px: 5,
          backgroundColor: 'white',
        }}
        onSortChange={(sort: any) => {
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
        <Table.Header columns={driversTableCols}>
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

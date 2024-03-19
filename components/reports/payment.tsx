import { Loading, Modal, Text } from '@nextui-org/react'
import React from 'react'
import { paymentTableCols } from '../table/data'
import { PrintIcon } from '../icons/table'
import { useReactToPrint } from 'react-to-print'

export const MakePayment = ({ id }: { id: number }) => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const paymentRef = React.useRef(null)
  const handler = () => setVisible(true)

  const closeHandler = () => setVisible(false)

  const handlePrint = useReactToPrint({
    content: () => paymentRef.current,
  })

  return (
    <div>
      <button onClick={handler}>Make Payment</button>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='900px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        <Modal.Header>
          <Text id='modal-title' className='text-xl font-semibold uppercase' h4>
            Make Payment
          </Text>
        </Modal.Header>
        {loading ? (
          <Loading size='xl' className='my-3' color='warning' />
        ) : (
          <div ref={paymentRef}>
            <Modal.Body>
              {/* Payment for & Dates */}
              <div className='w-full flex items-start justify-between'>
                {/* Payment */}
                <div className='flex flex-col items-start gap-y-1'>
                  <p className='text-gray-500'>Payment for</p>
                  <p className='text-2xl font-medium uppercase'>Al beek</p>
                  <p className='text-2xl font-medium uppercase'>
                    Al neel street 12
                  </p>
                  <p className='text-2xl font-medium uppercase'>
                    P.O. Box 127795
                  </p>
                </div>
                {/* Date from & Date to */}
                <div className='flex flex-col items-start gap-y-1'>
                  <p className='text-gray-500'>Date From</p>
                  <p className='text-2xl font-medium uppercase'>10/01/2023</p>
                  <p className='text-gray-500 mt-2'>Date To</p>
                  <p className='text-2xl font-medium uppercase'>24/02/2023</p>
                </div>
              </div>

              {/* Table */}
              <Table />

              {/* Total */}
              <div className='flex items-end gap-x-1 ml-auto'>
                <div className='flex items-start gap-x-1'>
                  <span className='text-gray-500 text-sm'>Total</span>
                  <span className='text-5xl font-bold lg:text-6xl'>350</span>
                </div>
                <span className='text-gray-500 text-sm font-medium'>SAR</span>
              </div>
            </Modal.Body>
          </div>
        )}
        <Modal.Footer>
          {!loading && (
            <div className='w-full flex items-center justify-center gap-x-3'>
              <button
                className='h-11 px-12 bg-gray-400 rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                onClick={closeHandler}
              >
                Cancel
              </button>
              <button
                className='h-11 px-12 bg-primary rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                onClick={() => handlePrint()}
              >
                Save
              </button>
              <button
                className='flex items-center gap-x-2 h-11 px-12 bg-primary rounded font-medium text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300'
                onClick={() => handlePrint()}
              >
                <span>Print</span>
                <PrintIcon />
              </button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const Table = () => {
  const fakepaymentTableRows = [
    {
      id: 1,
      date: '12/12/2020',
      time: '12:00',
      driver: 'John Doe',
      distance: '12 km',
      city: 'Cairo',
      value: '100 EGP',
    },
    {
      id: 2,
      date: '12/12/2020',
      time: '12:00',
      driver: 'John Doe',
      distance: '12 km',
      city: 'Cairo',
      value: '100 EGP',
    },
    {
      id: 3,
      date: '12/12/2020',
      time: '12:00',
      driver: 'John Doe',
      distance: '12 km',
      city: 'Cairo',
      value: '100 EGP',
    },
    {
      id: 4,
      date: '12/12/2020',
      time: '12:00',
      driver: 'John Doe',
      distance: '12 km',
      city: 'Cairo',
      value: '100 EGP',
    },
    {
      id: 5,
      date: '12/12/2020',
      time: '12:00',
      driver: 'John Doe',
      distance: '12 km',
      city: 'Cairo',
      value: '100 EGP',
    },
  ]

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium border-gray-300'>
                <tr>
                  {paymentTableCols?.map((col) => (
                    <th key={col.uid} scope='col' className='px-6 py-4'>
                      {col.name === 'Actions' ? '' : col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fakepaymentTableRows?.map((order: any, index: number) => (
                  <tr
                    key={index}
                    // make table striped by adding bg-gray-50 to odd rows
                    className={`border-b transition duration-200 ease-in-out hover:bg-yellow-100 
                      ${index % 2 === 0 ? ' bg-gray-200' : ''}
                    `}
                  >
                    {paymentTableCols?.map((col) => (
                      <td
                        key={col.uid}
                        className={`whitespace-nowrap px-6 py-4 font-medium border-gray-300 ${
                          col.uid !== 'isPaid' && 'border-r'
                        } ${col.uid === 'id' && 'border-l'}`}
                      >
                        {order[col.uid as keyof typeof order]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

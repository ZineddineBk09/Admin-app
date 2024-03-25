import {
  Button,
  Modal,
  Text,
  Loading,
  Tooltip,
  Divider,
  Badge,
} from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { Account, APIResponse, DriverTeamMember } from '../../../interfaces'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { partialUpdateRecord, searchRecords } from '../../../lib/api'
import toast from 'react-hot-toast'

export const AddMember = ({
  id,
  refresh,
}: {
  id: string
  refresh: () => void
}) => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [search, setSearch] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<Account[]>([])
  const [selected, setSelected] = React.useState<Account[]>([])

  const handler = () => setVisible(true)

  const closeHandler = () => setVisible(false)

  const handleSearch = async (search: string) => {
    if (search === '') {
      setSearchResults([])
      return
    }

    const filtered: APIResponse = await searchRecords(search, 'account')
    console.log(filtered)
    if (filtered.results) {
      setSearchResults(filtered.results)
    }
  }

  const addMembers = async () => {
    setLoading(true)
    await partialUpdateRecord(
      {
        id,
        accounts: selected.map((member: Account) => member.id),
      },
      'team'
    )
      .then((res) => {
        if (res) {
          toast.success('Member added successfully')
          handler()
          refresh()
        }
      })
      .catch((err) => {
        toast.error('Error assigning member!')
      })

    // await addMembersToTeam(members)
    setLoading(false)
    closeHandler()
  }

  return (
    <div>
      <Tooltip content='Add Member' onClick={handler}>
        <button className='h-10 w-10 flex items-center justify-center text-4xl font-medium rounded-full bg-gray-200 pb-1'>
          +
        </button>
      </Tooltip>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        width='500px'
        open={visible}
        onClose={closeHandler}
        className='rounded-md'
      >
        {/* Form */}
        {loading ? (
          <Loading size='xl' className='my-3' color='warning' />
        ) : (
          <>
            <Modal.Header css={{ justifyContent: 'center' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold capitalize'
                h4
              >
                Add Member
              </Text>
            </Modal.Header>
            {/* <Divider css={{ my: '$5' }} /> */}
            <Modal.Body css={{ py: '$10' }}>
              <Flex
                direction={'column'}
                css={{
                  flexWrap: 'wrap',
                  gap: '$8',
                  '@lg': { flexWrap: 'nowrap', gap: '$12' },
                }}
              >
                <Flex
                  css={{
                    gap: '$10',
                    flexWrap: 'wrap',
                    '@lg': { flexWrap: 'nowrap' },
                  }}
                >
                  <input
                    name='name'
                    id='name'
                    type='text'
                    placeholder='search'
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      handleSearch(e.target.value)
                    }}
                    className='w-full bg-gray-200 px-4 py-3 rounded-lg'
                  />
                </Flex>

                {/* Selected members */}
                <div className='max-w-full h-fit flex items-center gap-x-2 overflow-x-auto'>
                  {selected?.map((member: any, index: number) => (
                    <Badge key={index}>
                      <span>{member.name}</span>
                      <XMarkIcon
                        className='w-4 ml-3 text-white hover:bg-gray-400 transition-all duration-300 rounded-full'
                        onClick={() => {
                          setSelected(
                            selected.filter((item) => item.id !== member.id)
                          )

                          // uncheck checkbox by triggering onChange
                          const checkbox = document.getElementById(
                            member.id
                          ) as HTMLInputElement
                        }}
                      />
                    </Badge>
                  ))}
                </div>

                {/* Search results */}
                <div className='w-full flex flex-col items-start max-h-64 overflow-y-auto'>
                  {searchResults?.map((member: any, index: number) => (
                    <div className='w-full' key={index}>
                      <div className='w-full flex items-start justify-between'>
                        <div className='w-full flex flex-col items-start gap-y-1'>
                          <span>{member.name}</span>
                          <span className='text-gray-500'>#{member.id}</span>
                        </div>

                        <input
                          type='checkbox'
                          id={member.id}
                          className='w-5 h-5 border-gray-400 border rounded-full'
                          checked={selected.includes(member)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelected([...selected, member])
                            } else {
                              setSelected(
                                selected.filter((item) => item.id !== member.id)
                              )
                            }
                          }}
                        />
                      </div>
                      <Divider className='mb-2' />
                    </div>
                  ))}
                </div>
              </Flex>
            </Modal.Body>
            <Modal.Footer>
              <Button
                auto
                className={`bg-primary text-black ${
                  selected?.length === 0 && 'opacity-50 cursor-not-allowed'
                }`}
                disabled={selected?.length === 0}
                onClick={addMembers}
              >
                Add {selected?.length > 0 && `(${selected?.length})`}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}

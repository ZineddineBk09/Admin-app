import {
  Button,
  Modal,
  Text,
  Loading,
  Tooltip,
  Divider,
  Checkbox,
  Badge,
} from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../styles/flex'
import { DriverTeamMember } from '@/interfaces'
import { searchMembers } from '@/lib/search'
import { XMarkIcon } from '@heroicons/react/24/outline'

export const AddMember = ({ members }: { members: DriverTeamMember[] }) => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [search, setSearch] = React.useState('')
  const [searchResults, setSearchResults] =
    React.useState<DriverTeamMember[]>(members)
  const [selected, setSelected] = React.useState<DriverTeamMember[]>([])

  const handler = () => setVisible(true)

  const closeHandler = () => {
    setVisible(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (e.target.value === '') return setSearchResults(members)
    setSearchResults(searchMembers(members, e.target.value))
  }

  return (
    <div>
      <Tooltip content='Add Member' onClick={handler}>
        <button className='h-10 w-16 flex items-center justify-center text-center text-4xl font-medium rounded-full'>
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
                    onChange={handleSearch}
                    className='w-full bg-gray-100 px-4 py-3 rounded-full'
                  />
                </Flex>

                {/* Selected members */}
                <div className='max-w-full h-fit flex items-center gap-x-2 overflow-x-auto'>
                  {selected.map((member: any, index: number) => (
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
                  {searchResults.map((member: any, index: number) => (
                    <div className='w-full' key={index}>
                      <div className='w-full flex items-start justify-between'>
                        <div className='w-full flex flex-col items-start gap-y-1'>
                          <span>{member.name}</span>
                          <span className='text-gray-500'>#{member.id}</span>
                        </div>
                        {/* <Checkbox
                          id={member.id}
                          aria-label='Checkbox'
                          onChange={(e: boolean) => {
                            if (e) {
                              setSelected([...selected, member])
                            } else {
                              setSelected(
                                selected.filter((item) => item.id !== member.id)
                              )
                            }
                          }}
                          value={member.id}
                          size='lg'
                          color='warning'
                          aria-checked={selected.includes(member)}
                        /> */}
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
                type='submit'
                className={`bg-primary text-black ${
                  selected.length === 0 && 'opacity-50 cursor-not-allowed'
                }`}
                disabled={selected.length === 0}
              >
                Add {selected.length > 0 && `(${selected.length})`}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}

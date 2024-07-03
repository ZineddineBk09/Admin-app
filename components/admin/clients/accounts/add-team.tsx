import {
  Button,
  Modal,
  Text,
  Loading,
  Tooltip,
  Divider,
} from '@nextui-org/react'
import React from 'react'
import { Flex } from '../../../styles/flex'
import { Team, APIResponse } from '../../../../interfaces'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { partialUpdateRecord, searchRecords } from '../../../../lib/api'
import toast from 'react-hot-toast'

export const AddTeam = ({
  id,
  refresh,
}: {
  id: string | number
  refresh: () => void
}) => {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [search, setSearch] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<Team[]>([])
  const [selected, setSelected] = React.useState<Team>({} as Team)

  const handler = () => setVisible(true)

  const closeHandler = () => setVisible(false)

  const handleSearch = async (search: string) => {
    if (search === '') {
      setSearchResults([])
      return
    }

    const filtered: APIResponse = await searchRecords(search, 'team')
    console.log(filtered)
    if (filtered.results) {
      setSearchResults(filtered.results)
    }
  }

  const addTeams = async () => {
    setLoading(true)
    await partialUpdateRecord(
      {
        id: selected.id,
        accounts: [...selected.accounts.map((account) => account.id), id],
      },
      'team'
    )
      .then((res) => {
        if (res) {
          toast.success('Team added successfully')
          handler()
          refresh()
        }
      })
      .catch((err) => {
        toast.error('Error assigning member!')
      })

    // await addTeamsToTeam(members)
    setLoading(false)
    closeHandler()
  }

  return (
    <div>
      <Tooltip content='Add Team' onClick={handler}>
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
          <Loading size='xl' className='my-3'  />
        ) : (
          <>
            <Modal.Header css={{ justifyContent: 'center' }}>
              <Text
                id='modal-title'
                className='text-xl font-semibold capitalize'
                h4
              >
                Add Team
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

                {/* Search results */}
                <div className='w-full flex flex-col items-start max-h-64 overflow-y-auto'>
                  {searchResults?.map((member: Team, index: number) => (
                    <div className='w-full' key={index}>
                      <div className='w-full flex items-start justify-between'>
                        <div className='w-full flex flex-col items-start gap-y-1'>
                          <span>{member.name}</span>
                          <span className='w-full flex items-center text-gray-500 gap-x-2'>
                            <MapPinIcon className='h-7 mb-1 text-gray-400' />
                            {member.city?.name}
                          </span>
                        </div>

                        <input
                          type='checkbox'
                          id={member.id as string}
                          className='w-5 h-5 border-gray-400 border rounded-full'
                          checked={member.id == selected?.id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelected(member)
                            } else {
                              setSelected({} as Team)
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
                className={`bg-primary text-black disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={selected.id == undefined}
                onClick={addTeams}
              >
                Add
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}

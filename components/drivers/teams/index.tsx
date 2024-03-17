import { Country, Team } from '../../../interfaces'
import { Divider, Tooltip } from '@nextui-org/react'
import React, { MouseEventHandler } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { AddTeam } from './add-team'
import { DeleteDriverTeam } from './delete-team'
import { BinIcon } from '../../../components/icons/areas'
import { AddMember } from './add-member'
import { useTeamsContext } from '../../../context/drivers/teams'
import toast from 'react-hot-toast'
import { updateRecord } from '../../../lib/api'
import { useFormik } from 'formik'
import { useAreasCountriesContext } from '../../../context/areas/countries'
import InfiniteScroll from 'react-infinite-scroll-component'
import dynamic from 'next/dynamic'
import Loading from '../../shared/loading'
import { DeleteModal } from '../../modals/delete'
const AddArea = dynamic(
  () => import('../shared/add-area').then((m) => m.AddArea),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const DriversTeams = () => {
  const { teams, hasMore, fetchNextPage } = useTeamsContext()

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-6'>
      <FilterWithCountry />

      <div className='w-full'>
        <InfiniteScroll
          dataLength={teams?.length}
          hasMore={hasMore}
          next={fetchNextPage}
          loader={
            <span className='font-bold text-lg text-center'>Loading...</span>
          }
          endMessage={<div className='w-1/2 h-1 bg-gray-500' />}
          className='w-full flex flex-col items-center gap-y-6'
        >
          {teams?.map((team: Team, index: number) => (
            <DriverTeamCard key={team?.id} team={team} />
          ))}
        </InfiniteScroll>
      </div>
      {/* add account button */}
      <AddTeam />
    </div>
  )
}

const SaveButton = (submit: MouseEventHandler<HTMLButtonElement>) => {
  return (
    <button
      onClick={submit}
      className='bg-primary-500 text-black px-6 py-2 rounded-md hover:bg-primary'
      type='button'
    >
      Save
    </button>
  )
}

const DriverTeamCard = ({ team }: { team: Team }) => {
  const {
    id,
    name,
    city,
    supervisor,
    fixed,
    price_ratio_nominator,
    price_ratio_denominator,
    additional_ratio_nominator,
    additional_ratio_denominator,
  } = team
  const { refreshTeams } = useTeamsContext()
  const [showInfos, setShowInfos] = React.useState(false)

  const [showSave, setShowSave] = React.useState({
    fixed: false,
    price_ratio_nominator: false,
    price_ratio_denominator: false,
    additional_ratio_nominator: false,
    additional_ratio_denominator: false,
  })
  const formik = useFormik({
    initialValues: {
      fixed: fixed,
      price_ratio_nominator: price_ratio_nominator,
      price_ratio_denominator: price_ratio_denominator,
      additional_ratio_nominator: additional_ratio_nominator,
      additional_ratio_denominator: additional_ratio_denominator,
    },
    onSubmit: async (values) => {
      await updateRecord(
        {
          ...values,
          id: id,
          name: name,
          city: city?.id,
          supervisor: supervisor?.id,
        },
        'team'
      )
        .then((res) => {
          if (res) {
            toast.success('Team updated successfully')

            refreshTeams()
            setShowSave({
              fixed: false,
              price_ratio_nominator: false,
              price_ratio_denominator: false,
              additional_ratio_nominator: false,
              additional_ratio_denominator: false,
            })
          }
        })
        .catch((err: any) => {
          console.log(err)
          toast.error('Error updating team!')
        })
    },
  })

  const areas: any = []
  const members: any = []

  return (
    <div className='w-full flex flex-col items-start gap-y-3 bg-white rounded-md p-4 shadow-lg'>
      <div className='w-full flex items-center justify-between'>
        <button onClick={() => setShowInfos(!showInfos)}>
          <div className='flex items-center gap-x-3'>
            <ChevronRightIcon
              className={`w-5 h-5 transform transition-all duration-300
            ${showInfos ? 'rotate-90' : 'rotate-0'}
            `}
            />
            <h1 className='text-lg font-semibold'>
              {name} <span className='ml-6 text-sm text-gray-400'>#{id}</span>
            </h1>
          </div>
        </button>
        <DeleteModal id={id} name='team' refresh={refreshTeams} />
      </div>
      {showInfos && (
        <>
          <Divider />

          <div className='flex items-center gap-x-6'>
            <label
              aria-label='Order Fees'
              className='text-gray-500 capitalize text-sm'
            >
              Order Fees
            </label>
            <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
              <input
                id='fixed'
                name='fixed'
                type='text'
                value={formik.values.fixed}
                placeholder='0'
                className='bg-transparent w-full h-full outline-none'
                onChange={(e) => {
                  formik.handleChange(e)
                  setShowSave({ ...showSave, fixed: true })
                }}
              />
              <span className='text-gray-500 w-32'>SAR / order</span>
            </div>
            {showSave.fixed &&
              fixed !== formik.values.fixed &&
              SaveButton(formik.handleSubmit as any)}
          </div>
          <Divider />
          <div className='w-full flex justify-between'>
            <div className='flex items-center gap-x-6'>
              <label
                aria-label='Price'
                className='text-gray-500 capitalize text-sm'
              >
                Price
              </label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <>
                  <input
                    id='price_ratio_nominator'
                    name='price_ratio_nominator'
                    type='text'
                    value={formik.values.price_ratio_nominator}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, price_ratio_nominator: true })
                    }}
                  />
                  <span className='text-gray-500 w-32'>SAR</span>
                </>
                <b className='mx-5'>/</b>
                <>
                  <input
                    id='price_ratio_denominator'
                    name='price_ratio_denominator'
                    type='text'
                    value={formik.values.price_ratio_denominator}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({
                        ...showSave,
                        price_ratio_denominator: true,
                      })
                    }}
                  />
                  <span className='text-gray-500 w-32'>KM</span>
                </>
              </div>
              {(showSave.price_ratio_denominator ||
                showSave.price_ratio_nominator) &&
                (price_ratio_denominator !==
                  formik.values.price_ratio_denominator ||
                  price_ratio_nominator !==
                    formik.values.price_ratio_nominator) &&
                SaveButton(formik.handleSubmit as any)}
            </div>
            <div className='flex items-center gap-x-6'>
              <label
                aria-label='Additional'
                className='text-gray-500 capitalize text-sm'
              >
                Additional
              </label>
              <div className='h-11 max-w-xs bg-gray-200 rounded px-4 flex justify-between items-center'>
                <>
                  <input
                    id='additional_ratio_nominator'
                    name='additional_ratio_nominator'
                    type='text'
                    value={formik.values.additional_ratio_nominator}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({
                        ...showSave,
                        additional_ratio_nominator: true,
                      })
                    }}
                  />
                  <span className='text-gray-500 w-32'>SAR</span>
                </>
                <b className='mx-5'>/</b>
                <>
                  <input
                    id='additional_ratio_denominator'
                    name='additional_ratio_denominator'
                    type='text'
                    value={formik.values.additional_ratio_denominator}
                    placeholder='0'
                    className='bg-transparent w-full h-full outline-none'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({
                        ...showSave,
                        additional_ratio_denominator: true,
                      })
                    }}
                  />
                  <span className='text-gray-500 w-32'>KM</span>
                </>
              </div>
              {(showSave.additional_ratio_denominator ||
                showSave.additional_ratio_nominator) &&
                (additional_ratio_denominator !==
                  formik.values.additional_ratio_denominator ||
                  additional_ratio_nominator !==
                    formik.values.additional_ratio_nominator) &&
                SaveButton(formik.handleSubmit as any)}
            </div>
            <div />
          </div>
          <Divider />

          {/* Members */}
          <div className='w-full flex items-start gap-x-6'>
            <label className='mt-2 text-gray-600 text-sm'>Members</label>
            {members?.length > 0 ? (
              <div className='w-full flex items-start gap-y-2'>
                {members?.map((member: any, index: number) => (
                  <div key={index}>
                    <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                      <p className='text-sm'>{member.name} </p>
                      <Tooltip
                        content={'Delete "' + member.name + '"'}
                        color='error'
                      >
                        <button>
                          <BinIcon width={4} />
                        </button>
                      </Tooltip>
                      {index < members?.length - 1 && (
                        <span className='-ml-4'>,</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm'>No memberes found</p>
            )}

            <AddMember members={members} />
          </div>
          <Divider />
          {/* Areas */}
          <div className='w-full flex items-start gap-x-6'>
            <label className='mt-2 text-gray-600 text-sm'>Areas</label>
            {areas?.length > 0 ? (
              <div className='w-full flex items-start gap-y-2'>
                {areas?.map((area: any, index: number) => (
                  <div key={index}>
                    <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                      {/* <label className='text-gray-600 text-sm'>
                        Area #{index + 1}
                      </label> */}
                      <p className='text-sm capitalize'>
                        {area}{' '}
                        {/* <span className='ml-6 text-sm text-gray-400'>
                          #{index}
                        </span> */}
                      </p>
                      <Tooltip content={'Delete "' + area + '"'} color='error'>
                        <button>
                          <BinIcon width={4} />
                        </button>
                      </Tooltip>
                      {index < areas?.length - 1 && (
                        <span className='-ml-4'>,</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm'>No areas found</p>
            )}
            <AddArea
              id={id}
              endpoint='team'
              areas={areas}
              refreshRecords={refreshTeams}
            />
          </div>
          <Divider />
          <div className='w-full flex items-center justify-between'>
            <div className='w-1/2 flex items-center gap-x-6'>
              <label className='text-gray-600 text-sm w-32 lg:w-fit'>
                Supervisor
              </label>
              <div className='flex items-center justify-between w-60 bg-gray-200 rounded-md p-2 lg:w-40 xl:w-60'>
                <input
                  name='supervisor'
                  id='supervisor'
                  type='text'
                  value={supervisor?.username}
                  onChange={(e) => {
                    console.log(e.target.value)
                  }}
                  className='text-sm bg-transparent w-full outline-none'
                />
              </div>
            </div>

            <div className='w-1/2 flex items-center gap-x-6 text-sm'>
              <label className='text-gray-600'>City</label>
              <p>{city?.name}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const FilterWithCountry = () => {
  const { countries } = useAreasCountriesContext()
  const { handleFilterCountry } = useTeamsContext()

  return (
    <div className='w-full flex items-center gap-x-6 ml-12'>
      <label aria-label='Country' className='text-sm'>
        Select Country
      </label>
      <select
        name='country'
        id='country'
        className='w-72 h-10 bg-white rounded-full text-gray-900 text-sm block  p-2.5'
        onChange={(e) => handleFilterCountry(e.target.value)}
      >
        <option value='all'>Select Country (All)</option>
        {countries?.map((country: Country, index: number) => (
          <option key={index} value={country?.name} className='px-2'>
            {country?.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DriversTeams

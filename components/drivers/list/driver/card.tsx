import { Checkbox, Divider, Tooltip } from '@nextui-org/react'
import React, { MouseEventHandler } from 'react'
import { useDriversContext } from '../../../../context/drivers'
import { Driver, Team, DriverType, Geofence } from '../../../../interfaces'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { DeleteDriver } from '../../../drivers/list/delete-driver'
import { BinIcon } from '../../../icons/areas'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useTeamsContext } from '../../../../context/drivers/teams'
import * as Yup from 'yup'
import { AddArea } from '../../shared/add-area'
import { partialUpdateRecord } from '../../../../lib/api'

export const DriverCard = ({ driver }: { driver: Driver }) => {
  const [showInfos, setShowInfos] = React.useState(false)
  const { teams } = useTeamsContext()
  const { driverTypes, refreshDrivers } = useDriversContext()
  const {
    id,
    user,
    image,
    status,
    team,
    phone_number,
    driver_type,
    vehicle_license,
    residency_id,
    is_freelance,
    is_idle,
    code,
    areas,
    city,
  } = driver

  const [showSave, setShowSave] = React.useState({
    team: false,
    phone_number: false,
    driver_type: false,
    is_freelance: false,
  })
  const formik = useFormik({
    initialValues: {
      team: team ? team.id : '',
      phone_number: phone_number,
      driver_type: driver_type.id,
      is_freelance: is_freelance,
    },
    validationSchema: Yup.object({
      team: Yup.string(),
      phone_number: Yup.string().matches(
        //composed only of digits
        /^[0-9]*$/,
        "Phone number can't contain letters"
      ),
      driver_type: Yup.string(),
      is_freelance: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      console.log('values', values)
      await partialUpdateRecord(
        {
          ...values,
          id,
        },
        'driver'
      )
        .then((res) => {
          if (res) {
            toast.success('Driver updated successfully')
            refreshDrivers()
            setShowSave({
              team: false,
              phone_number: false,
              driver_type: false,
              is_freelance: false,
            })
          }
        })
        .catch((err) => {
          toast.error('Error updating driver!')
        })
    },
  })

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
            <h1 className='flex items-center text-lg font-semibold capitalize'>
              <div
                className={`h-4 w-4 rounded-full mr-4 
              ${is_idle ? 'bg-red-500' : 'bg-green-500'}
              animate-ping
              `}
              />
              {user?.username}{' '}
              <span className='ml-6 text-sm text-gray-400'>#{id}</span>
            </h1>
          </div>
        </button>
        <DeleteDriver id={id} />
      </div>
      {showInfos && (
        <>
          <Divider />
          {/* Name, Team & Phone */}
          <div className='w-full flex items-center justify-between'>
            <div className='w-1/3 flex items-center gap-x-6'>
              <label className='text-gray-600 text-sm'>Name</label>
              <p className='text-sm capitalize'>{user?.username}</p>
            </div>

            <div className='w-1/3 flex items-center gap-x-6'>
              <label className='text-gray-500 capitalize'>Team</label>
              {team && (
                <div className='h-11 bg-gray-200 rounded px-4 flex justify-between items-center'>
                  <select
                    id='team'
                    name='team'
                    onChange={(e) => {
                      formik.handleChange(e)
                      setShowSave({ ...showSave, team: true })
                    }}
                    value={formik.values.team}
                    className={`border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-fit p-2.5 ${
                      formik.touched.team && formik.errors.team
                        ? 'border-red-500 bg-red-200'
                        : 'border-gray-300 bg-transparent'
                    }`}
                  >
                    {/* <option value={team.id}>{team.name}</option> */}
                    {teams?.map((tm: Team) => (
                      <option key={tm.id} value={tm.id}>
                        {tm.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {
                // Display save button if user changed price unit
                team && showSave.team && SaveButton(formik.handleSubmit as any)
              }
            </div>

            <div className='w-1/3 flex items-center gap-x-6'>
              <label className='text-gray-500 capitalize'>Phone</label>
              <div className='h-11 bg-gray-200 rounded px-4 flex justify-between items-center'>
                <input
                  id='phone_number'
                  name='phone_number'
                  type='text'
                  onChange={(e) => {
                    formik.handleChange(e)
                    setShowSave({ ...showSave, phone_number: true })
                  }}
                  value={formik.values.phone_number}
                  placeholder='Phone Number'
                  className='bg-transparent w-full h-full outline-none text-sm'
                />
              </div>
              {
                // Display save button if user changed driver fees
                showSave.phone_number && SaveButton(formik.handleSubmit as any)
              }
            </div>
          </div>

          <Divider />
          {/* Areas & City */}
          <div className='w-full grid grid-cols-3 items-center justify-between'>
            <div className='flex items-center gap-x-6 col-span-1'>
              <label className='text-gray-600 text-sm'>City</label>
              <p className='text-sm capitalize'>{city?.name}</p>
            </div>
            {/* Areas */}
            <div className='flex items-start gap-x-6 col-span-2'>
              <label className='mt-2 text-gray-600 text-sm'>Areas</label>
              {areas?.length > 0 ? (
                <div className='flex items-start gap-y-2'>
                  {areas?.map((area: Geofence, index: number) => (
                    <div key={index}>
                      <div className='h-10 w-fit flex items-center gap-x-6 transition-all duration-300 hover:bg-gray-100 px-2 rounded-md'>
                        <p className='text-sm capitalize'>{area?.name}</p>
                        <Tooltip
                          content={'Delete "' + area?.name + '"'}
                          color='error'
                        >
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
                <></>
              )}

              <AddArea
                id={id}
                endpoint='driver'
                areas={areas.map((a) => a?.id) || []}
                refreshRecords={refreshDrivers}
              />
            </div>
          </div>
          <Divider />
          {/* Driver Type & Vehicle License */}
          <div className='w-full flex items-center justify-between'>
            <div className='w-1/2 flex items-center gap-x-6'>
              <label className='text-gray-500 capitalize'>Type</label>
              <div className='h-11 bg-gray-200 rounded px-4 flex justify-between items-center'>
                <select
                  id='driver_type'
                  name='driver_type'
                  onChange={(e) => {
                    formik.handleChange(e)
                    setShowSave({ ...showSave, driver_type: true })
                  }}
                  value={formik.values.driver_type}
                  className={`border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-fit p-2.5 ${
                    formik.touched.driver_type && formik.errors.driver_type
                      ? 'border-red-500 bg-red-200'
                      : 'border-gray-300 bg-transparent'
                  }`}
                >
                  {driverTypes?.map((dt: DriverType) => (
                    <option key={dt.id} value={dt.id}>
                      {dt.vehicle_type}
                    </option>
                  ))}
                </select>
              </div>
              {
                // Display save button if user changed price unit
                showSave.driver_type && SaveButton(formik.handleSubmit as any)
              }
            </div>

            <div className='w-1/2 flex items-center gap-x-6'>
              <label className='text-gray-500'>Freelancer</label>

              <Checkbox
                defaultSelected={is_freelance}
                value={is_freelance ? 'freelancer' : ''}
                onChange={(e) => {
                  formik.setFieldValue('is_freelance', e)
                  // check if value is different from initial value
                  e !== is_freelance
                    ? setShowSave({ ...showSave, is_freelance: true })
                    : setShowSave({ ...showSave, is_freelance: false })
                }}
                color='warning'
                size='xl'
              />
              {
                // Display save button if user changed driver fees
                showSave.is_freelance && SaveButton(formik.handleSubmit as any)
              }
            </div>
          </div>

          <Divider />

          <div className='w-full flex items-center gap-x-6'>
            <label className='text-gray-600 text-sm'>Contract</label>
            <div className='flex items-center gap-x-3'>
              <Btn bg='gray-400'>
                Upload New
                <input
                  type='file'
                  className='absolute inset-0 opacity-0 cursor-pointer'
                />
              </Btn>
              <Btn bg='gray-400'>Download</Btn>
              <Btn bg='primary'>Print</Btn>
            </div>
          </div>
        </>
      )}
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

const Btn = ({
  children,
  bg = '[#B4B4B4]',
}: {
  children: any
  bg?: string
}) => {
  return (
    <button
      className={`min-w-[128px] relative font-medium shadow-md shadow-black/30 rounded-md text-center py-2 bg-${bg} cursor-pointer h-11 px-12 bg-${bg} rounded font-medium text-md hover:bg-opacity-90 transition-all duration-300`}
    >
      {children}
    </button>
  )
}

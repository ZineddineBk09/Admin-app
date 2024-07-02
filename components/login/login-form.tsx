import React from 'react'
import Logo from '../../components/navbar/Logo'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { signIn, signOut } from 'next-auth/react'
import { useCurrentRole } from '../../hooks/current-role'

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  const router = useRouter()
  const role = useCurrentRole()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: Yup.object({
      username: Yup.string().required('please enter a valid username'),
      password: Yup.string()
        .min(6, 'password must be at least 6 characters')
        .required('please enter a password'),
    }),

    onSubmit: async (values: any) => {
      try {
        // empty the error
        setError('')
        // await signOut()
        const signin = await signIn('fleetrun-auth', {
          username: values.username,
          password: values.password,
          redirect: false,
        })
        if (signin?.status === 200) {
          // if admin redirect to admin dashboard
          if (role === 'admin') {
            router.push('/admin/dashboard')
          } else if (role === 'client' || role === 'branch') {
            // if client redirect to client dashboard
            router.push('/client/orders/list')
          }
        } else {
          setError('username or password incorrect, please try again')
        }
      } catch (error: any) {
        // empty the form password field
        formik.setFieldValue('password', '')
        setError('username or password incorrect, please try again')
      }
    },
  })

  return (
    <section className='w-full h-screen bg-gray-100 bg-login-bg bg-center bg-cover'>
      <div className='w-full h-full flex items-center justify-center px-6 mx-auto lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border'>
          <div className='w-full flex flex-col items-center justify-center mx-auto p-6 space-y-4 md:space-y-6 sm:p-8'>
            <Logo />
            <h1 className='text-xl font-bold leading-tight tracking-tight text-slate-900  md:text-2xl text-center'>
              FleetRun
            </h1>

            {
              // show error message
              error && (
                <div className='w-full text-center transition-all duration-300 text-xs text-red-500 rounded py-1 px-2 mx-auto'>
                  {error}
                </div>
              )
            }

            <form
              className='w-full flex flex-col space-y-4 md:space-y-6'
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-500'>
                  Username
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  placeholder='John Doe'
                  className={
                    'bg-gray-200 text-slate-900 sm:text-sm rounded block w-full py-3 px-2.5 outline-none' +
                    ' ' +
                    (formik.touched.username && formik.errors.username
                      ? 'border border-red-500'
                      : '')
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <span className='w-full transition-all duration-300 text-xs text-red-500 rounded py-1 px-2 mx-auto'>
                    {formik.errors.username as string}
                  </span>
                ) : null}
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-500 '>
                  Password
                </label>
                <div
                  className={
                    'flex items-center bg-gray-200 rounded w-full py-3 px-2.5 ' +
                    ' ' +
                    (formik.touched.password && formik.errors.password
                      ? 'border border-red-500'
                      : '')
                  }
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className=' text-slate-900 sm:text-sm w-full bg-gray-200 outline-none'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />

                  <button
                    type='button'
                    className='bg-gray-200'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className='w-5 h-5 ml-3 text-gray-400' />
                    ) : (
                      <EyeIcon className='w-5 h-5 ml-3 text-gray-400' />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <span className='w-full transition-all duration-300 text-xs text-red-500 rounded py-1 px-2 mx-auto'>
                    {formik.errors.password as string}
                  </span>
                ) : null}
              </div>

              <button
                type='submit'
                className={
                  'w-full text-black disabled:bg-gray-300 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center cursor-pointer' +
                  ' ' +
                  (formik.errors.username ||
                  formik.errors.password ||
                  formik.isSubmitting
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600')
                }
                disabled={formik.isSubmitting}
              >
                {!formik.isSubmitting ? 'Login' : 'Loading...'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm

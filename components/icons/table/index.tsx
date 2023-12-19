import { Svg } from '@/components/styles/svg'

interface Props {
  size?: number
  fill?: string
  width?: number
  height?: number
}

export const DeleteIcon = ({ fill, size, height, width, ...props }: Props) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332'
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169'
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664'
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.60834 13.75H11.3833'
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.91669 10.4167H12.0834'
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const NotesIcon = ({ fill, size, height, width, ...props }: Props) => {
  return (
    <svg
      width={size || width || 20}
      height={size || height || 21}
      viewBox='0 0 20 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M10.2392 5.93449L1 15.1736V19.7932H5.61958L14.8587 10.554M10.2392 5.93449L13.5521 2.62148L13.5542 2.61952C14.0101 2.16348 14.2386 1.93505 14.5019 1.8495C14.7339 1.77413 14.9837 1.77413 15.2157 1.8495C15.4788 1.93499 15.707 2.16315 16.1624 2.61855L18.1717 4.62784C18.629 5.0852 18.8578 5.31398 18.9435 5.57768C19.0189 5.80963 19.0188 6.05948 18.9435 6.29144C18.8579 6.55494 18.6295 6.78338 18.1727 7.24008L18.1717 7.24106L14.8587 10.554M10.2392 5.93449L14.8587 10.554'
        stroke='#5E5E5E'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const EditIcon = ({ fill, size, height, width, ...props }: Props) => {
  return (
    <svg
      width={size || width || 20}
      height={size || height || 20}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6 10H14M10 14V6.5M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19Z'
        stroke='#64EA8A'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const EyeIcon = ({ fill, size, height, width, ...props }: Props) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z'
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z'
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const PrintIcon = ({ fill, size, height, width, ...props }: Props) => {
  return (
    <Svg
      width='29'
      height='26'
      viewBox='0 0 29 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M7 20.5H4C2.34314 20.5 1 19.1569 1 17.5V11.5C1 9.01473 3.01473 7 5.5 7H7M7 20.5V16H22V20.5M7 20.5V22C7 23.6569 8.34314 25 10 25H19C20.6569 25 22 23.6569 22 22V20.5M7 7V4C7 2.34314 8.34314 1 10 1H19C20.6569 1 22 2.34314 22 4V7M7 7H22M22 20.5H25C26.6569 20.5 28 19.1569 28 17.5V11.5C28 9.01473 25.9854 7 23.5 7H22M19 11.5H22'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const CheckedIcon = ({ fill, size, height, width, ...props }: Props) => {
  return (
    <Svg
      width={size || width || 20}
      height={size || height || 16}
      viewBox='0 0 10 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M1.5 4.5L3.5 6.5L8.5 1.5'
        stroke='#FFDB00'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

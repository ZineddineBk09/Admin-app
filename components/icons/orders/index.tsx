import React from 'react'
import { Svg } from '../../styles/svg'

export const BagIcon = ({
  color,
  width,
}: {
  color?: string
  width?: string
}) => {
  const fill: string = color ? `!fill-${color}-400` : '!fill-current'
  const stroke: string = color ? `stroke-${color}-400` : 'stroke-current'

  return (
    <Svg
      width='23'
      height='25'
      viewBox='0 0 23 25'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke={color}
      className={`${stroke} ${width ? 'w-' + width : 'w-5'}`}
    >
      <path
        d='M1.95061 22.3198C3.32037 23.9703 5.86974 23.9703 10.9684 23.9703H11.7919C16.8906 23.9703 19.4401 23.9703 20.8098 22.3198M1.95061 22.3198C0.580853 20.6694 1.05067 18.1637 1.9903 13.1523C2.65852 9.58843 2.99265 7.8065 4.26109 6.75377M20.8098 22.3198C22.1796 20.6694 21.7097 18.1637 20.7701 13.1523C20.1019 9.58843 19.7678 7.8065 18.4994 6.75377M18.4994 6.75377C17.2309 5.70105 15.4179 5.70105 11.7919 5.70105H10.9684C7.34252 5.70105 5.52955 5.70105 4.26109 6.75377'
        strokeWidth='1.5'
        className={`${stroke}`}
      />
      <path
        d='M7.95459 5.70098V4.55915C7.95459 2.66731 9.48818 1.13367 11.3801 1.13367C13.272 1.13367 14.8056 2.66731 14.8056 4.55915V5.70098'
        strokeWidth='1.5'
        strokeLinecap='round'
        className={`${stroke}`}
      />
    </Svg>
  )
}

export const TrajectoryIcon = ({ color }: { color?: string }) => {
  const fill: string = color ? `!fill-${color}-400` : '!fill-current'
  const stroke: string = color ? `stroke-${color}-400` : 'stroke-current'

  return (
    <Svg
      width='233'
      height='6'
      viewBox='0 0 233 6'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
      className={`${fill} ${stroke} w-full md:w-40`}
    >
      <path
        d='M0.516561 3.2384C0.516561 4.71116 1.71047 5.90507 3.18323 5.90507C4.65599 5.90507 5.84989 4.71116 5.84989 3.2384C5.84989 1.76564 4.65599 0.571737 3.18323 0.571737C1.71047 0.571737 0.516561 1.76564 0.516561 3.2384ZM227.195 3.2384C227.195 4.71116 228.389 5.90507 229.861 5.90507C231.334 5.90507 232.528 4.71116 232.528 3.2384C232.528 1.76564 231.334 0.571737 229.861 0.571737C228.389 0.571737 227.195 1.76564 227.195 3.2384ZM3.18323 3.7384H6.72507V2.7384H3.18323V3.7384ZM13.8088 3.7384H20.8925V2.7384H13.8088V3.7384ZM27.9761 3.7384H35.0598V2.7384H27.9761V3.7384ZM42.1435 3.7384H49.2272V2.7384H42.1435V3.7384ZM56.3109 3.7384H63.3946V2.7384H56.3109V3.7384ZM70.4783 3.7384H77.562V2.7384H70.4783V3.7384ZM84.6457 3.7384H91.7294V2.7384H84.6457V3.7384ZM98.8131 3.7384H105.897V2.7384H98.8131V3.7384ZM112.98 3.7384H120.064V2.7384H112.98V3.7384ZM127.148 3.7384H134.232V2.7384H127.148V3.7384ZM141.315 3.7384H148.399V2.7384H141.315V3.7384ZM155.483 3.7384H162.566V2.7384H155.483V3.7384ZM169.65 3.7384H176.734V2.7384H169.65V3.7384ZM183.817 3.7384H190.901V2.7384H183.817V3.7384ZM197.985 3.7384H205.068V2.7384H197.985V3.7384ZM212.152 3.7384H219.236V2.7384H212.152V3.7384ZM226.32 3.7384H229.861V2.7384H226.32V3.7384Z'
        className={`${fill} ${stroke}`}
      />
    </Svg>
  )
}

export const BagCheckedIcon = ({
  color = '#5E5E5E',
  width,
}: {
  color?: string
  width?: string
}) => {
  const fill: string = color ? `!fill-${color}-400` : '!fill-current'
  const stroke: string = color ? `stroke-${color}-400` : 'stroke-current'

  return (
    <Svg
      width='23'
      height='25'
      viewBox='0 0 23 25'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke={color}
      className={`${width ? 'w-' + width : 'w-5'}`}
    >
      <path
        d='M2.20598 22.3198C3.57574 23.9703 6.12512 23.9703 11.2238 23.9703H12.0473C17.146 23.9703 19.6955 23.9703 21.0652 22.3198M2.20598 22.3198C0.836224 20.6694 1.30604 18.1637 2.24567 13.1523C2.91389 9.58843 3.24802 7.8065 4.51646 6.75377M21.0652 22.3198C22.4349 20.6694 21.9651 18.1637 21.0255 13.1523C20.3573 9.58843 20.0232 7.8065 18.7547 6.75377M18.7547 6.75377C17.4863 5.70105 15.6733 5.70105 12.0473 5.70105H11.2238C7.59789 5.70105 5.78492 5.70105 4.51646 6.75377'
        strokeWidth='1.5'
        className={`${stroke}`}
      />
      <path
        d='M9.35168 15.1782C9.94623 15.7133 10.2795 16.0133 10.8741 16.5484L13.919 13.1229'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={`${stroke}`}
      />
      <path
        d='M8.20984 5.70098V4.55915C8.20984 2.66731 9.74343 1.13367 11.6353 1.13367C13.5272 1.13367 15.0608 2.66731 15.0608 4.55915V5.70098'
        strokeWidth='1.5'
        strokeLinecap='round'
        className={`${stroke}`}
      />
    </Svg>
  )
}

export const BagCrossedIcon = ({ color }: { color?: string }) => {
  return (
    <Svg
      width='23'
      height='25'
      viewBox='0 0 23 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-5'
    >
      <path
        d='M2.20598 22.461C3.57574 24.1115 6.12511 24.1115 11.2238 24.1115H12.0473C17.146 24.1115 19.6955 24.1115 21.0652 22.461M2.20598 22.461C0.836224 20.8106 1.30604 18.3049 2.24567 13.2935C2.91389 9.72966 3.24801 7.94773 4.51646 6.895M21.0652 22.461C22.4349 20.8106 21.9651 18.3049 21.0255 13.2935C20.3573 9.72966 20.0232 7.94773 18.7547 6.895M18.7547 6.895C17.4862 5.84229 15.6733 5.84229 12.0473 5.84229H11.2238C7.59789 5.84229 5.78492 5.84229 4.51646 6.895'
        stroke='#F04646'
        strokeWidth='1.5'
      />
      <path
        d='M13.919 12.6932L9.35171 17.2605M9.35168 12.6932L13.919 17.2605'
        stroke='#F04646'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M8.20996 5.84221V4.70038C8.20996 2.80855 9.74355 1.2749 11.6354 1.2749C13.5273 1.2749 15.0609 2.80855 15.0609 4.70038V5.84221'
        stroke='#F04646'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </Svg>
  )
}

export const CancelIcon = ({ color }: { color?: string }) => {
  return (
    <Svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-5'
    >
      <path
        d='M6 10H14M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19Z'
        stroke='#F36A6A'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

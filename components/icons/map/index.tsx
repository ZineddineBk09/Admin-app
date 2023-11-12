import React from 'react'
import { Svg } from '../../styles/svg'

export const MapPinIcon = () => {
  return (
    <Svg
      width='59'
      height='91'
      viewBox='0 0 59 91'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M57.5 29.4469C57.5 37.3238 54.2629 52.516 48.9668 65.7654C46.3236 72.378 43.208 78.4014 39.8024 82.7436C36.3531 87.1417 32.8602 89.5 29.5 89.5C26.1398 89.5 22.6469 87.1417 19.1976 82.7436C15.792 78.4014 12.6764 72.378 10.0332 65.7654C4.73711 52.516 1.5 37.3238 1.5 29.4469C1.5 14.0148 14.0335 1.5 29.5 1.5C44.9665 1.5 57.5 14.0148 57.5 29.4469Z'
        fill='#FAFAFA'
        stroke='#E8E8E8'
        strokeWidth='2'
      />
    </Svg>
  )
}

export const ShadowBgIcon = () => {
  return (
    <Svg
      width='165'
      height='107'
      viewBox='0 0 165 107'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='absolute top-10 -z-10'
    >
      <g filter='url(#filter0_f_198_402)'>
        <path
          d='M104.524 23.2676L28.3925 71.3505L23.3839 83.3714L141.588 76.3593L135.578 40.297L104.524 23.2676Z'
          fill='url(#paint0_linear_198_402)'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_198_402'
          x='0.383911'
          y='0.267578'
          width='164.204'
          height='106.104'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur
            stdDeviation='11.5'
            result='effect1_foregroundBlur_198_402'
          />
        </filter>
        <linearGradient
          id='paint0_linear_198_402'
          x1='44.4202'
          y1='73.3541'
          x2='139.585'
          y2='46.3074'
          gradientUnits='userSpaceOnUse'
        >
          <stop />
          <stop offset='1' stop-opacity='0' />
        </linearGradient>
      </defs>
    </Svg>
  )
}
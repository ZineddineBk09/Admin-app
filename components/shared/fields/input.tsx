interface Props {
  id: string
  name: string
  disabled?: boolean
  value: number | string
}

interface InputProps extends Props {
  type: string
  min?: number
  max?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputField = (props: InputProps) => (
  <input className='bg-transparent w-full h-full outline-none' {...props} />
)

interface TextAreaProps extends Props {
  rows: number
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void // Update the type of onChange prop
}

export const TextAreaField = (props: TextAreaProps) => (
  <textarea className='bg-transparent w-full h-full outline-none' {...props} />
)

interface SelectProps extends Props {
  options: { value: string | number; label: string }[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error: boolean
}

export const SelectField = (props: SelectProps) => (
  <select
    className={`w-full border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block p-2.5 ${
      props?.error ? 'border-red-500 bg-red-200' : 'border-gray-300 bg-transparent'
    }`}
    {...props}
  >
    {props.options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)

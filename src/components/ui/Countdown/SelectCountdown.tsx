import { Text } from '@/components/shared'

type Props = {
  value: number
  onChange: (value: number) => void
  quantity: number
  label: string
}

const SelectCountdown = (props: Props) => {
  const { value, onChange, quantity, label } = props
  return (
    <label className="flex w-full flex-col items-start gap-xxs">
      <Text className="block text-xl" bold>
        {label}
      </Text>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full flex-1 rounded border bg-dark-4 p-1 text-white focus:outline-none"
      >
        {[...Array(quantity).keys()].map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectCountdown

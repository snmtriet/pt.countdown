import { cn } from '@/utils'
import { ReactNode } from 'react'

type Props = {
  size?: 'xl' | 'large' | 'medium' | 'small' | 'xs'
  bold?: boolean
  underline?: boolean
  children: ReactNode
  className?: string
}

const Text = (props: Props) => {
  const {
    size = 'medium',
    bold = false,
    underline = false,
    children,
    className,
  } = props

  const sizeClass = () => {
    return ['xl', 'large', 'medium', 'small', 'xs'].includes(size)
      ? `size-${size}`
      : 'size-medium'
  }

  return (
    <p
      className={cn(className, {
        [sizeClass()]: sizeClass(),
        'font-bold': bold,
        underline: underline,
      })}
    >
      {children}
    </p>
  )
}

export default Text

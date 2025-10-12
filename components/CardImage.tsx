import Image from 'next/image'
import { CARD_SIZES } from '@/lib/imageSizes'

type Props = { src: string; alt?: string }

export function CardImage({ src, alt = '' }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={960}
      height={640}
      sizes={CARD_SIZES}
      className="h-auto w-full object-cover"
    />
  )
}



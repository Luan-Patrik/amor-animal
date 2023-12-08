import { UploadCloudIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { useDropzone, type DropzoneOptions } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'
import { Button } from './ui/button'

const variants = {
  base: 'w-full relative rounded-md p-4 flex justify-center items-center flex-col cursor-pointer border border-dashed border-input transition-colors duration-200 ease-in-out',
  active:
    'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  disabled:
    'bg-muted focus-visible:outline-none cursor-default pointer-events-none',
  accept: 'border-green-600',
  reject: 'border-destructive'
}

interface InputProps {
  width: number
  height: number
  className?: string
  value?: File[]
  onChange?: (files: File[]) => void | Promise<void>
  onFilesAdded?: (addedFiles: File[]) => void | Promise<void>
  disabled?: boolean
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>
}

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `O arquivo é muito grande. O tamanho máximo é ${formatFileSize(
      maxSize
    )}.`
  },
  fileInvalidType() {
    return 'Tipo de arquivo inválido.'
  },
  tooManyFiles(maxFiles: number) {
    return `Você só pode adicionar ${maxFiles} arquivos.`
  },
  fileNotSupported() {
    return 'Arquivo não suportado.'
  }
}

const ImageInputFileDropzone = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      dropzoneOptions,
      width,
      height,
      value,
      className,
      disabled,
      onFilesAdded,
      onChange
    },
    ref
  ) => {
    const [imageUrls, setImageUrls] = useState<string[]>(() =>
      value ? value.map((file) => URL.createObjectURL(file)) : []
    )

    if (dropzoneOptions?.maxFiles && value?.length) {
      disabled = disabled ?? value.length >= dropzoneOptions.maxFiles
    }

    function handleImageRemove(index: number) {
      const updatedImageUrls = [...imageUrls]
      updatedImageUrls.splice(index, 1)

      const updatedFiles = [...(value ?? [])]
      updatedFiles.splice(index, 1)

      setImageUrls(updatedImageUrls)
      void onChange?.(updatedFiles)
    }

    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject
    } = useDropzone({
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles

        if (files && files.length > 0) {
          const newImageUrls = files.map((file) => URL.createObjectURL(file))
          setImageUrls((prevImageUrls) => [...prevImageUrls, ...newImageUrls])
          void onFilesAdded?.(files)
          void onChange?.([...(value ?? []), ...files])
        }
      },
      ...dropzoneOptions
    })

    const dropzoneClassName = useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
        disabled,
        fileRejections,
        isDragAccept,
        isDragReject,
        className
      ]
    )

    return (
      <>
        <div {...getRootProps({ className: dropzoneClassName })}>
          <input ref={ref} {...getInputProps()} />
          <div className='flex flex-col items-center justify-center text-xs text-foreground'>
            <UploadCloudIcon
              aria-hidden='true'
              focusable='false'
              className='mb-1 h-7 w-7'
            />
            <div className='text-foreground'>arraste & solte ou clique</div>
          </div>
        </div>
        <div
          style={{ gridTemplateAreas: 'a a', gridAutoColumns: '200px' }}
          className='grid grid-cols-1 place-items-center gap-2 sm:grid-cols-2 md:grid-cols-3'>
          {imageUrls.map((item, i) => (
            <div
              key={i}
              className='relative flex h-[12.5rem] w-full flex-col items-center justify-center rounded-md bg-muted'>
              <Button
                type='button'
                variant='ghost'
                className='absolute right-2 top-2 h-fit w-fit bg-muted p-0.5 text-foreground focus-visible:ring-offset-muted'
                onClick={() => handleImageRemove(i)}>
                <XIcon
                  aria-hidden='true'
                  focusable='false'
                  className='h-[1.2rem] w-[1.2rem]'
                />
              </Button>
              <Image
                src={item}
                width={width}
                height={height}
                alt=''
                className='h-full w-full rounded-md object-contain'
              />
            </div>
          ))}
        </div>
      </>
    )
  }
)
ImageInputFileDropzone.displayName = 'ImageInputFileDropzone'

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return '0 Bytes'
  }
  bytes = Number(bytes)
  if (bytes === 0) {
    return '0 Bytes'
  }
  const k = 1024
  const dm = 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export { ImageInputFileDropzone }

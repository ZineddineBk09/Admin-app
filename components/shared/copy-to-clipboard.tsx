import { useState } from 'react'
import { IconButton, Snackbar } from '@mui/material'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@nextui-org/react'

const CopyToClipboardButton = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <Tooltip content='copy to clipboard'>
        <IconButton onClick={handleClick}>
          <ClipboardIcon className='!text-gray-500 w-5 h-5 -ml-5' />
        </IconButton>
      </Tooltip>
      <Snackbar
        message='Copied to clibboard'
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  )
}

export default CopyToClipboardButton

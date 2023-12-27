import { useEffect, useRef, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import React from 'react'
import { EmojiIcon } from '../icons/support'
import EmojiPicker, { EmojiStyle, EmojiClickData } from 'emoji-picker-react'

const Emojis = ({
  onSelectEmojis,
}: {
  onSelectEmojis: (emoji: any) => void
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState<any>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  function handleClickOutside(event: MouseEvent) {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node)
    ) {
      setShowEmojiPicker(false)
    }
  }

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setChosenEmoji(emojiData)
    setShowEmojiPicker(false)
    onSelectEmojis(emojiData.emoji)
  }

  useEffect(() => {
    // Attach event listener when emoji picker is shown
    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Cleanup when component unmounts or emoji picker is hidden
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmojiPicker])

  return (
    <Tooltip content={showEmojiPicker ? '' : 'Add an emoji'} color='warning'>
      <button
        type='button'
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <EmojiIcon />
      </button>
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className='absolute bottom-32 -left-24'>
          <EmojiPicker
            onEmojiClick={onClick}
            autoFocusSearch={false}
            emojiStyle={EmojiStyle.NATIVE}
          />
        </div>
      )}
    </Tooltip>
  )
}

export default Emojis

import { Tooltip } from '@nextui-org/react'
import React from 'react'
import { EmojiIcon } from '../icons/support'
import EmojiPicker from 'emoji-picker-react'

const Emojis = () => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
  const [chosenEmoji, setChosenEmoji] = React.useState(null)

  return (
    <Tooltip content={showEmojiPicker ? '' : 'Add an emoji'} color='warning'>
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <EmojiIcon />
      </button>
      {showEmojiPicker && (
        <div className='absolute bottom-4 -left-24'>
          <EmojiPicker
            onEmojiClick={(event, emojiObject) =>
              console.log('emoji: ', emojiObject.names)
            }
            style={{ position: 'absolute', bottom: '100px' }}
          />
        </div>
      )}
    </Tooltip>
  )
}

export default Emojis

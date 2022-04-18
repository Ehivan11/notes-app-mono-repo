import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '../i18n/index'

const Toggleable = forwardRef(({ children, buttonLabel = 'New'}, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
          {children}
          <button onClick={toggleVisibility}>{i18n.TOGLEABLE.CANCEL_BUTTON}</button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string
}

export default Toggleable

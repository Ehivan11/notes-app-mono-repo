import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Toggleable from './Toggleable'
import i18n from '../i18n/index'

describe('<Toggleable />', () => {
  const buttonLabel = 'show'
  let component

  beforeEach(() => {
    component = render(
            <Toggleable buttonLabel={buttonLabel}>
                <div className='testDiv'>testDivContent</div>
            </Toggleable>
    )
  })

  test('renders its children', () => {
    component.getByText('testDivContent')
  })

  test('renders its children but they are not visible', () => {
    const el = component.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('after chicking its children must be shown', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('togglead content can be closed', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('testDivContent')

    const cancelButton = component.getByText(i18n.TOGLEABLE.CANCEL_BUTTON)
    fireEvent.click(cancelButton)

    expect(el.parentNode).toHaveStyle('display: none')
  })
})

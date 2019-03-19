import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { Button } from 'reactstrap'
import './LoaderButton.css'

export default ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}>
    {isLoading && <Glyphicon glyph='refresh' className='spinning' />}
    {!isLoading ? text : loadingText}
  </Button>

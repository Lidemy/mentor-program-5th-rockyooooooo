import PropTypes from 'prop-types'
import { InputGroup, FormLabel, Span, Input, ErrorMessage } from "../utils"

export default function InputRadio ({ input, content, onChange, onBlur }) {
  const { id, type, label, options } = input
    return (
      <InputGroup key={id}>
        <FormLabel>
          {label}
          <Span> *</Span>
        </FormLabel>
        {options.map((option) => {
          const { id, name, value, label } = option
          return (
            <div key={id}>
              <Input type={type} name={name} id={id} value={value} onChange={onChange} onBlur={onBlur} checked={content.value === value} />
              <label htmlFor={id}>{label}</label>
            </div>
          )
        })}
        {!content.isValid && <ErrorMessage>{content.message}</ErrorMessage>}
      </InputGroup>
    )
}

InputRadio.propTypes = {
  input: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    options:PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
  }),
  content: PropTypes.shape({
    value: PropTypes.string,
    isValid: PropTypes.bool,
    message: PropTypes.string
  }),
  onChange: PropTypes.func,
  onBlur: PropTypes.func
}

import React from "react"
import styled from "styled-components"
import { MONTH, YEAR, CURRENT } from "../../finance-extrapolator/constants"

export const numberWithSpace = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

const Input = ({
  wide,
  color,
  label,
  labelType,
  setLabelType,
  symbol,
  value,
  setValue,
}) => {
  return (
    <Wrapper
      notStarted={!value && value === 0 && setValue}
      noValue={!value && value !== 0 && setValue}
    >
      <LabelWrapper>
        <Label>{label}</Label>
        {labelType !== CURRENT && (
          <LabelType
            onClick={() => setLabelType(labelType === MONTH ? YEAR : MONTH)}
          >
            {labelType}
          </LabelType>
        )}
      </LabelWrapper>
      <InnerWrapper noInput={!setValue}>
        <InputWrapper>
          <InputEl
            id={`input-${label}`}
            type="number"
            value={value}
            onChange={e =>
              setValue(
                labelType === YEAR || labelType === CURRENT
                  ? parseFloat(e.target.value)
                  : parseFloat(e.target.value) * 12
              )
            }
            disabled={!setValue}
            wide={wide}
          />
        </InputWrapper>
        <DisplayValue
          onClick={() => document.getElementById(`input-${label}`).focus()}
          color={color}
        >
          {numberWithSpace(value)} {symbol}
        </DisplayValue>
      </InnerWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2e2e2e;
  padding: 0.1rem 0.5rem 0.5rem;
  margin: 0.2rem 0.2rem 0.2rem 0;
  ${p =>
    p.notStarted &&
    `
    border: 1px dashed orange;
  `}
  ${p => p.noValue && `border: 1px dashed red;`}
`

const Label = styled.label`
  color: #666;
  font-weight: 800;
`

const LabelType = styled.span`
  color: orange;
  font-weight: 800;
  opacity: 0.4;
  cursor: pointer;
  user-select: none;
  :hover {
    opacity: 1;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const InnerWrapper = styled.div`
  position: relative;
`

const InputWrapper = styled.div`
  display: flex;
  cursor: ${p => (p.noInput ? "not-allowed" : "inherit")};
`

const InputEl = styled.input`
  width: 100%;
  border: none;
  padding: 0.5rem;
  outline: none;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 800;
  caret-color: #aaa;
  ::selection {
    color: #444444;
    background: #999999; /* WebKit/Blink Browsers */
  }
`

const DisplayValue = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 0.2rem;
  padding: 0.5rem;
  color: ${p => p.color};
  font-weight: 800;
`

export default Input

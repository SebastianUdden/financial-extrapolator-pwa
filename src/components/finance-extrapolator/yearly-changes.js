import React, { useState } from "react"
import {
  Li,
  Ul,
  ValueSum,
  CategoryWrapper,
  FlexWrapper,
  ToggleButton,
} from "../common/styled"
import Input, { numberWithSpace } from "../common/input/Input"
import { GREY, GREEN, RED, CURRENT } from "./constants"

const YearlyChanges = ({
  value,
  growth,
  isPositive,
  isWithdrawal,
  dividendOrWithdrawal,
  changeLabel,
}) => {
  const [years, setYears] = useState(10)
  const yearlyChanges = []
  let newValue = value
  for (let i = 0; i < years; i++) {
    yearlyChanges.push(
      <Li>
        <ValueSum color={GREY}>År {i + 1}</ValueSum>
        <ValueSum color={GREY}>
          {numberWithSpace(Math.round(newValue))} kr
        </ValueSum>
        {dividendOrWithdrawal ? (
          <ValueSum color={isPositive ? GREEN : RED}>
            {numberWithSpace(
              Math.round(newValue * (dividendOrWithdrawal / 100))
            )}{" "}
            kr
          </ValueSum>
        ) : (
          <></>
        )}
      </Li>
    )
    if (growth) {
      newValue = isPositive
        ? newValue * (1 + growth / 100)
        : newValue * (1 - growth / 100)
    }
    if (isWithdrawal) {
      newValue = newValue * (1 - dividendOrWithdrawal / 100)
    }
  }
  return (
    <CategoryWrapper>
      <FlexWrapper>
        <Input
          wide
          color={GREY}
          label="År"
          labelType={CURRENT}
          symbol={"år"}
          value={years}
          setValue={setYears}
        />
        <ToggleButton wide onClick={() => setYears(years + 1)}>
          +
        </ToggleButton>
        <ToggleButton wide onClick={() => setYears(years - 1)}>
          -
        </ToggleButton>
      </FlexWrapper>
      {yearlyChanges && (
        <>
          <FlexWrapper>
            <ValueSum color={GREY}>Antal</ValueSum>
            <ValueSum color={GREY}>Kapital</ValueSum>
            <ValueSum color={GREY}>{changeLabel}</ValueSum>
          </FlexWrapper>
          <Ul>{yearlyChanges}</Ul>
        </>
      )}
    </CategoryWrapper>
  )
}

export default YearlyChanges

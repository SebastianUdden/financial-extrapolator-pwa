import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Input, { numberWithSpace } from "../common/input/Input"
import {
  CURRENT,
  YEAR,
  GREY,
  GREEN,
  RED,
  SEK,
  PERCENTAGE,
  MONTH,
} from "./constants"

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

const FinanceExtrapolator = () => {
  const [showAssets, setShowAssets] = useState(true)
  const [showDebts, setShowDebts] = useState(true)
  const [showRealEstate, setShowRealEstate] = useState(true)
  const [showCars, setShowCars] = useState(true)
  const [showOther, setShowOther] = useState(true)
  const [showFinancialInstruments, setShowFinancialInstruments] = useState(true)
  const [showWork, setShowWork] = useState(true)
  const [showPension, setShowPension] = useState(true)
  const [showRealEstateIncome, setShowRealEstateIncome] = useState(true)
  const [showCosts, setShowCosts] = useState(true)
  const [showIncome, setShowIncome] = useState(true)
  const [showSum, setShowSum] = useState(true)

  //// Economy
  // Assets
  const [showStocksFuture, setShowStocksFuture] = useState(false)
  const [eaStocks, setEaStocks] = useState(0)
  const [eaStocksType, setEaStocksType] = useState(CURRENT)
  const [eaStocksGrowth, setEaStocksGrowth] = useState(0)
  const [eaStocksGrowthType, setEaStocksGrowthType] = useState(CURRENT)
  const [eaStocksDividend, setEaStocksDividend] = useState(0)
  const [eaStocksDividendType, setEaStocksDividendType] = useState(CURRENT)

  const [showFundsFuture, setShowFundsFuture] = useState(false)
  const [eaFunds, setEaFunds] = useState(0)
  const [eaFundsType, setEaFundsType] = useState(CURRENT)
  const [eaFundsGrowth, setEaFundsGrowth] = useState(0)
  const [eaFundsGrowthType, setEaFundsGrowthType] = useState(CURRENT)
  const [eaFundsWithdrawal, setEaFundsWithdrawal] = useState(0)
  const [eaFundsWithdrawalType, setEaFundsWithdrawalType] = useState(CURRENT)

  const [showAccountsFuture, setShowAccountsFuture] = useState(false)
  const [eaAccounts, setEaAccounts] = useState(0)
  const [eaAccountsType, setEaAccountsType] = useState(CURRENT)
  const [eaAccountsWithdrawal, setEaAccountsWithdrawal] = useState(0)
  const [eaAccountsWithdrawalType, setEaAccountsWithdrawalType] = useState(
    CURRENT
  )

  // Debts
  const [showMortgageFuture, setShowMortgageFuture] = useState(false)
  const [edMortgage, setEdMorgage] = useState(0)
  const [edMortgageType, setEdMortgageType] = useState(CURRENT)
  const [edMortgageInterest, setEdMorgageInterest] = useState(0)
  const [edMortgageInterestType, setEdMortgageInterestType] = useState(CURRENT)
  const [edMortgageAmortization, setEdMortgageAmortization] = useState(0)
  const [edMortgageAmortizationType, setEdMortgageAmortizationType] = useState(
    CURRENT
  )
  const [showCarLoanFuture, setShowCarLoanFuture] = useState(false)
  const [edCarLoan, setEdCarLoan] = useState(0)
  const [edCarLoanType, setEdCarLoanType] = useState(CURRENT)
  const [edCarLoanInterest, setEdCarLoanInterest] = useState(0)
  const [edCarLoanInterestType, setEdCarLoanInterestType] = useState(CURRENT)
  const [edCarLoanAmortization, setEdCarLoanAmortization] = useState(0)
  const [edCarLoanAmortizationType, setEdCarLoanAmortizationType] = useState(
    CURRENT
  )
  const [showOtherDebtsFuture, setShowOtherDebtsFuture] = useState(false)
  const [edOtherDebts, setEdOtherDebts] = useState(0)
  const [edOtherDebtsType, setEdOtherDebtsType] = useState(CURRENT)
  const [edOtherDebtsInterest, setEdOtherDebtsInterest] = useState(0)
  const [edOtherDebtsInterestType, setEdOtherDebtsInterestType] = useState(
    CURRENT
  )
  const [edOtherDebtsAmortization, setEdOtherDebtsAmortization] = useState(0)
  const [
    edOtherDebtsAmortizationType,
    setEdOtherDebtsAmortizationType,
  ] = useState(CURRENT)

  //// Costs
  // Real Estate
  const [recType, setRecType] = useState(YEAR)
  const [recMortgageInterestPayment, setRecMortgageInterestPayment] = useState(
    0
  )
  const [
    recMortgageInterestPaymentType,
    setRecMortgageInterestPaymentType,
  ] = useState(YEAR)
  const [recMortgagePayment, setRecMortgagePayment] = useState(0)
  const [recMortgagePaymentType, setRecMortgagePaymentType] = useState(YEAR)
  const [recRent, setRecRent] = useState(0)
  const [recRentType, setRecRentType] = useState(YEAR)
  const [recPrivateLoan, setRecPrivateLoan] = useState(0)
  const [recPrivateLoanType, setRecPrivateLoanType] = useState(YEAR)
  const [recInsurance, setRecInsurance] = useState(0)
  const [recInsuranceType, setRecInsuranceType] = useState(YEAR)
  const [recElectricity, setRecElectricity] = useState(0)
  const [recElectricityType, setRecElectricityType] = useState(YEAR)
  const [recWater, setRecWater] = useState(0)
  const [recWaterType, setRecWaterType] = useState(YEAR)
  const [recOther, setRecOther] = useState(0)
  const [recOtherType, setRecOtherType] = useState(YEAR)

  // Car
  const [ccType, setCcType] = useState(YEAR)
  const [ccCarLoanInterestPayment, setCcCarLoanInterestPayment] = useState(0)
  const [
    ccCarLoanInterestPaymentType,
    setCcCarLoanInterestPaymentType,
  ] = useState(YEAR)
  const [ccCarLoanPayment, setCcCarLoanPayment] = useState(0)
  const [ccCarLoanPaymentType, setCcCarLoanPaymentType] = useState(YEAR)
  const [ccInsurance, setCcInsurance] = useState(0)
  const [ccInsuranceType, setCcInsuranceType] = useState(YEAR)
  const [ccGas, setCcGas] = useState(0)
  const [ccGasType, setCcGasType] = useState(YEAR)
  const [ccService, setCcService] = useState(0)
  const [ccServiceType, setCcServiceType] = useState(YEAR)

  // Other
  const [ocType, setOcType] = useState(YEAR)
  const [
    ocOtherDebtsInterestPayment,
    setOcOtherDebtsInterestPayment,
  ] = useState(0)
  const [
    ocOtherDebtsInterestPaymentType,
    setOcOtherDebtsInterestPaymentType,
  ] = useState(YEAR)
  const [ocOtherDebtsPayment, setOcOtherDebtsPayment] = useState(0)
  const [ocOtherDebtsPaymentType, setOcOtherDebtsPaymentType] = useState(YEAR)
  const [ocBlanco, setOcBlanco] = useState(0)
  const [ocBlancoType, setOcBlancoType] = useState(YEAR)
  const [ocCredit, setOcCredit] = useState(0)
  const [ocCreditType, setOcCreditType] = useState(YEAR)
  const [ocLiving] = useState(0)

  //// Income
  // Work
  const [wiType, setWiType] = useState(YEAR)
  const [wiSalary, setWiSalary] = useState(0)
  const [wiSalaryType, setWiSalaryType] = useState(YEAR)
  const [wiBonus, setWiBonus] = useState(0)
  const [wiBonusType, setWiBonusType] = useState(YEAR)

  // Pension
  const [piType, setPiType] = useState(YEAR)
  const [piState, setPiState] = useState(0)
  const [piStateType, setPiStateType] = useState(YEAR)
  const [piPrivate, setPiPrivate] = useState(0)
  const [piPrivateType, setPiPrivateType] = useState(YEAR)

  // Real Estate
  const [reiType, setReiType] = useState(YEAR)
  const [reiRent, setReiRent] = useState(0)
  const [reiRentType, setReiRentType] = useState(YEAR)

  // Other
  const [oiType, setOiType] = useState(YEAR)
  const [oiStocksDividendIncome, setOiStocksDividendIncome] = useState(0)
  const [oiStocksDividendIncomeType, setOiStocksDividendIncomeType] = useState(
    YEAR
  )
  const [oiFundsWithdrawalIncome, setOiFundsWithdrawalIncome] = useState(0)
  const [
    oiFundsWithdrawalIncomeType,
    setOiFundsWithdrawalIncomeType,
  ] = useState(YEAR)
  const [oiAccountsWithdrawalIncome, setOiAccountsWithdrawalIncome] = useState(
    0
  )
  const [
    oiAccountsWithdrawalIncomeType,
    setOiAccountsWithdrawalIncomeType,
  ] = useState(YEAR)
  const [oiInterest, setOiInterest] = useState(0)
  const [oiInterestType, setOiInterestType] = useState(YEAR)

  //// Sum
  const [costs, setCosts] = useState(0)
  const [income, setIncome] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setCosts(
      Math.round(
        recRent +
          recMortgageInterestPayment +
          recMortgagePayment +
          recPrivateLoan +
          recInsurance +
          recElectricity +
          recWater +
          recOther +
          ccCarLoanInterestPayment +
          ccCarLoanPayment +
          ccInsurance +
          ccGas +
          ccService +
          ocOtherDebtsInterestPayment +
          ocOtherDebtsPayment +
          ocBlanco +
          ocCredit +
          ocLiving
      )
    )
  }, [
    recRent,
    recMortgageInterestPayment,
    recMortgagePayment,
    recPrivateLoan,
    recInsurance,
    recElectricity,
    recWater,
    recOther,
    ccCarLoanInterestPayment,
    ccCarLoanPayment,
    ccInsurance,
    ccGas,
    ccService,
    ocOtherDebtsInterestPayment,
    ocOtherDebtsPayment,
    ocBlanco,
    ocCredit,
    ocLiving,
  ])

  useEffect(() => {
    setIncome(
      Math.round(
        wiSalary +
          wiBonus +
          piState +
          piPrivate +
          reiRent +
          oiInterest +
          oiStocksDividendIncome
      )
    )
  }, [
    wiSalary,
    wiBonus,
    piState,
    piPrivate,
    reiRent,
    oiInterest,
    oiStocksDividendIncome,
  ])

  useEffect(() => {
    setTotal(income - costs)
  }, [costs, income])

  useEffect(() => {
    setRecMortgageInterestPayment(edMortgage * (edMortgageInterest / 100))
  }, [edMortgage, edMortgageInterest])

  useEffect(() => {
    setCcCarLoanInterestPayment(edCarLoan * (edCarLoanInterest / 100))
  }, [edCarLoan, edCarLoanInterest])

  useEffect(() => {
    setOcOtherDebtsInterestPayment(edOtherDebts * (edOtherDebtsInterest / 100))
  }, [edOtherDebts, edOtherDebtsInterest])

  useEffect(() => {
    setRecMortgagePayment(edMortgage * (edMortgageAmortization / 100))
  }, [edMortgage, edMortgageAmortization])

  useEffect(() => {
    setCcCarLoanPayment(edCarLoan * (edCarLoanAmortization / 100))
  }, [edCarLoan, edCarLoanAmortization])

  useEffect(() => {
    setOcOtherDebtsPayment(edOtherDebts * (edOtherDebtsAmortization / 100))
  }, [edOtherDebts, edOtherDebtsAmortization])

  useEffect(() => {
    setOiStocksDividendIncome(eaStocks * (eaStocksDividend / 100))
  }, [eaStocks, eaStocksDividend])

  useEffect(() => {
    setOiFundsWithdrawalIncome(eaFunds * (eaFundsWithdrawal / 100))
  }, [eaFunds, eaFundsWithdrawal])

  useEffect(() => {
    setOiAccountsWithdrawalIncome(eaAccounts * (eaAccountsWithdrawal / 100))
  }, [eaAccounts, eaAccountsWithdrawal])

  useEffect(() => {
    setRecMortgageInterestPaymentType(recType)
    setRecMortgagePaymentType(recType)
    setRecRentType(recType)
    setRecPrivateLoanType(recType)
    setRecInsuranceType(recType)
    setRecElectricityType(recType)
    setRecWaterType(recType)
    setRecOtherType(recType)
  }, [recType])

  useEffect(() => {
    setCcCarLoanInterestPaymentType(ccType)
    setCcCarLoanPaymentType(ccType)
    setCcInsuranceType(ccType)
    setCcGasType(ccType)
    setCcServiceType(ccType)
  }, [ccType])

  useEffect(() => {
    setOcOtherDebtsInterestPaymentType(ocType)
    setOcOtherDebtsPaymentType(ocType)
    setOcBlancoType(ocType)
    setOcCreditType(ocType)
  }, [ocType])

  useEffect(() => {
    setWiSalaryType(wiType)
    setWiBonusType(wiType)
  }, [wiType])

  useEffect(() => {
    setPiStateType(piType)
    setPiPrivateType(piType)
  }, [piType])

  useEffect(() => {
    setReiRentType(reiType)
  }, [reiType])

  useEffect(() => {
    setOiInterestType(oiType)
    setOiStocksDividendIncomeType(oiType)
    setOiFundsWithdrawalIncomeType(oiType)
    setOiAccountsWithdrawalIncomeType(oiType)
  }, [oiType])

  return (
    <Wrapper>
      <Column>
        <Header>Min ekonomi</Header>
        <CategoryWrapper>
          <CategoryLabel onClick={() => setShowAssets(!showAssets)}>
            Tillgångar
          </CategoryLabel>
          {showAssets && (
            <>
              <FlexWrapper>
                <InputWrapper>
                  <Input
                    color={GREEN}
                    label="Aktier"
                    labelType={eaStocksType}
                    setLabelType={setEaStocksType}
                    symbol={SEK}
                    value={eaStocks}
                    setValue={setEaStocks}
                  />
                </InputWrapper>
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={GREEN}
                  label="Tillväxt"
                  labelType={eaStocksGrowthType}
                  setLabelType={setEaStocksGrowthType}
                  symbol={PERCENTAGE}
                  value={eaStocksGrowth}
                  setValue={setEaStocksGrowth}
                />
                <Input
                  color={GREEN}
                  label="Utdelning"
                  labelType={eaStocksDividendType}
                  setLabelType={setEaStocksDividendType}
                  symbol={PERCENTAGE}
                  value={eaStocksDividend}
                  setValue={setEaStocksDividend}
                />
                <ToggleButton
                  onClick={() => setShowStocksFuture(!showStocksFuture)}
                >
                  {showStocksFuture ? <>&uarr;</> : <>&darr;</>}
                </ToggleButton>
              </FlexWrapper>
              {showStocksFuture && (
                <YearlyChanges
                  value={eaStocks}
                  growth={eaStocksGrowth}
                  isPositive={true}
                  isWithdrawal={false}
                  dividendOrWithdrawal={eaStocksDividend}
                  changeLabel="Utdelning"
                />
              )}
              <FlexWrapper>
                <InputWrapper>
                  <Input
                    color={GREEN}
                    label="Fonder"
                    labelType={eaFundsType}
                    setLabelType={setEaFundsType}
                    symbol={SEK}
                    value={eaFunds}
                    setValue={setEaFunds}
                  />
                </InputWrapper>
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={GREEN}
                  label="Tillväxt"
                  labelType={eaFundsGrowthType}
                  setLabelType={setEaFundsGrowthType}
                  symbol={PERCENTAGE}
                  value={eaFundsGrowth}
                  setValue={setEaFundsGrowth}
                />
                <Input
                  color={GREEN}
                  label="Uttag"
                  labelType={eaFundsWithdrawalType}
                  setLabelType={setEaFundsWithdrawalType}
                  symbol={PERCENTAGE}
                  value={eaFundsWithdrawal}
                  setValue={setEaFundsWithdrawal}
                />
                <ToggleButton
                  onClick={() => setShowFundsFuture(!showFundsFuture)}
                >
                  {showFundsFuture ? <>&uarr;</> : <>&darr;</>}
                </ToggleButton>
              </FlexWrapper>
              {showFundsFuture && (
                <YearlyChanges
                  value={eaFunds}
                  growth={eaFundsGrowth}
                  isPositive={true}
                  isWithdrawal={true}
                  dividendOrWithdrawal={eaFundsWithdrawal}
                  changeLabel="Uttag"
                />
              )}
              <FlexWrapper>
                <Input
                  color={GREEN}
                  label="Konton"
                  labelType={eaAccountsType}
                  setLabelType={setEaAccountsType}
                  symbol={SEK}
                  value={eaAccounts}
                  setValue={setEaAccounts}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={GREEN}
                  label="Uttag"
                  labelType={eaAccountsWithdrawalType}
                  setLabelType={setEaAccountsWithdrawalType}
                  symbol={PERCENTAGE}
                  value={eaAccountsWithdrawal}
                  setValue={setEaAccountsWithdrawal}
                />
                <ToggleButton
                  onClick={() => setShowAccountsFuture(!showAccountsFuture)}
                >
                  {showAccountsFuture ? <>&uarr;</> : <>&darr;</>}
                </ToggleButton>
              </FlexWrapper>
              {showAccountsFuture && (
                <YearlyChanges
                  value={eaAccounts}
                  isPositive={true}
                  isWithdrawal={true}
                  dividendOrWithdrawal={eaAccountsWithdrawal}
                  changeLabel="Uttag"
                />
              )}
            </>
          )}
        </CategoryWrapper>
        <CategoryWrapper>
          <CategoryLabel onClick={() => setShowDebts(!showDebts)}>
            Skulder
          </CategoryLabel>
          {showDebts && (
            <>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Bostadslån"
                  labelType={edMortgageType}
                  setLabelType={setEdMortgageType}
                  symbol={SEK}
                  value={edMortgage}
                  setValue={setEdMorgage}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Ränta"
                  labelType={edMortgageInterestType}
                  setLabelType={setEdMortgageInterestType}
                  symbol={PERCENTAGE}
                  value={edMortgageInterest}
                  setValue={setEdMorgageInterest}
                />
                <Input
                  color={RED}
                  label="Amortering"
                  labelType={edMortgageAmortizationType}
                  setLabelType={setEdMortgageAmortizationType}
                  symbol={PERCENTAGE}
                  value={edMortgageAmortization}
                  setValue={setEdMortgageAmortization}
                />
                <ToggleButton
                  onClick={() => setShowMortgageFuture(!showMortgageFuture)}
                >
                  {showMortgageFuture ? <>&uarr;</> : <>&darr;</>}
                </ToggleButton>
              </FlexWrapper>
              {showMortgageFuture && (
                <YearlyChanges
                  value={edMortgage}
                  isPositive={false}
                  isWithdrawal={true}
                  dividendOrWithdrawal={edMortgageAmortization}
                  changeLabel="Amortering"
                />
              )}
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Billån"
                  labelType={edCarLoanType}
                  setLabelType={setEdCarLoanType}
                  symbol={SEK}
                  value={edCarLoan}
                  setValue={setEdCarLoan}
                  wide
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Ränta"
                  labelType={edCarLoanInterestType}
                  setLabelType={setEdCarLoanInterestType}
                  symbol={PERCENTAGE}
                  value={edCarLoanInterest}
                  setValue={setEdCarLoanInterest}
                />
                <Input
                  color={RED}
                  label="Amortering"
                  labelType={edCarLoanAmortizationType}
                  setLabelType={setEdCarLoanAmortizationType}
                  symbol={PERCENTAGE}
                  value={edCarLoanAmortization}
                  setValue={setEdCarLoanAmortization}
                />
                <ToggleButton
                  onClick={() => setShowCarLoanFuture(!showCarLoanFuture)}
                >
                  {showCarLoanFuture ? <>&uarr;</> : <>&darr;</>}
                </ToggleButton>
              </FlexWrapper>
              {showCarLoanFuture && (
                <YearlyChanges
                  value={edCarLoan}
                  isPositive={false}
                  isWithdrawal={true}
                  dividendOrWithdrawal={edCarLoanAmortization}
                  changeLabel="Amortering"
                />
              )}
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Övriga skulder"
                  labelType={edOtherDebtsType}
                  setLabelType={setEdOtherDebtsType}
                  symbol={SEK}
                  value={edOtherDebts}
                  setValue={setEdOtherDebts}
                  wide
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Ränta"
                  labelType={edOtherDebtsInterestType}
                  setLabelType={setEdOtherDebtsInterestType}
                  symbol={PERCENTAGE}
                  value={edOtherDebtsInterest}
                  setValue={setEdOtherDebtsInterest}
                />
                <Input
                  color={RED}
                  label="Amortering"
                  labelType={edOtherDebtsAmortizationType}
                  setLabelType={setEdOtherDebtsAmortizationType}
                  symbol={PERCENTAGE}
                  value={edOtherDebtsAmortization}
                  setValue={setEdOtherDebtsAmortization}
                />
                <ToggleButton
                  onClick={() => setShowOtherDebtsFuture(!showOtherDebtsFuture)}
                >
                  {showOtherDebtsFuture ? <>&uarr;</> : <>&darr;</>}
                </ToggleButton>
              </FlexWrapper>
              {showOtherDebtsFuture && (
                <YearlyChanges
                  value={edOtherDebts}
                  isPositive={false}
                  isWithdrawal={true}
                  dividendOrWithdrawal={edOtherDebtsAmortization}
                  changeLabel="Amortering"
                />
              )}
            </>
          )}
        </CategoryWrapper>
      </Column>
      <Column>
        <Header>Utgifter</Header>
        <CategoryWrapper>
          <FlexWrapper>
            <CategoryLabel onClick={() => setShowRealEstate(!showRealEstate)}>
              Fastigheter
            </CategoryLabel>
            <CategoryLabelType
              onClick={() => setRecType(recType === MONTH ? YEAR : MONTH)}
            >
              {recType === MONTH ? MONTH : YEAR}
            </CategoryLabelType>
          </FlexWrapper>
          {showRealEstate && (
            <>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Bostadslån ränta"
                  labelType={recMortgageInterestPaymentType}
                  setLabelType={setRecMortgageInterestPaymentType}
                  symbol={SEK}
                  value={Math.round(
                    recMortgageInterestPaymentType === YEAR
                      ? recMortgageInterestPayment
                      : recMortgageInterestPayment / 12
                  )}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Bostadslån amortering"
                  labelType={recMortgagePaymentType}
                  setLabelType={setRecMortgagePaymentType}
                  symbol={SEK}
                  value={Math.round(
                    recMortgagePaymentType === YEAR
                      ? recMortgagePayment
                      : recMortgagePayment / 12
                  )}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Hyra"
                  labelType={recRentType}
                  setLabelType={setRecRentType}
                  symbol={SEK}
                  value={
                    recRentType === YEAR ? recRent : Math.floor(recRent / 12)
                  }
                  setValue={setRecRent}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Privatlån"
                  labelType={recPrivateLoanType}
                  setLabelType={setRecPrivateLoanType}
                  symbol={SEK}
                  value={
                    recPrivateLoanType === YEAR
                      ? recPrivateLoan
                      : Math.floor(recPrivateLoan / 12)
                  }
                  setValue={setRecPrivateLoan}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Försäkring"
                  labelType={recInsuranceType}
                  setLabelType={setRecInsuranceType}
                  symbol={SEK}
                  value={
                    recInsuranceType === YEAR
                      ? recInsurance
                      : Math.floor(recInsurance / 12)
                  }
                  setValue={setRecInsurance}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="El"
                  labelType={recElectricityType}
                  setLabelType={setRecElectricityType}
                  symbol={SEK}
                  value={
                    recElectricityType === YEAR
                      ? recElectricity
                      : Math.floor(recElectricity / 12)
                  }
                  setValue={setRecElectricity}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Vatten"
                  labelType={recWaterType}
                  setLabelType={setRecWaterType}
                  symbol={SEK}
                  value={
                    recWaterType === YEAR ? recWater : Math.floor(recWater / 12)
                  }
                  setValue={setRecWater}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  color={RED}
                  label="Övrigt"
                  labelType={recOtherType}
                  setLabelType={setRecOtherType}
                  symbol={SEK}
                  value={
                    recOtherType === YEAR ? recOther : Math.floor(recOther / 12)
                  }
                  setValue={setRecOther}
                />
              </FlexWrapper>
            </>
          )}
        </CategoryWrapper>
        <CategoryWrapper>
          <FlexWrapper>
            <CategoryLabel onClick={() => setShowCars(!showCars)}>
              Bilar
            </CategoryLabel>
            <CategoryLabelType
              onClick={() => setCcType(ccType === MONTH ? YEAR : MONTH)}
            >
              {ccType === MONTH ? MONTH : YEAR}
            </CategoryLabelType>
          </FlexWrapper>
          {showCars && (
            <>
              <Input
                color={RED}
                label="Billån ränta"
                labelType={ccCarLoanInterestPaymentType}
                setLabelType={setCcCarLoanInterestPaymentType}
                symbol={SEK}
                value={Math.round(
                  ccCarLoanInterestPaymentType === YEAR
                    ? ccCarLoanInterestPayment
                    : ccCarLoanInterestPayment / 12
                )}
              />
              <Input
                color={RED}
                label="Billån amortering"
                labelType={ccCarLoanPaymentType}
                setLabelType={setCcCarLoanPaymentType}
                symbol={SEK}
                value={Math.round(
                  ccCarLoanPaymentType === YEAR
                    ? ccCarLoanPayment
                    : ccCarLoanPayment / 12
                )}
              />
              <Input
                color={RED}
                label="Försäkring"
                labelType={ccInsuranceType}
                setLabelType={setCcInsuranceType}
                symbol={SEK}
                value={
                  ccInsuranceType === YEAR
                    ? ccInsurance
                    : Math.floor(ccInsurance / 12)
                }
                setValue={setCcInsurance}
              />
              <Input
                color={RED}
                label="Bensin"
                labelType={ccGasType}
                setLabelType={setCcGasType}
                symbol={SEK}
                value={ccGasType === YEAR ? ccGas : Math.floor(ccGas / 12)}
                setValue={setCcGas}
              />
              <Input
                color={RED}
                label="Service"
                labelType={ccServiceType}
                setLabelType={setCcServiceType}
                symbol={SEK}
                value={
                  ccServiceType === YEAR
                    ? ccService
                    : Math.floor(ccService / 12)
                }
                setValue={setCcService}
              />
            </>
          )}
        </CategoryWrapper>
        <CategoryWrapper>
          <FlexWrapper>
            <CategoryLabel onClick={() => setShowOther(!showOther)}>
              Övriga
            </CategoryLabel>
            <CategoryLabelType
              onClick={() => setOcType(ocType === MONTH ? YEAR : MONTH)}
            >
              {ocType === MONTH ? MONTH : YEAR}
            </CategoryLabelType>
          </FlexWrapper>
          {showOther && (
            <>
              <Input
                color={RED}
                label="Övriga skulder ränta"
                labelType={ocOtherDebtsInterestPaymentType}
                setLabelType={setOcOtherDebtsInterestPaymentType}
                symbol={SEK}
                value={Math.round(
                  ocOtherDebtsInterestPaymentType === YEAR
                    ? ocOtherDebtsInterestPayment
                    : ocOtherDebtsInterestPayment / 12
                )}
              />
              <Input
                color={RED}
                label="Övriga skulder amortering"
                labelType={ocOtherDebtsPaymentType}
                setLabelType={setOcOtherDebtsPaymentType}
                symbol={SEK}
                value={Math.round(
                  ocOtherDebtsPaymentType === YEAR
                    ? ocOtherDebtsPayment
                    : ocOtherDebtsPayment / 12
                )}
              />
              <Input
                color={RED}
                label="Blankolån"
                labelType={ocBlancoType}
                setLabelType={setOcBlancoType}
                symbol={SEK}
                value={
                  ocBlancoType === YEAR ? ocBlanco : Math.floor(ocBlanco / 12)
                }
                setValue={setOcBlanco}
              />
              <Input
                color={RED}
                label="Krediter"
                labelType={ocCreditType}
                setLabelType={setOcCreditType}
                symbol={SEK}
                value={
                  ocCreditType === YEAR ? ocCredit : Math.floor(ocCredit / 12)
                }
                setValue={setOcCredit}
              />
            </>
          )}
        </CategoryWrapper>
      </Column>
      <Column>
        <Header>Inkomster</Header>
        <CategoryWrapper>
          <FlexWrapper>
            <CategoryLabel
              onClick={() =>
                setShowFinancialInstruments(!showFinancialInstruments)
              }
            >
              Finansiella instrument
            </CategoryLabel>
            <CategoryLabelType
              onClick={() => setOiType(oiType === MONTH ? YEAR : MONTH)}
            >
              {oiType === MONTH ? MONTH : YEAR}
            </CategoryLabelType>
          </FlexWrapper>
          {showFinancialInstruments && (
            <>
              <Input
                color={GREEN}
                label="Aktieutdelning"
                labelType={oiStocksDividendIncomeType}
                setLabelType={setOiStocksDividendIncomeType}
                symbol={SEK}
                value={Math.round(
                  oiStocksDividendIncomeType === YEAR
                    ? oiStocksDividendIncome
                    : oiStocksDividendIncome / 12
                )}
              />
              <Input
                color={GREEN}
                label="Fonduttag"
                labelType={oiFundsWithdrawalIncomeType}
                setLabelType={setOiFundsWithdrawalIncomeType}
                symbol={SEK}
                value={Math.round(
                  oiFundsWithdrawalIncomeType === YEAR
                    ? oiFundsWithdrawalIncome
                    : oiFundsWithdrawalIncome / 12
                )}
              />
              <Input
                color={GREEN}
                label="Kontouttag"
                labelType={oiAccountsWithdrawalIncomeType}
                setLabelType={setOiAccountsWithdrawalIncomeType}
                symbol={SEK}
                value={Math.round(
                  oiAccountsWithdrawalIncomeType === YEAR
                    ? oiAccountsWithdrawalIncome
                    : oiAccountsWithdrawalIncome / 12
                )}
              />
              <Input
                color={GREEN}
                label="Ränta från utlåning"
                labelType={oiInterestType}
                setLabelType={setOiInterestType}
                symbol={SEK}
                value={
                  oiInterestType === YEAR
                    ? oiInterest
                    : Math.floor(oiInterest / 12)
                }
                setValue={setOiInterest}
              />
            </>
          )}
        </CategoryWrapper>
        <CategoryWrapper>
          <FlexWrapper>
            <CategoryLabel onClick={() => setShowWork(!showWork)}>
              Arbete
            </CategoryLabel>
            <CategoryLabelType
              onClick={() => setWiType(wiType === MONTH ? YEAR : MONTH)}
            >
              {wiType === MONTH ? MONTH : YEAR}
            </CategoryLabelType>
          </FlexWrapper>
          {showWork && (
            <>
              <Input
                color={GREEN}
                label="Lön"
                labelType={wiSalaryType}
                setLabelType={setWiSalaryType}
                symbol={SEK}
                value={
                  wiSalaryType === YEAR ? wiSalary : Math.floor(wiSalary / 12)
                }
                setValue={setWiSalary}
              />
              <Input
                color={GREEN}
                label="Bonus"
                labelType={wiBonusType}
                setLabelType={setWiBonusType}
                symbol={SEK}
                value={
                  wiBonusType === YEAR ? wiBonus : Math.floor(wiBonus / 12)
                }
                setValue={setWiBonus}
              />
            </>
          )}
        </CategoryWrapper>
        <CategoryWrapper>
          <FlexWrapper>
            <CategoryLabel onClick={() => setShowPension(!showPension)}>
              Pension
            </CategoryLabel>
            <CategoryLabelType
              onClick={() => setPiType(piType === MONTH ? YEAR : MONTH)}
            >
              {piType === MONTH ? MONTH : YEAR}
            </CategoryLabelType>
          </FlexWrapper>
          {showPension && (
            <>
              <Input
                color={GREEN}
                label="Statlig"
                labelType={piStateType}
                setLabelType={setPiStateType}
                symbol={SEK}
                value={
                  piStateType === YEAR ? piState : Math.floor(piState / 12)
                }
                setValue={setPiState}
              />
              <Input
                color={GREEN}
                label="Privat"
                labelType={piPrivateType}
                setLabelType={setPiPrivateType}
                symbol={SEK}
                value={
                  piPrivateType === YEAR
                    ? piPrivate
                    : Math.floor(piPrivate / 12)
                }
                setValue={setPiPrivate}
              />
            </>
          )}
        </CategoryWrapper>
        <CategoryWrapper>
          <FlexWrapper>
            <CategoryLabel
              onClick={() => setShowRealEstateIncome(!showRealEstateIncome)}
            >
              Fastigheter
            </CategoryLabel>
            <CategoryLabelType
              onClick={() => setReiType(reiType === MONTH ? YEAR : MONTH)}
            >
              {reiType === MONTH ? MONTH : YEAR}
            </CategoryLabelType>
          </FlexWrapper>
          {showRealEstateIncome && (
            <Input
              color={GREEN}
              label="Hyra"
              labelType={reiRentType}
              setLabelType={setReiRentType}
              symbol={SEK}
              value={reiRentType === YEAR ? reiRent : Math.floor(reiRent / 12)}
              setValue={setReiRent}
            />
          )}
        </CategoryWrapper>
      </Column>
      <Column>
        <Header>Sammanställning</Header>
        <CategoryWrapper>
          <CategoryLabel onClick={() => setShowCosts(!showCosts)}>
            Utgifter
          </CategoryLabel>
          {showCosts && (
            <>
              <FlexWrapper>
                <ValueSum color={GREY}>Månad</ValueSum>
                <ValueSum color={RED}>
                  {costs ? numberWithSpace(Math.round(costs / 12)) : 0} kr
                </ValueSum>
              </FlexWrapper>
              <FlexWrapper>
                <ValueSum color={GREY}>År</ValueSum>
                <ValueSum color={RED}>
                  {costs ? numberWithSpace(costs) : 0} kr
                </ValueSum>
              </FlexWrapper>
            </>
          )}
        </CategoryWrapper>
        <CategoryWrapper>
          <CategoryLabel onClick={() => setShowIncome(!showIncome)}>
            Inkomster
          </CategoryLabel>
          {showIncome && (
            <>
              <FlexWrapper>
                <ValueSum color={GREY}>Månad</ValueSum>
                <ValueSum color={GREEN}>
                  {income ? numberWithSpace(Math.round(income / 12)) : 0} kr
                </ValueSum>
              </FlexWrapper>
              <FlexWrapper>
                <ValueSum color={GREY}>År</ValueSum>
                <ValueSum color={GREEN}>
                  {income ? numberWithSpace(income) : 0} kr
                </ValueSum>
              </FlexWrapper>
            </>
          )}
        </CategoryWrapper>
        <CategoryWrapper>
          <CategoryLabel onClick={() => setShowSum(!showSum)}>
            Summa
          </CategoryLabel>
          {showSum && (
            <>
              {total ? (
                <>
                  <FlexWrapper>
                    <ValueSum color={GREY}>Månad</ValueSum>
                    <ValueSum color={total > 0 ? GREEN : RED}>
                      {total
                        ? numberWithSpace(Math.round(income / 12 - costs / 12))
                        : 0}{" "}
                      kr
                    </ValueSum>
                  </FlexWrapper>
                  <FlexWrapper>
                    <ValueSum color={GREY}>År</ValueSum>
                    <ValueSum color={total > 0 ? GREEN : RED}>
                      {total ? numberWithSpace(total) : 0} kr
                    </ValueSum>
                  </FlexWrapper>
                  <FlexWrapper>
                    <ValueSum color={GREY}>5 år</ValueSum>
                    <ValueSum color={total > 0 ? GREEN : RED}>
                      {numberWithSpace(total * 5)} kr
                    </ValueSum>
                  </FlexWrapper>
                  <FlexWrapper>
                    <ValueSum color={GREY}>10 år</ValueSum>
                    <ValueSum color={total > 0 ? GREEN : RED}>
                      {numberWithSpace(total * 10)} kr
                    </ValueSum>
                  </FlexWrapper>
                  <FlexWrapper>
                    <ValueSum color={GREY}>20 år</ValueSum>
                    <ValueSum color={total > 0 ? GREEN : RED}>
                      {numberWithSpace(total * 20)} kr
                    </ValueSum>
                  </FlexWrapper>
                  <FlexWrapper>
                    <ValueSum color={GREY}>30 år</ValueSum>
                    <ValueSum color={total > 0 ? GREEN : RED}>
                      {numberWithSpace(total * 30)} kr
                    </ValueSum>
                  </FlexWrapper>
                </>
              ) : (
                total !== 0 && (
                  <Error>&larr; Fyll i siffror i samtliga fält</Error>
                )
              )}
            </>
          )}
        </CategoryWrapper>
        {/* <CategoryWrapper>
          <CategoryLabel>Årlig tillväxt</CategoryLabel>
        </CategoryWrapper> */}
      </Column>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  margin: 0 auto;
`
const Column = styled.div`
  width: 100%;
  max-width: 600px;
`
const CategoryWrapper = styled.div`
  border: 1px dashed #444;
  padding: 1rem;
`
const CategoryLabel = styled.h2`
  opacity: 0.7;
  display: inline;
  padding: 0rem;
  margin: 0 0 0.8rem;
  cursor: pointer;
  user-select: none;
  :hover {
    color: orange;
  }
`

const CategoryLabelType = styled(CategoryLabel)`
  color: orange;
  cursor: pointer;
  user-select: none;
  :hover {
    opacity: 1;
  }
`

const Header = styled.h1`
  margin: 1rem 0;
  opacity: 0.9;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`

const ValueSum = styled.span`
  width: 100%;
  padding: 0;
  color: ${p => p.color};
  font-weight: 800;
`

const Error = styled.p`
  margin: 1rem;
  text-align: center;
  color: #aa1111;
  font-weight: 800;
`

const InputWrapper = styled.div`
  width: 100%;
`

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  font-weight: 800;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
`

const ToggleButton = styled.button`
  background-color: inherit;
  color: #666;
  border: 1px solid #666;
  margin: 0.2rem;
  padding: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  ${p =>
    p.wide &&
    `
    min-width: 2.3rem;
  `}
  :hover {
    background-color: #3b3b3b;
  }
`

export default FinanceExtrapolator

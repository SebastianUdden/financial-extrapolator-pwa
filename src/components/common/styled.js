import styled from "styled-components"

export const Ul = styled.ul`
  margin: 0;
  padding: 0;
`
export const Li = styled.li`
  font-weight: 800;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
`
export const ValueSum = styled.span`
  width: 100%;
  padding: 0;
  color: ${p => p.color};
  font-weight: 800;
`
export const CategoryWrapper = styled.div`
  border: 1px dashed #444;
  padding: 1rem;
`
export const CategoryLabel = styled.h2`
  opacity: 0.7;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0rem;
  margin: 0 0 0.8rem;
  cursor: pointer;
  user-select: none;
  :hover {
    color: orange;
  }
`
export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`
export const ToggleButton = styled.button`
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

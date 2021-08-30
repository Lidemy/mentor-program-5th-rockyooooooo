import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const PaginatorContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Pagination = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  width: 6rem;
  cursor: ${(props) => props.$active && "pointer;"};
  font-size: 1rem;
  color: inherit;
`

const ButtonContainer = styled.div`
  display: flex;
`

const Button = styled.button`
  background-color: ${(props) => props.$active ? "black" : "transparent"};
  color: ${(props) => props.$active ? "white" : "black"};
  cursor: ${(props) => !props.$active && "pointer"};
  border-radius: 50%;
  border: 1px solid transparent;
  width: 2.25rem;
  height: 2.25rem;
  margin: 0.25rem;

  &:hover {
    border-color: black;
  }
`

const Dots = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  width: 2.25rem;
  height: 2.25rem;
  margin: 0.25rem;
`

const Paginator = ({ page, setPage, lastPage }) => {
  const [pages, setPages] = useState([])

  useEffect(() => {
    setPages([])
    for(let i = 1; i <= lastPage; i++) {
      if (i - page > 2 && i !== lastPage && i + 1 !== lastPage) {
        setPages((prev) => [...prev, <Dots key={i}>...</Dots>])
        i = lastPage - 1
        continue
      }
      if (page - i > 3 && i !== 1) {
        setPages((prev) => [...prev, <Dots key={i}>...</Dots>])
        i = page - 3
        continue
      }

      setPages((prev) => {
        return [
          ...prev,
          i === page ?
          <Button key={i} $active={true}>{i}</Button> :
          <Button key={i} $active={false} onClick={() => setPage(i)}>{i}</Button>
        ]
      })
    }
  }, [page, setPage, lastPage])

  return (
    <PaginatorContainer>
      {
        page > 1 ?
        <Pagination $active={true} onClick={() => setPage((prev) => prev - 1)}>＜上一頁</Pagination> :
        <Pagination $active={false} />
      }
      <ButtonContainer>
        {[...pages]}
      </ButtonContainer>
      {
        page < lastPage ?
        <Pagination $active={true} onClick={() => setPage((prev) => prev + 1)}>下一頁＞</Pagination> :
        <Pagination $active={false} />
      }
    </PaginatorContainer>
  )
}

Paginator.propTypes = {
  page:PropTypes.number,
  setPage: PropTypes.func,
  lastPage: PropTypes.number
}

export default Paginator
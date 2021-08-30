import styled from 'styled-components'
import ReactLoading from 'react-loading';
import { blackDefault } from '../../constants';

const LoadingPageContainer = styled.div`
  position: absolute;
  top: 53px;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ReactLoadingContainer = styled.div`
  position: relative;
  top: -10%;
`

const LoadingPage = () => {
  return (
    <LoadingPageContainer>
      <ReactLoadingContainer>
        <ReactLoading type={'bubbles'} color={blackDefault} />
      </ReactLoadingContainer>
    </LoadingPageContainer>
  )
}

export default LoadingPage;

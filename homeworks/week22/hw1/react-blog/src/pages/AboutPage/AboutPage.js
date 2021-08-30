import styled from 'styled-components'

const Container = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const Title = styled.h2`
  font-size: 3rem;
`

const Description = styled.p`
  font-size: 1.1rem;
  color: #757575;
  text-align: center;
`

const AboutPage = () => {
  return (
    <Container>
      <Title>Large</Title>
      <Description>
        一個想假裝自己是 Medium
        <br />
        但其實是模仿 <a href="https://blog.huli.tw/" rel="noopener noreferrer" target="_blank">Huli's Blog</a> 的部落格
      </Description>
    </Container>
  )
}

export default AboutPage;

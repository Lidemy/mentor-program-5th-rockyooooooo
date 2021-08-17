import styled from 'styled-components'
import Form from './Form'
import { Span, Paragraph } from './utils'

const Main = styled.main`
  background: white;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  width: 645px;
  margin: 10vh auto;
  padding: 50px 40px 35px;
  border-top: 8px solid #fad312;
`

const Title = styled.h1`
  font-size: 36px;
`

const Info = styled.div`
  margin: 20px 0;
`

const Footer = styled.footer`
  background: #000;
  color: #999;
  font-size: 13px;
  text-align: center;

  & p {
    line-height: 60px;
  }
`

export default function App() {
  return (
    <>
      <Main>
        <Title>
          新拖延運動報名表單
        </Title>
        <Info>
          <Paragraph>活動日期：2020/12/10 ~ 2020/12/11</Paragraph>
          <Paragraph>活動地點：台北市大安區新生南路二段1號</Paragraph>
        </Info>
        <Span>*必填</Span>
        <Form />
      </Main>
      <Footer>
        <Paragraph>
          © 2020 © Copyright. All rights Reserved.
        </Paragraph>
      </Footer>
    </>
  )
}

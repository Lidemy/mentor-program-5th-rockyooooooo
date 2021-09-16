import { useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { Form, Button, Input } from "../../components/utils/Form"
import { grayLine } from "../../constants"
import { newPost } from "../../WebAPI"

const PostForm = styled(Form)`
  gap: 1rem;
  width: 50rem;

  @media screen and (max-width: 1024px) {
    & {
      width: 100%;
    }
  }
`

const TextArea = styled.textarea`
  resize: none;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  height: 25rem;
  border-color: ${grayLine};
  outline: none;
  transition: border-color 300ms ease;

  &:focus {
    border: 1px solid black;
  }
`

const NewPostPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
    const history = useHistory()

  const handleInputChange = (e) => {
    setTitle(e.target.value)
  }

  const handleTextareaChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    await newPost(title, content)
    history.push('/')
  }

  return (
    <PostForm onSubmit={handleSubmit}>
      <label htmlFor="title">文章標題：</label>
      <Input type="text" id="title" name="content" value={title} onChange={handleInputChange} />
      <label htmlFor="content">文章內容：</label>
      <TextArea id="content" name="content" value={content} onChange={handleTextareaChange} />
      <Button >送出文章</Button>
    </PostForm>
  )
}

export default NewPostPage
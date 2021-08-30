import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

const PostContainer = styled.div`
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  border-left: 3px solid transparent;

  &:hover {
    border-left-color: black;
  }

  @media screen and (max-width: 1024px) {
    & {
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
    }
  }
`

const PostTitle = styled(Link)`
  color: #333;
  border-bottom: 1px dotted transparent;
  line-height: 1.125;

  &:hover {
    border-bottom-color: darkgray;
  }
`

const PostDate = styled.time`
  flex-shrink: 0;
  color: #757575;
  font-size: 0.9rem;
  font-family: monospace;
`

const Post = ({ post }) => {
  const { title, createdAt } = post

  return (
    <PostContainer>
      <PostDate>{moment(createdAt).format("MM月DD日")}</PostDate>
      <PostTitle to={`/posts/${post.id}`}>{title}</PostTitle>
    </PostContainer>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.number,
    userId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    id: PropTypes.number
  })
}

export default Post
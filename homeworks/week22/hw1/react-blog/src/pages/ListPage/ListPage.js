import { useEffect, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactLoading from 'react-loading';
import Post from '../../components/utils/Post'
import { getListPosts, getPosts } from '../../WebAPI'
import Paginator from './Paginator'
import { blackDefault } from '../../constants'

const ListPageContainer = styled.div``

const PostsContainer = styled.div`
  padding: 0 0 3rem;
  min-height: 14.5625rem;
`

const LoadingPageContainer = styled.div`
  height: 11.5625rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ListPage = ({ setIsLoading }) => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)
  const [isPaginationLoading, setPaginationIsLoading] = useState(false)

  useLayoutEffect(() => {
    setIsLoading(true)
    getPosts().then((posts) => {
      setLastPage(Math.ceil(posts.length / 5))
    })
  }, [setIsLoading])

  useEffect(() => {
    setPaginationIsLoading(true)
    getListPosts(page).then((posts) => {
      setPosts(posts)
      setIsLoading(false)
      setPaginationIsLoading(false)
    })
  }, [page, setIsLoading])

  return (
    <ListPageContainer>
      <PostsContainer>
        {
          isPaginationLoading ?
          !!posts.length && !!lastPage && <LoadingPageContainer>
            <ReactLoading type={'bubbles'} color={blackDefault} />
          </LoadingPageContainer> :
          posts.map((post) => <Post key={post.id} post={post} />)
        }
      </PostsContainer>
      {/* 只用 post.length 跟 lastPage 的話會在畫面顯示 0 */}
      {!!posts.length && !!lastPage && <Paginator page={page} setPage={setPage} lastPage={lastPage} />}
    </ListPageContainer>
  )
}

ListPage.propTypes = {
  setIsLoading: PropTypes.func
}

export default ListPage;

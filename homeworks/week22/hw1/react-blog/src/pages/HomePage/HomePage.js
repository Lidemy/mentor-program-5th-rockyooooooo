import { useEffect, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Post from '../../components/utils/Post'
import { getPosts } from '../../WebAPI'
import { grayLine } from '../../constants'

const HomePageContainer = styled.div`
  @media screen and (max-width: 1024px) {
    & {
      width: 100%;
    }
  }
`

const YearContainer = styled.div`
  margin-bottom: 3rem;
`

const Year = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.125;
`

const PostContainer = styled.div`
  border-left: 1px solid ${grayLine}
`

const HomePage = ({ setIsLoading }) => {
  const [posts, setPosts] = useState([])
  const [years, setYears] = useState([])

  useLayoutEffect(() => {
    setIsLoading(true)
    getPosts().then((posts) => {
      setPosts(posts)
      setIsLoading(false)
    })
  }, [setIsLoading])

  useEffect(() => {
    const yearsArray = []
    for(const post of posts) {
      yearsArray.push(new Date(post.createdAt).getFullYear())
    }
    setYears([...new Set(yearsArray)])
  }, [posts])

  return (
    <HomePageContainer>
      {years.map((year) => {
        return (
          <YearContainer key={year}>
            <Year>{year}</Year>
            <PostContainer>
              {
                posts
                  .filter((post) => new Date(post.createdAt).getFullYear() === year)
                  .map((post) => <Post key={post.id} post={post} />)
              }
            </PostContainer>
          </YearContainer>
        )
      })}
    </HomePageContainer>
  )
}

HomePage.propTypes = {
  setIsLoading: PropTypes.func
}

export default HomePage;

import { getAuthToken } from "./utils"
const BASE_URL = 'https://student-json-api.lidemy.me'
const POST_LIMIT = 5
const POST_SORT = 'createdAt'
const POST_ORDER = 'desc'

export const getPosts = async() => {
  const response = await fetch(`${BASE_URL}/posts?_sort=${POST_SORT}&_order=${POST_ORDER}`)
  const data = await response.json()
  return data
}

export const getListPosts = async(page) => {
  const response = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${POST_LIMIT}&_sort=${POST_SORT}&_order=${POST_ORDER}`)
  const data = await response.json()
  return data
}

export const getPost = async(id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`)
  const data = await response.json()
  return data
}

export const getUser = async(userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`)
  const data = await response.json()
  return data
}

export const register = async(userData) => {
  const { username, password, nickname } = userData
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      nickname,
      username,
      password
    })
  })
  const data = await response.json()
  return data
}

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  const data = await response.json()
  return data
}

export const getMe = async () => {
  const token = getAuthToken()
  try {
    const response = await fetch(`${BASE_URL}/me`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) throw new Error('Network response was not ok in getMe.')
    const data = await response.json()
    return data
  } catch (error) {
    return {
      ok: 0,
      data: error
    }
  }
}

export const newPost = async (title, body) => {
  const token = getAuthToken()
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        body
      })
    })
    if (!response.ok) throw new Error('Network response was not ok in newPost.')
    const data = await response.json()
    return data
  } catch (error) {
    return {
      ok: 0,
      data: error
    }
  }
}

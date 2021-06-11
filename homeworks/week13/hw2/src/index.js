/* eslint-disable */

import { getComments, addComment } from './api'
import { appendCommentToDOM } from './utils'
import { commentsTemplate } from './templates'

export function init(options) {
  const { siteKey, apiUrl, containerSelector } = options

  $(containerSelector).append(commentsTemplate)

  const commentsDOM = $('.comments')
  const limit = 5
  let offset = 0
  let numberOfComments = 0

  // get comments from database
  getComments(apiUrl, siteKey, limit, offset, (data) => {
    const { discussions, count } = data
    numberOfComments = count
    for (const comment of discussions) appendCommentToDOM(commentsDOM, comment)

    // check offset and total amount of comments to hide the more comments button
    if (offset >= numberOfComments - limit) {
      $('.more-comments-btn').hide()
    }
  })

  $('.add-comment-form').submit((e) => {
    e.preventDefault()

    const newCommentData = {
      site_key: siteKey,
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val()
    }

    // insert new comment to database
    addComment(apiUrl, newCommentData, () => {
      // append new comment to page
      appendCommentToDOM(commentsDOM, newCommentData, true)
    })

    // empty the input fields
    $('input[name=nickname]').val('')
    $('textarea[name=content]').val('')

    // increase offset and numberOfComments
    offset++
    numberOfComments++
  })

  $('.more-comments-btn').click((e) => {
    offset += limit
    // check offset and total amount of comments to hide the more comments button
    if (offset >= numberOfComments - limit) {
      $(e.target).hide()
    }

    // get more comments from database
    getComments(apiUrl, siteKey, limit, offset, (data) => {
      const { discussions } = data
      for (const comment of discussions) appendCommentToDOM(commentsDOM, comment)
    })
  })
}

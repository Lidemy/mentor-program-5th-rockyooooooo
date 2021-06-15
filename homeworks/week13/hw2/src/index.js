/* eslint-disable */

import { getComments, addComment } from './api'
import { appendCommentToDOM } from './utils'
import { getCommentsTemplate, createClassnamesAndIDs } from './templates'

export function init(options) {
  const { siteKey, apiUrl, containerSelector } = options

  const {
    addCommentFormClassname,
    commentsClassname,
    moreCommentsBtnClassname,
    floatingInputID,
    floatingTextareaID
  } = createClassnamesAndIDs(siteKey)

  const addCommentFormSelector = `.${addCommentFormClassname}`
  const commentsSelector = `.${commentsClassname}`
  const moreCommentsBtnSelector = `.${moreCommentsBtnClassname}`

  const commentsTemplate = getCommentsTemplate(siteKey)
  $(containerSelector).append(commentsTemplate)

  const commentsDOM = $(commentsSelector)
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
      $(moreCommentsBtnSelector).hide()
    }
  })

  $(addCommentFormSelector).submit((e) => {
    e.preventDefault()

    const nicknameSelector = `${addCommentFormSelector} input[name=nickname]`
    const contentSelector = `${addCommentFormSelector} textarea[name=content]`
    const newCommentData = {
      site_key: siteKey,
      nickname: $(nicknameSelector).val(),
      content: $(contentSelector).val()
    }

    // insert new comment to database
    addComment(apiUrl, newCommentData, () => {
      // append new comment to page
      appendCommentToDOM(commentsDOM, newCommentData, true)
    })

    // empty the input fields
    $(nicknameSelector).val('')
    $(contentSelector).val('')

    // increase offset and numberOfComments
    offset++
    numberOfComments++
  })

  $(moreCommentsBtnSelector).click((e) => {
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

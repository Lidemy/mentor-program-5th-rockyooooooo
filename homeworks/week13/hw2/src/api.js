/* eslint-disable */

export function getComments(apiUrl, siteKey, limit, offset, cb) {
  $.ajax({
    url: `${apiUrl}api_discussions.php?site_key=${siteKey}&limit=${limit}&offset=${offset}`
  }).done((data) => {
    if (!data.ok) return alert(data.message)
    cb(data)
  })
}

export function addComment(apiUrl, newCommentData, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}api_add_discussions.php`,
    data: newCommentData
  }).done((data) => {
    if (!data.ok) return alert(data.message)
    cb()
  })
}

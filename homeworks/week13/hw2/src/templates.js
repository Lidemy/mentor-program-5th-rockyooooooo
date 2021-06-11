export function getCommentsTemplate(prefix) {
  const {
    addCommentFormClassname,
    commentsClassname,
    moreCommentsBtnClassname,
    floatingInputID,
    floatingTextareaID
  } = createClassnamesAndIDs(prefix)

  return `
    <div>
      <form class="${addCommentFormClassname} mb-3 p-3 bg-light border rounded">
        <h1>留言板</h1>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="${floatingInputID}" placeholder="Put your nickname here" name="nickname">
          <label for="${floatingInputID}">暱稱</label>
        </div>
        <div class="form-floating mb-3">
          <textarea class="form-control" placeholder="Leave a comment here" id="${floatingTextareaID}" style="height: 100px" name="content"></textarea>
          <label for="${floatingTextareaID}">留言內容</label>
        </div>
        <button type="submit" class="btn btn-primary">送出</button>
      </form>
      <section class="${commentsClassname}"></section>
      <button class="${moreCommentsBtnClassname} btn btn-outline-primary">載入更多</button>
    </div>
  `
}

export function createClassnamesAndIDs(prefix) {
  return {
    addCommentFormClassname: `${prefix}-add-comment-form`,
    commentsClassname: `${prefix}-comments`,
    moreCommentsBtnClassname: `${prefix}-more-comments-btn`,
    floatingInputID: `${prefix}-floating-input`,
    floatingTextareaID: `${prefix}-floating-textarea`
  }
}

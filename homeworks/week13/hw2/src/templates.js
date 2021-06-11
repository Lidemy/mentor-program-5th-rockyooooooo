/* eslint-disable */

export const commentsTemplate = `
  <div>
    <form class="add-comment-form mb-3 p-3 bg-light border rounded">
      <h1>留言板</h1>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="Put your nickname here" name="nickname">
        <label for="floatingInput">暱稱</label>
      </div>
      <div class="form-floating mb-3">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height: 100px" name="content"></textarea>
        <label for="floatingTextarea">留言內容</label>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    <section class="comments"></section>
    <button class="more-comments-btn btn btn-outline-primary">載入更多</button>
  </div>
`

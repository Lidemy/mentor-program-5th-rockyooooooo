export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function appendCommentToDOM(container, comment, isPrepend) {
  const commentHtml = `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${escapeHtml(comment.nickname)}</h5>
        <p class="card-text">${escapeHtml(comment.content)}</p>
      </div>
    </div>
  `
  isPrepend ? container.prepend(commentHtml) : container.append(commentHtml)
}

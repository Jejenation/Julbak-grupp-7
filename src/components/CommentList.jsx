import { useState } from "react";
import "./CommentList.css";
import

function CommentList({ comments }) {
  const [showAll, setShowAll] = useState(false);

  const displayComments = showAll ? comments : comments.slice(0, 3);
  return (
    <div className="comment-section-list">
      <h3>Kommentarer ({comments.length})</h3>
      {comments.length > 0 ? (
        <>
          {displayComments.map((comment) => (
            <li key={comment._id} className="comment-list">
              <p className="comment-desc-list">{comment.comment}</p>
              <div className="comment-name-list">
                <strong>{comment.name}</strong>
                <span className="comment-date-list">
                  {new Date(comment.createdAt).toLocaleDateString("sv-SE", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </span>
              </div>
            </li>
          ))}
          {comments.length > 3 && (
            <button
              className="show-more-button-list"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "visa färre... -" : "visa fler... +"}
            </button>
          )}
        </>
      ) : (
        <p className="no-comment-list">Inga Kommentarer än. </p>
      )}
    </div>
  );
}

export default CommentList;

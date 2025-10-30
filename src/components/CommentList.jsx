import { useState } from "react";
import "./CommentList.css";

function CommentList({ comments }) {
  const [showAll, setShowAll] = useState(false);

  const displayComments = showAll ? comments : comments.slice(0, 3);
  return (
    <div className="comment-section">
      <h3>Kommentarer ({comments.length})</h3>
      {comments.length > 0 ? (
        <>
          {displayComments.map((comment) => (
            <li key={comment._id} className="comment">
              <p className="comment-desc">{comment.comment}</p>
              <div className="comment-name">
                <strong>{comment.name}</strong>
                <span className="comment-date">
                  {new Date(comment.date || comment.createdAt).toLocaleDateString("sv-SE", {
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
              className="show-more-button"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "visa färre... -" : "visa fler... +"}
            </button>
          )}
        </>
      ) : (
        <p className="no-comment">Inga Kommentarer än. </p>
      )}
    </div>
  );
}

export default CommentList;

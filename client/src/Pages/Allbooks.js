import React from "react";
import "./Allbooks.css";
import axios from "axios";

const BookCard = (props) => {
  const image =
    props.image !== "" && props.image !== undefined
      ? props.image
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  return (
    <div className="book-card">
      <div className="image-container">
        <img src={image} alt="" />
      </div>
      <p className="bookcard-title">{props.title}</p>
      <p className="bookcard-author">By {props.author}</p>
      <div className="bookcard-category">
        <p>{props.category}</p>
      </div>
      <div className="bookcard-emptybox"></div>
    </div>
  );
};

function Allbooks() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [allBooks, setAllBooks] = React.useState([]);

  React.useEffect(() => {
    axios.get(API_URL + "api/books/allbooks").then((response) => {
      setAllBooks(response.data);
    });
  }, []);

  return (
    <div className="books-page">
      <div className="books">
        {allBooks.map((bookData) => (
          <BookCard
            title={bookData.bookName}
            author={bookData.author}
            category={bookData.categoryName}
            image={bookData.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Allbooks;

import { useState, useEffect } from "react";
import axios from "axios";
import CopyIcon from "./svg";

function TravelBlog() {
  const [content, setContent] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const getContent = async (keyword) => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${keyword}`
      );
      setContent(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value.trim());
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("🤩 copied 🤩");
  };
  const handleTagClick = (item) => {
    if (!searchInput.includes(item)) {
      const newInput = (searchInput + " " + item).trim();
      setSearchInput(newInput);
    } else {
      alert("You already choose this tag 🫣");
    }
  };
  useEffect(() => {
    getContent(searchInput);
  }, [searchInput]);
  return (
    <>
      <div className="header">
        <h1 className="page-title">เที่ยวไหนดี</h1>
        <div className="input-box">
          <p className="input-title">ค้นหาที่เที่ยว</p>
          <input
            className="input-area"
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน . . ."
            value={searchInput}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <ul className="content-list">
        {content.map((item) => {
          return (
            <>
              <div className="content-container" key={item.eid}>
                <div className="image">
                  <img src={item.photos[0]} alt={item.title} />
                </div>
                <div className="content">
                  <h2
                    className="content-title"
                    onClick={() => {
                      window.open(item.url, "_blank");
                    }}
                  >
                    {item.title}
                  </h2>
                  <div className="content description"></div>
                  <span>{item.description.slice(0, 100)} </span>
                  <span className="dot">... </span>
                  <a
                    className="read-more"
                    onClick={() => {
                      window.open(item.url, "_blank");
                    }}
                  >
                    อ่านต่อ
                  </a>
                  <div className="content-tag">
                    <p>หมวด</p>
                    <ul>
                      {item.tags.map((tag, index, arr) => {
                        if (index === arr.length - 1) {
                          return (
                            <>
                              <span> และ </span>
                              <span
                                className="tag"
                                //onClick={() => setSearchInput(tag)}
                                onClick={() => {
                                  handleTagClick(tag);
                                }}
                              >
                                {tag}
                              </span>
                              <span> </span>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <span
                                className="tag"
                                onClick={() => {
                                  handleTagClick(tag);
                                }}
                              >
                                {tag}
                              </span>
                              <span> </span>
                            </>
                          );
                        }
                      })}
                    </ul>
                  </div>
                  <div>
                    <ul className="morePhoto">
                      {item.photos.map((item, index) => {
                        if (index > 0) {
                          return (
                            <img
                              className="smallPhoto"
                              src={item}
                              alt={index}
                            />
                          );
                        }
                      })}
                    </ul>
                  </div>
                  <div
                    className="copy-link"
                    onClick={() => handleCopyLink(item.url)}
                  >
                    <span>Copy to clipboard</span>
                    <CopyIcon />
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </ul>
    </>
  );
}
export default TravelBlog;

import "./add-card-input.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useWorkspace } from "../../context/workspace-context";
import { createCard } from "../../store/cards";

const AddCardInput = ({ props }) => {
  const {list, setItem, setCardsState, cardsState} = props;
  const dispatch = useDispatch();
  const { currentWorkspace } = useWorkspace();
  const focusRef = useRef(null);
  const [content, setContent] = useState("");
  const [add, setAdd] = useState(false);

  const showInput = () => {
    if (add) return;
    setAdd(true);
  };

  useEffect(() => {
    if (!add) return;

    const hideInput = () => {
      setAdd(false);
    };
    document.addEventListener("click", hideInput);
    return () => document.removeEventListener("click", hideInput);
  }, [add]);

  useEffect(() => {
    if (add) focusRef.current.focus();
  }, [add]);

  const handleClick = (e) => {
    e.stopPropagation();
    setAdd(true);
  };

  const handleSubmit = async (e) => {
    const payload = {
      list_id: list.id,
      workspace_id: currentWorkspace,
      name: content,
      index: list.cards.length + 1,
      created_at: new Date(),
    };

    let newCard;
    try {
      newCard = await dispatch(createCard(payload, list.id));
    } catch (error) {
      alert(error);
    }
    if (newCard) {
      setAdd(true);
      setContent("");
      setItem(newCard.id)
      setCardsState([...cardsState, newCard])
    }
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleSubmit()
    }
  }

  return (
    <>
      {!add && (
        <div className="list__add-card-container" onClick={showInput}>
          <span className="material-symbols-outlined">add</span>
          <div className="list__new-card">Add a card</div>
        </div>
      )}
      {add && (
        <div className="addcard__input-container">
          <textarea
            onClick={handleClick}
            className="addcard__input"
            placeholder="Enter a title for this card..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            ref={focusRef}
          />
          <div className="add-card__buttons">
            <button className="add-card__submit" onClick={handleSubmit}>
              Add Card
            </button>
            <button className="add-card__cancel" onClick={() => setAdd(false)}>
              <span className="material-symbols-outlined add-card__cancel-icon">
                close
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCardInput;

import React from 'react'

const TodoItem = (props) => {
    return (
        <div className={props.itemType} onClick={props.todoClickHandler}>
            {props.content}
            <button onClick={props.deleteBtnHandler} type="button" className="close" data-dismiss="alert" >&times;</button>
        </div>
    )
}

export default TodoItem

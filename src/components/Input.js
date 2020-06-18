import React from 'react'

const Input = (props) => {
    return (
        <div className="row" style={{marginBottom:"10px"}}>
                    <div className="col-sm-9">
                        <div className="form-group">
                            <input  onChange={props.onChangeHandler} onKeyPress={props.enterKeyPressHandler} type="text" value={props.value} maxLength="30" className="form-control" placeholder="Add a Todo"/>
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <div className="form-group">
                        <button onClick={props.addBtnHandler} type="button" className="btn btn-primary btn-block">Add</button>
                        </div>
                    </div>
                </div>
    )
}

export default Input

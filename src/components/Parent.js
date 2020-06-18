import React, { Component } from 'react'
import Header from './Header'
import Input from './Input'
import Button from './Button'
import TodoItem from './TodoItem'
import shortid from 'shortid'
class Parent extends Component {
    state=
    {
        todoText: '',
        todoList:[],
        filterTodo: 'all'
    }

    onChangeHandler =(event)=>
    {
       
        this.setState(
            {
            todoText: event.target.value
            }
        )
    }
    addBtnHandler = () =>
    {
        if(this.state.todoText.trim() !=='')
        {
            let text=this.state.todoText.trim();
            let todoListCopy=[{text:text,id:shortid.generate(),done:false},...this.state.todoList];

            this.setState(
                {
                todoList:todoListCopy,
                todoText:''
                }
            )
        }
    }

    enterKeyPressHandler =(event) =>
    {
        
        if(event.key==='Enter')
        {
            this.addBtnHandler();   
        }
    }

    deleteHandler = (e,id) =>
    {
        e.stopPropagation();
        const todoListCopy=this.state.todoList.filter((todo) => 
        {
            return(todo.id!==id)
        })
        this.setState({todoList:todoListCopy});
    }

    todoClickHandler = (id) =>
    {
        const todoListCopy=this.state.todoList.map((todo)=>
        {
            return(
                todo.id === id ? {text:todo.text,id:todo.id,done:!todo.done} : todo
            )
        })
        this.setState(
            {
                todoList:todoListCopy
            }
        )
    }

    allBtnHandler =() =>
    {
        this.setState({filterTodo: "all"})
    }
    pendingBtnHandler =() =>
    {
        this.setState({filterTodo: "pending"})
    }
    doneBtnHandler =() =>
    {
        this.setState({filterTodo: "done"})
    }

    componentDidMount() {
        const json = localStorage.getItem('todos');
        const todos = JSON.parse(json)
        this.setState(todos);
    }

    componentDidUpdate(prevProps, prevStates) {
        const json = JSON.stringify(this.state);
        localStorage.setItem('todos', json);
    }


    render() {

        const filteredTodos=this.state.todoList.filter((todo) => {
            if(this.state.filterTodo==="all")
            {
                return true;
            }
            else if(this.state.filterTodo==="done" && todo.done===true)
            {
                return true;
            }
            else if(this.state.filterTodo==="pending" && todo.done===false)
            {
                return true;
            }
            return false;
            })



        const todos=filteredTodos.map((todo)=>
        {
            return(
                <TodoItem key={todo.id} 
                todoClickHandler={this.todoClickHandler.bind(this,todo.id)} 
                itemType={todo.done === false? "alert alert-secondary alert-dismissible fade show" : "alert alert-success alert-dismissible fade show strike"} 
                content={todo.text} 
                deleteBtnHandler={(e)=>this.deleteHandler(e,todo.id)}/>
            )
        })
        return (
            <div>
                <Header/>
                <Input  value={this.state.todoText} 
                onChangeHandler={this.onChangeHandler.bind(this)} 
                addBtnHandler={this.addBtnHandler} 
                enterKeyPressHandler={this.enterKeyPressHandler.bind(this)}/>

                <div style={{ marginBottom: "20px" }}>
                {this.state.todoList.length > 0 && <Button btnClickHandler={this.allBtnHandler} btnType="btn btn-primary" name="All" count={this.state.todoList.length}/>}
                {this.state.todoList.filter(todo => todo.done).length >0 && <Button btnClickHandler={this.doneBtnHandler} btnType="btn btn-success" name="Done" count={this.state.todoList.filter(todo => todo.done).length}/>}
                {this.state.todoList.filter(todo => todo.done===false).length >0 && <Button btnClickHandler={this.pendingBtnHandler} btnType="btn btn-warning" name="Pending" count={this.state.todoList.filter(todo => todo.done===false).length}/>}
                
                
                </div>
                {todos}
                
            </div>

        )
    }
}

export default Parent


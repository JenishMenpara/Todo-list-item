import React, {useState,useEffect} from 'react';
import '../Todo/TodoCreate.css';
import Card from '../Card/Createcard'

export default function TodoCreate() {
    const [deleteffect, setdeleteffect] = useState(false);
    const deletee = ()=>{
            setdeleteffect(!deleteffect)
    }

    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open)
    }
    
    
    // set value for title and dec for writing in title and des box
    
    const [editId, seteditId] = useState(null);
    const [taskName, setTaskName] = useState("");
    const [des, setDes] = useState("");
    const [status, setStatus] = useState("");
    const handleChange = (e) => {
         const { name, value } = e.target
         if (name === "taskName") {
            setTaskName(value)
        } else if (name === "des") {
            setDes(value)
        } 
        else {
            setStatus(value)
        } 

    }
    
    const [taskList, setTaskList] = useState([]);
    
    const saveTask = () => { 
        taskList.push({
            "Id": Date.now(),
            "Name": taskName,
            "Des":des,
            "Status":status
        });
        localStorage.setItem("taskList", JSON.stringify(taskList));
        setOpen(false)
        
     };
     const edittask = ()=>{
        taskList.filter((j)=>j.Id === parseInt(editId)).map((l)=>{
           l.Name= taskName
           l.Des= des
           l.Status=status
        })
        seteditId(null)
        localStorage.setItem("taskList", JSON.stringify(taskList));
        setOpen(false)
     }
    useEffect(() => {
        let array = localStorage.getItem("taskList");    

        if (array) {
          let getobj = JSON.parse(array);
          setTaskList(getobj);
          //alert(array)
        }
        }, []);

        const todo = taskList.filter((todo)=>todo.Status === "ToDo")
        const inprogress = taskList.filter((inprogress)=>inprogress.Status === "Inprogress")
        const done = taskList.filter((done)=>done.Status === "Done")
        //console.log(taskList)


        //alert(taskList)
 
        



  return (
  
  <>
   <div className='c-task'>
                <h3 className='todotext'>Todo List</h3>
                <button
                    type='button' className='creat-btn' id='create-btn' onClick={toggle}>Create Task</button>
            </div>
            <div>


                {open && (
                    <div className="inputbox">
                        <div  className="overlay"></div>
                        <div className="inputbox-content">
                            <h2>Create Task</h2>
                            <hr></hr>
                            <form>
                                <div className='form-g' id='text-of-title'>
                                    <label>Title:</label>
                                    <input type="text" value={taskName} onChange={handleChange} name='taskName' /><br />
                                </div>

                                <div className='form-g' id='text-of-dis'>
                                    <label>Description:</label>

                                    <textarea rows={7} value={des} onChange={handleChange} name='des'></textarea>
                                </div>

                                <div className='form-g' id='text-of-title'>

                                <label>Status:</label>
                                <select  value={status} className='show-status' name="status" onChange={handleChange} id="Status" >
                                    <option value="">select </option>
                                    <option value="ToDo">Todo</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="Done">Done</option>
                                </select>
                                </div>
                            </form>
                            <hr></hr>
                            {editId != null ?<button className="close-inputbox-ADD" onClick={edittask}>Edit</button> : <button className="close-inputbox-ADD" onClick={saveTask}>ADD List</button> }
                            {/* <button className="close-inputbox-Cancel" onClick={toggle}>Cancel</button> */}
                        </div>
                    </div>
                )}
            </div>

            <Card  taskList={todo} status="Todo"  toggle={toggle}  seteditId= {seteditId} name={setTaskName} des={setDes} setstatus={setStatus} />
            <Card  taskList={inprogress} status="Inprogress" toggle={toggle} seteditId= {seteditId} name={setTaskName} des={setDes} setstatus={setStatus} />
            <Card  taskList={done} status ="Done" toggle={toggle} deletee={deletee}/>
  
  </>
  );
}

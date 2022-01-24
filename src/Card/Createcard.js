import React from 'react';


export default function Createcard(props) {
        const savecard = props.taskList.map((obj)=> <li>
                <span>
                    {obj.Name},{obj.Des}
                </span>
                {props.status === 'Done'? <button className="right" onClick={(e)=>remove(obj.Id)}>Remove</button>:
                 <button className="right" value={obj.Id} onClick={(e)=>editdata(e.target.value)} >Edit</button>}
              </li>)

              const editdata =(p)=>{
                   
                    
                        props.taskList.filter((j)=>j.Id === parseInt(p)).map((l)=>{
                        props.name(l.Name)
                        props.des(l.Des)
                        props.setstatus(l.Status)
                    })
                    props.seteditId(p);
                    props.toggle()
        
                    }
                    const remove =(id)=>{
                        let array = localStorage.getItem("taskList");
                        let as= JSON.parse(array)
                        const index=  as.findIndex((r)=>r.Id === id)
                        as.splice(index, 1)
                        localStorage.setItem("taskList", JSON.stringify(as));
                        window.location.reload()
                    }

                   
  return (
     <>
    <div className="Main-list-box3">
        
          <div className="listbox TodoList">
            <p className="ReportName">{props.status}</p>
            <ul>
              {savecard}
            </ul>
          </div>
       
      </div>
    
    </>
  )
}

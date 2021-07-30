import React ,{useState, useEffect}from "react";


const App = () => {
    const 
    [color, setColor] = useState("white"),
    [height, setHeight] = useState(50),
    [width, setWidth] = useState(50),
    handleColor = (e) => {
        console.log(e)
        console.log(e.target)
        console.log(e.target.value)
        setColor(e.target.value)
    },
    handleHeight = (e) => {
        setHeight(e.target.value)
    },
    handleWidth = (e) => {
        setWidth(e.target.value)
    };

  


    return (
        <>
           <h2 className="bg-primary text-white px-4"> Hello from  React</h2> 
           <div className="row col-6">
                <form>
                    <div className="form-group">
                        <label className="h3 d-block">Color</label>
                        <select className="form-control" defaultValue={"0"} onChange={(e) => handleColor(e)}>
                            <option value="0" disabled>Choose a color</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                        </select>
                    </div> 
                    <div className="form-group">
                        <label className="h3 d-block">Height</label>
                        <input type="number" className="form-control" onChange={(e) => handleHeight(e)} defaultValue={height} />
                    </div>
                    <div className="form-group">
                        <label className="h3 d-block">Width</label>
                        <input type="number" className="form-control" onChange={(e) => handleWidth(e)} defaultValue={width}/>
                    </div>
                </form>

           </div>
           <div className="row">
                <ColorBox height={height} width={width} color={color} />
           </div>
        </>
    );
}

export const ColorBox = ({height, width, color}) => {

    return (
        <div id="color-box" className="my-5" style={{height: height+"px", width: width+"px", background: color, transition: "all 0.3s"}}>
        </div>
    )
}

export default App;
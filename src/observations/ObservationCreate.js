import React , {useState} from "react";
import {createObservation} from "../utils/api";
import { useHistory } from "react-router-dom";

function ObservationCreate() {
  const history = useHistory();

  const [observation, setObservation] = useState({
      latitude: "0",
      longitude: "0",
      sky_condition: "",
  })

  function cancelHandler() {
    history.push("/");
  }

  function submitHandler(event) {
    event.preventDefault();
    createObservation(observation).then(()=> {
        history.push("/");
    })
  }

  function changeHandler({target: {name, value}}){
                    setObservation((previousObservation) => ({
          ...previousObservation,
          [name]: value
      }));
  }
  return (
    <main>
     <h1 className="mb-3">Create Observation</h1>
     <form onSubmit={submitHandler} className="mb-4">
         <div className="row mb-3">
             <div className="col-6" from form-group>
                 <label className="from-label" htmlFor="latitude">
                     Latitude
                 </label>
                 <input className="form-control" name="latitude" step="5" id="latitude" type="number" min="-90" max="90" value={observation.latitude} onChange={changeHandler} required={true}/> 
                 <small className="form-text text-muted">Enter a value between -90 and 90.</small>
             </div>
<div className="col-6">
   <label className="form-label" htmlFor="longitude">
     Longitude
   </label> 
   <input className="form-control" name="longitude"  step="5" id="longitude" type="number"  min="-180" max="180" value={observation.longitude} onChange={changeHandler} required={true}/>
   <small className="form-text text_muted">Enter a value between -180 and 180.</small>
   </div>
</div>
<div className="mb-3">
  <label className="form-label" htmlFor="cloudCover">
    Sky conditions
  </label>
  <select className="form-control" id="sky_condition" name="sky_condition" value={observation.sky_condition} onChange={changeHandler} required={true}>
  <option value="">Select a sky condition option</option>
           <option value="100">Cloudless</option>
           <option value="101">Some clouds</option>
           <option value="102">Cloud covered</option>
           <option value="103">Foggy</option>
           <option value="104">Raining</option>
            <option value="106">Snowing</option>
            <option value="108">Hailing</option>
           <option value="109">Thunderstorms</option>
  </select>
  </div>
        <div>
        <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
     </form>
    </main>
  );
}

export default ObservationCreate;